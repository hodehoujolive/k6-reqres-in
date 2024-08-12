import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export function createUserPayload() {
    return {
        name: randomString(8), // generates a random name
        job: randomString(8)  // generates a random job title
    };
}

export function updateUserPayload() {
    return {
        name: randomString(8),
        job: randomString(8)
    };
}

export const RegisterUserPayload = {
    "email": "eve.holt@reqres.in",
    "password": "pistol"
};

export const loginPayload = {
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
};
