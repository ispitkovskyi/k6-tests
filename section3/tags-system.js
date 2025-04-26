import http from 'k6/http'

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'], // NOTE: 'status' is one of system-defined tags
        'http_req_duration{status:201}': ['p(95)<1000'] 
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/bb4031f6-d888-40c7-8453-28e0712803fb')  //This endpoint was generated at https://designer.mocky.io/
    http.get('https://run.mocky.io/v3/93c0fbc9-562d-4e20-96e8-5927d4d2df09?mocky-delay=2000ms') //This endpoint was generated at https://designer.mocky.io/
}