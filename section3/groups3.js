import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'], // 95% percentile fo http requests duration should be below 200 ms
        // 'http_req_duration{expected_response:true}': ['p(95)<1000'], // 95% percentile fo http requests duration should be below 200 ms
        'group_duration{group:::Main page}': ['p(95)<3000'],    // NOTE: Name of a group must be prefixed with TRIPLE COLUMNS :::
        'group_duration{group:::News page}': ['p(95)<1000'],    // NOTE: Name of a group must be prefixed with TRIPLE COLUMNS :::
        'group_duration{group:::Main page::Assets}': ['p(95)<1000'],    // NOTE: Name of a SUB-group must be prefixed with DOUBLE COLUMNS ::
    }
}

export default function() {

    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/bb0a6755-29b5-406c-80de-9e5945dfc1c9?mocky-delay=900ms');

        check(res, {'Status code is 200': (r) => r.status === 200})
    
        group('Assets', () => {
            http.get('https://run.mocky.io/v3/bb0a6755-29b5-406c-80de-9e5945dfc1c9?mocky-delay=900ms')
            http.get('https://run.mocky.io/v3/bb0a6755-29b5-406c-80de-9e5945dfc1c9?mocky-delay=900ms')
        })
    })

    group('News page', () => {
        //NOTE: This endpoint is configred to return 503 ERROR
        http.get('https://run.mocky.io/v3/e5f89c72-3dae-449b-9c9c-0a7925b89e06');
    })

    sleep(1)
}