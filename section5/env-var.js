import http from'k6/http'

// Run:  k6 run -e BASE_URL=https://test-api.k6.io --http-debug=full random-sleep.js
export default function() {
    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
}