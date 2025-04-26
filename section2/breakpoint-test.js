import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    // Stages configuration
    stages: [
        // Continously growing number of virtual users, untile the app stops responding OR the response time gets too slow
        {
            duration: '2h',
            target: 10000
        },
    ]
}

export default function () {
    // Most users go to the home page
    http.get('https://test.k6.io');
    sleep(1);
}