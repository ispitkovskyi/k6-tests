import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
    vus: 10,
    duration: '10s',
    
    // THRESHOLDS CONFIGURATION
    // (useful is you have Serice Level Objectives SLO)
    thresholds: {
        http_req_duration: ['p(95)<250'], // 95% percentile fo http requests duration should be below 200 ms
        http_req_duration: ['max<2000'],  // max less 2 seconds
        http_req_failed: ['rate<0.01'], // Allow only 1% of requests to fail
        http_reqs: ['count>20'], // count aggregation method just count number of items per period of time
        http_reqs: ['rate>4'],  // rate method measures number of requests sent per second
        vus: ['value>9'],  // gauge metric (metric like as "speedometer")
        checks: ['rate>=0.98'] // number of passed checks should be >= 98%
    }
}

export default function() {
    // Just to produce error 404 on sending request on 1st iteration
    //const res = http.get('https://test.k6.io' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));
    const res = http.get('https://test.k6.io');

    // ASSERTIONS 
    // 1st argument will be passed to the lambda function which does the verification.
    // Multiple assertions are allowed inside JSON object - which is the 2nd argument of 'check' function
    check(res, {
        'Status code is 200': (r) => r.status === 200,
        'Body contains text from start page': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.')
    })      
    sleep(2)
}