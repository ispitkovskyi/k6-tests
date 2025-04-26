import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');

    const crocodileId = res.json()[6].id
    const crocodileName = res.json()[6].name
    
    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    console.log(res.headers["Content-Type"]);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'Crocodile name': (r) => r.json().name === crocodileName,
        'Content-type header': (r) => res.headers["Content-Type"] === 'application/json'
    });
}