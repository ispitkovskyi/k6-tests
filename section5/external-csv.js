import http from 'k6/http';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';


// SharedArray is an array-like object that shares the underlying memory between VUs.
const userCredentials = new SharedArray('users with credentials', function () {
    //Opens users.csv file and parses it to JSON. 
    // First line is considered as headers, not data
    return papaparse.parse(open('./users.csv'), {header: true}).data // 
});

console.log(userCredentials)

//Run:  k6 run --http-debug=full external-csv.js
export default function () {

    // Takes random element from the shared array
    const randomCredential = randomItem(userCredentials);

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: randomCredential.username,
                password: randomCredential.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has access token': (r) => r.json() !== undefined
    });
    
    const accessToken = res.json().access;
}

