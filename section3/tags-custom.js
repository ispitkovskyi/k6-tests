import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250'],
        'http_req_duration{page:order}': ['p(95)<250'], // Metric will only measure requests tagged with the custom tag page:order
        checks: ['rate>=0.99'],
        'checks{page:order}': ['rate>=0.99'],  // Check will only look for checks that are tagged with the custom tag page:order
        http_errors: ['count==0'],
        'http_errors{page:order}': ['count==0']
    }
}

let httpErrors = new Counter('http_errors')

export default function() {
    let res = http.get('https://run.mocky.io/v3/bb4031f6-d888-40c7-8453-28e0712803fb')  //This endpoint was generated at https://designer.mocky.io/
    
    if(res.error) {
        httpErrors.add(1)
    }

    check(res, {
        'status is 200': (r) => r.status == 200
    })

    // Tag this request with 'page' tag
    res = http.get(
        'https://run.mocky.io/v3/93c0fbc9-562d-4e20-96e8-5927d4d2df09?mocky-delay=2000ms',
        {
            tags: {
                page: 'order'
            }
        }
    ) 

    if(res.error) {
        httpErrors.add(1, {page: 'order'})
    }

    check(res,
        {
        'status is 200': (r) => r.status == 201
        },
        {
            page: 'order'
        }
    )

    sleep(1)
}