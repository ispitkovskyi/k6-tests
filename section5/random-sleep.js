import http from'k6/http'
import {sleep} from 'k6'
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    vus: 5,
    duration: '20s'
}

// Run: k6 run random-sleep.js
export default function() {
    http.get('https://test.k6.io');

    console.log('- VU stage -')

    // Use random value for sleep to simulat random users
    sleep(randomIntBetween(1, 5)); // sleep between 1 and 5 seconds
}