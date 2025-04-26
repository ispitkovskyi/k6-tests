import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    // Stages configuration
    stages: [
        // It will ramp-up from 0 to 10 virtual users within 10 seconds
        {
            duration: '10s',
            target: 10
        },
        // Keep load of 10 virtual users during 30 seconds
        {
            duration: '30s',
            target: 10
        },
        // Within 10 seconds ramp-down from 10 virtual usres to 0
        {
            duration: '10s',
            target: 0
        }
    ]
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contact.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(2);
}