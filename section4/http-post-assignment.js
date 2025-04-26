import http from 'k6/http';
import { check } from 'k6';

export default function() {

    const credentials = {
        username: "test_" + Date.now(),
        password:  "secret_" + Date.now()
    }

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = http.post(
        'https://test-api.k6.io/user/register/', 
        JSON.stringify(credentials), 
        params
    )

    const tokenRes = http.post(
        'https://test-api.k6.io/auth/token/login/', 
        JSON.stringify(credentials),
        params
    )

    check(tokenRes, {
            'status is 201': (r) => r.status === 200,
        }
    )

    console.log("Status code: " + tokenRes.status)
    console.log("Token: " + tokenRes.json().access)
}