import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
    vus: 1,
    // duration: '30s',
    
    // THRESHOLDS CONFIGURATION
    // (useful is you have Serice Level Objectives SLO)
    thresholds: {
        http_req_duration: ['p(95)<1000'], // 95% percentile fo http requests duration should be below 200 ms
    }
}

const codesList = ['XWYL','ABCD','EFGH','IJKL','MNOP','QRST','UVWX','YZAB','DCBA','ASDF','QWER','ZXCV']

export default function() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2IiwianRpIjoiMTliODFmNjhlNTBjYWYzNGIzNjcyZGU0Yzk5MWYyYzliZGE2MDFhYjQzY2Y1ZDEwNjRlNWIzMTE5MDA1OGRjMGI3MjFjMjdmYzk2NzgxMWEiLCJpYXQiOjE3NDIyMDY0OTAuNTE1NjM3LCJuYmYiOjE3NDIyMDY0OTAuNTE1NjM4LCJleHAiOjE3NDI4MTEyOTAuNDg5NTM4LCJzdWIiOiIxMzMzMCIsInNjb3BlcyI6WyIqIl19.7CY7hkAvY8_InBOPrvbqCr6t9EVHHfQcc8tHl77_clYKRbjXj4yCiWUiR4hhpNIsLvUsvPh9jA_MKWb2e1O2fgRY-SgH-NqWbhL5Nmc2uxvw3OCBHQLDXp0HrQ9B_aSp5CRGQEB9LeS8B_2-RgB9jAfVAId-u8AeSRXfcVAi1AzbWOsj2sBHAu7A50zSyUql27hYbzIz8wtJcNs20JjR2lz61eMiV62qU6_fvZuNJnJh8GZ0l2s9r2jAe-82cSTfxi3RMgbqv3iW5Buv4BCcegyngOrYOII5v0LMvVIN33njSC4kK6HoT8bTgN8y2We7NI4ubIcP578KXpgzfxT9SdXh2A0QqU3ya5yZ_lAUf9_X7Q9dCSXbs9MF1Flb_udyO-NbHo_IlI-83j787ADZgi295XjAu4-M6tJljPef1yiDAOZnSKVEDpqiuIQnN3mBeUHEJNx0x4FR9GvCLwIKJ7zKqxcFWL2O5vb-NxjD9Wyo01MdJ8TcgbhoV511AroH09EaAbi72E4PujismQzJjcj9jOiHDX57KayzCpmyBpt9b6ReRtKdJs8KBZwy9FhgOrg0tRfho5MLyHuRe-WfVqLXQwdCy-rKQh3WQMfSG_wOikTAF9Gdq2Fp-ln1zbLOUXgFL63le-99bYUQK-XchC3TJueLwB6hDY9d1nG9TZw'
    const url = 'https://dev.airalo.com/api/user/me/email/initiate-verify'
    const params = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };

    for(let i = 0; i < codesList.length; i++){
        const payload = JSON.stringify({
            code: codesList[i],
        });

        const res = http.put(url, payload, params)
        console.log(`Response for code ${codesList[i]}: ${JSON.stringify(res.body)}`)
        // sleep(500)
    }
}