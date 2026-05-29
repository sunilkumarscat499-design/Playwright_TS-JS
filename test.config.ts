export class TestConfig {

    //private static readonly tokenPayload = { "userEmail": "sunilkumarscat499@gmail.com", "userPassword": "Arjith@123" };
    private static readonly baseUrl = 'https://rahulshettyacademy.com';

    static getUrl() {
        return this.baseUrl

    }

    static getPayload() {

        return {
            "userEmail": "sunilkumarscat499@gmail.com",
            "userPassword": "Arjith@123"
        };
    }

}