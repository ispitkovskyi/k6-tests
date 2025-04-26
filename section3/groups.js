import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250'], // 95% percentile fo http requests duration should be below 200 ms
        'group_duration{group:::Main page}': ['p(95)<750'],    // NOTE: Name of a group must be prefixed with TRIPLE COLUMNS :::
        'group_duration{group:::News page}': ['p(95)<250'],    // NOTE: Name of a group must be prefixed with TRIPLE COLUMNS :::
        'group_duration{group:::Main page::Assets}': ['p(95)<250'],    // NOTE: Name of a SUB-group must be prefixed with DOUBLE COLUMNS ::
    }
}

export default function() {

    group('Main page', function () {
        let res = http.get('https://test.k6.io');

        check(res, {'Status code is 200': (r) => r.status === 200})
    
        group('Assets', () => {
            http.get('https://test.k6.io/static/css/site.css')
            http.get('https://test.k6.io/static/js/prisms.js')
        })
    })

    group('News page', () => {
        http.get('https://test.k6.io/news.php');
    })

    sleep(1)
}