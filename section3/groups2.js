import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<12000'], // 95% percentile fo http requests duration should be below 200 ms
        'group_duration{group:::Main page}': ['p(95)<8000'],    // NOTE: Name of a group must be prefixed with TRIPLE COLUMNS :::
        'group_duration{group:::News page}': ['p(95)<6000'],    // NOTE: Name of a group must be prefixed with TRIPLE COLUMNS :::
        'group_duration{group:::Main page::Assets}': ['p(95)<3000'],    // NOTE: Name of a SUB-group must be prefixed with DOUBLE COLUMNS ::
    }
}

export default function() {

    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/bb0a6755-29b5-406c-80de-9e5945dfc1c9?mocky-delay=5000ms');

        check(res, {'Status code is 200': (r) => r.status === 200})
    
        group('Assets', () => {
            http.get('https://run.mocky.io/v3/bb0a6755-29b5-406c-80de-9e5945dfc1c9?mocky-delay=1000ms')
            http.get('https://run.mocky.io/v3/bb0a6755-29b5-406c-80de-9e5945dfc1c9?mocky-delay=1000ms')
        })
    })

    group('News page', () => {
        http.get('https://run.mocky.io/v3/93c0fbc9-562d-4e20-96e8-5927d4d2df09?mocky-delay=5000ms');
    })

    sleep(1)
}