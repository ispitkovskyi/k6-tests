import http from 'k6/http';
import { check } from 'k6';

// Run as   k6 run --http-debug=full http-put.js
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
            'status is 200': (r) => r.status === 200,
        }
    )

    const accessToken = tokenRes.json().access

    let crocodile = {
        name: "crocodile_" + Date.now(),
        sex:  "M",
        date_of_birth: "1900-10-28"
    }

    const authenticatedParams = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }

    http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(crocodile),
        authenticatedParams
    )

    const crocodilesResp = http.get('https://test-api.k6.io/my/crocodiles/', authenticatedParams)
    const newCrocodileId = crocodilesResp.json()[0].id
    console.log("Crocodiles ID: " + newCrocodileId)

    const myCrocUrl = `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`

    const crocResp = http.get(myCrocUrl, authenticatedParams)
    
    check(crocResp, {
        'Get created crocodile request status is 200': (r) => r.status === 200,
        'crocodile ID': (r) => r.json().id === newCrocodileId,
    })

    // Delete crocodile
    http.del(myCrocUrl, null, authenticatedParams)
}