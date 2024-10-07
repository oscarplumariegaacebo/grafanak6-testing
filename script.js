import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
      { duration: "5s", target: 10 },
      { duration: "10s", target: 10 },
      { duration: "5s", target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<300'], // 95% of requests must complete within 300ms
    },
};

export default function () {

    let res = http.get('https://localhost:7234/api/Budgets'); // HTTP Get all budgets

    check(res, {
        'is status 200': (x) => x.status === 200 // An assertion
    });

    console.log(`${JSON.stringify(res)}`);

    sleep(1); // Wait for 1 second between each request
}