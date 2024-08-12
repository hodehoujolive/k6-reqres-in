import http from 'k6/http';
import { check } from 'k6';
import { baseUrl, headers } from './config.js';
import { createUserPayload, updateUserPayload } from './payloads.js';

export let options = {
    stages: [
        { duration: '5', target: 1 },
        { duration: '1m', target: 10 },
        { duration: '30s', target: 0 },
    ],
};

// test case 1: create user
function createUser() {
    const url = `${baseUrl}/users`;
    const payload = JSON.stringify(createUserPayload());

    const res = http.post(url, payload, { headers });
   

    check(res, {
        'status is 201': (r) => r.status === 201,
        'response has id': (r) => JSON.parse(r.body).id !== undefined,
        'response has createdAt': (r) => JSON.parse(r.body).createdAt !== undefined,
    });

    console.log('Create User Response:', res.body);
    
    // extract user id from the response and save it in userID variable
    const userId = JSON.parse(res.body).id;
    return userId;
}

// test case 2: single user
function singleUser() {
    const url = `${baseUrl}/users/2`;

    const res = http.get(url, { headers });

    const responseBody = JSON.parse(res.body);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response contains id': (r) => responseBody.data && responseBody.data.id === 2,
    });
}

// test case 3: update user
function updateUser(userId) {
    const url = `${baseUrl}/users/${userId}`;
    const payload = JSON.stringify(updateUserPayload());

    const res = http.put(url, payload, { headers });

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response contains name': (r) => JSON.parse(r.body).name === JSON.parse(payload).name,
        'response contains job': (r) => JSON.parse(r.body).job === JSON.parse(payload).job,
    });

   // console.log('Update User Response:', res.body);
}

// test case 4: list users
function listUsers() {
    const url = `${baseUrl}/users?page=1`; // Retrieve the first page of users

    const res = http.get(url, { headers });

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response has data': (r) => JSON.parse(r.body).data.length > 0, // Ensure there is data
    });

    //console.log('List Users Response:', res.body);
}



// test case 5: delete user
function deleteUser(userId) {
    const url = `${baseUrl}/users/${userId}`;

    const res = http.del(url, null, { headers });

    check(res, {
        'status is 204': (r) => r.status === 204,
    });

    //console.log('Delete User Response:', res.body);
}

export default function () {
    // create a user and get the userId from the response
    const userId = createUser();
    singleUser(userId);
    // updaye the user and delete the user
    listUsers()
    updateUser(userId);
    deleteUser(userId);
}
