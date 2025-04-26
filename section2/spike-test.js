import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    // Stages configuration
    stages: [
        // It will ramp-up from 0 to 10000 virtual users within very short period 2 minutes
        {
            duration: '2m',
            target: 10000
        },
        // Ramp-down to zero immediately (ASAP)
        {
            duration: '1m',
            target: 0
        }
    ]
}

export default function () {
    // Most users go to the home page
    http.get('https://test.k6.io');
    sleep(1);
}