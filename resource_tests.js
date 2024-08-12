import http from 'k6/http';
import { check } from 'k6';
import { baseUrl, headers } from './config.js';

export let options = {
    stages: [
        { duration: '5s', target: 1 },
        { duration: '1m', target: 10 },
        { duration: '30s', target: 0 },
    ],
};

// test case 1: list resources
function listResources() {
    const url = `${baseUrl}/unknown`;

    const res = http.get(url, { headers });

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response has data': (r) => Array.isArray(JSON.parse(r.body).data) && JSON.parse(r.body).data.length > 0,
    });

    //console.log('List Resources Response:', res.body);
}

// test case 3: single resource
function singleResource(resourceId) {
    const url = `${baseUrl}/unknown/${resourceId}`;

    const res = http.get(url, { headers });

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response contains id': (r) => JSON.parse(r.body).data.id === resourceId,
        'response contains name': (r) => JSON.parse(r.body).data.name !== undefined,
        'response contains year': (r) => JSON.parse(r.body).data.year !== undefined,
    });

    //console.log('Single Resource Response:', res.body);
}

// test case 4: single resource Not Found
function singleResourceNotFound() {
    const url = `${baseUrl}/unknown/9999`;

    const res = http.get(url, { headers });

    check(res, {
        'status is 404': (r) => r.status === 404,
    });

    console.log('Single Resource Not Found Response:', res.body);
}

export default function () {
    listResources();
    singleResource(2);
    singleResourceNotFound();
}
