import { test, expect, request } from '@playwright/test';
import { APIUtilsBP } from '../../utils/APIUtils';
import fs from 'fs';

test('get token @smoke @regression @sanity', async ({ request }) => {
    const getAPI = new APIUtilsBP(request);
    const token = await getAPI.generateToken()
    console.log(token)

});

test('createBooking @regression @sanity', async ({ request }) => {
    const getAPI = new APIUtilsBP(request);
    const token = await getAPI.generateTokenBookings();
    const response = await getAPI.createOrder(token);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse).toHaveProperty('booking');
    expect(jsonResponse.booking).toHaveProperty('totalprice');
    expect(jsonResponse.booking.bookingdates).toMatchObject({
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    })
})

test.skip('dummyAPI direct injection @sanity', async ({ request }) => {
    const response = await request.post("", {});
    const jsonResponse = await response.json();
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(jsonResponse).toHaveAttribute('');
    expect(jsonResponse).toMatchObject({});

})

test('createBooking from json request @regression @sanity', async ({ request }) => {
    const getAPI = new APIUtilsBP(request);
    const token = await getAPI.generateTokenBookings();
    const jsonPath = "testdata/createBooking.json";
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    const response = await request.post("https://restful-booker.herokuapp.com/booking",
        {
            headers: {
                "Content-Type": "application/json",
                // 2. Inject the token into the headers/cookies as required by the API spec
                "Cookie": `token=${token}`
            },
            data: jsonData
        })
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse).toHaveProperty('booking');
    expect(jsonResponse.booking).toHaveProperty('totalprice');
    expect(jsonResponse.booking.bookingdates).toMatchObject({
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    });
});

// data injection via fakers