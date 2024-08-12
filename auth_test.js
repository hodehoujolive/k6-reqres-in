import http from 'k6/http';
import { check } from 'k6';
import { baseUrl, headers } from './config.js';
import { RegisterUserPayload, loginPayload } from './payloads.js';

export let options = {
    stages: [
        { duration: '30s', target: 10 }, // ramp-up to 10 virtual users over 30 seconds
        { duration: '1m', target: 10 },  // stay at 10 virtual users for 1 minute
        { duration: '30s', target: 0 },  // ramp-down to 0 virtual users over 30 seconds
    ],
};


// test case 1: successful user registration
function RegisterUser() {
    const url = `${baseUrl}/register`;
    const payload = JSON.stringify(RegisterUserPayload);

    const res = http.post(url, payload, { headers });

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response has id': (r) => JSON.parse(r.body).id !== undefined,
        'response has token': (r) => JSON.parse(r.body).token !== undefined
    });

    console.log(res.body);
}


// test case 2: successful user login
function loginUser() {
    const url = `${baseUrl}/login`;
    const payload = JSON.stringify(loginPayload);

    const res = http.post(url, payload, { headers });

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response has token': (r) => JSON.parse(r.body).token !== undefined,
    });

    console.log(res.body);
}

// test case 3: unsuccessful user registration (nissing password)
function registerUnsuccessful() {
    const url = `${baseUrl}/register`;
    const payload = JSON.stringify({
        email: 'sydney@fife',
    });

    const res = http.post(url, payload, { headers });

    check(res, {
        'status is 400': (r) => r.status === 400,
        'error message is present': (r) => JSON.parse(r.body).error === 'Missing password',
    });

    console.log(res.body);
}

// test case 4: unsuccessful user login (missing password)
function loginUnsuccessful() {
    const url = `${baseUrl}/login`;
    const payload = JSON.stringify({
        email: 'peter@klaven',
    });

    const res = http.post(url, payload, { headers });

    check(res, {
        'status is 400': (r) => r.status === 400,
        'error message is present': (r) => JSON.parse(r.body).error === 'Missing password',
    });

    console.log(res.body);
}

export default function () {
    RegisterUser();
    loginUser();
    registerUnsuccessful();
    loginUnsuccessful();
}

