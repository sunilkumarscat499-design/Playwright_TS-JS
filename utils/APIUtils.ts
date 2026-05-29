import { APIRequestContext } from '@playwright/test'
import { TestConfig } from '../test.config';
const tokenPayload = {
    "username": "admin",
    "password": "password123"
};
const createBookingPayload = {
    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    },
    "additionalneeds": "Breakfast"
}

export class APIUtilsBP {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;

    }

    async generateToken() {
        const response = await this.request.post(`${TestConfig.getUrl()}/api/ecom/auth/login`, {
            headers: { "Content-Type": "application/json" },
            data: TestConfig.getPayload()
        });
        const jsonResponse = await response.json();
        return jsonResponse.token;
    }

    async generateTokenBookings() {
        const response = await this.request.post("https://restful-booker.herokuapp.com/auth", {
            headers: {},
            data: tokenPayload
        });
        if (response.ok()) {
            const jsonResponse = await response.json();
            return jsonResponse.token
        } else {
            throw new Error(`Auth API failed with status code: ${response.status()}`);
        }

    };

    async createOrder(token: string) {
        const response = await this.request.post("https://restful-booker.herokuapp.com/booking", {
            headers: {
                "Content-Type": "application/json",
                // 2. Inject the token into the headers/cookies as required by the API spec
                "Cookie": `token=${token}`
            },
            data: createBookingPayload
        });
        return response;
    }
}