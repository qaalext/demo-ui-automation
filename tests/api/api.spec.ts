import { test, expect } from "@playwright/test";
import { log } from "console";


test.describe("API testing on Reqres", () => {
    const baseURL : string = "https://reqres.in/api";

    test("Simple API Test - Assert Response Status", async ({request}) => {
        const response = await request.get(`${baseURL}/users/2`);
        expect(response.status()).toBe(200);
    })

    test("Simple API Test - Assert Invalid Endpoint", async ({request}) => {
        const response = await request.get(`${baseURL}/users/2sasd`);
        expect(response.status()).toBe(404);

    })

    test("Simple API Test - Assert Response Data", async ({request}) => {
        const response = await request.get(`${baseURL}/users/3`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();        
        const { id, email, first_name, last_name } = responseBody.data;
        
        expect(id).toBeTruthy();
        expect(email).toBe("emma.wong@reqres.in");
        expect(first_name).toBe("Emma");
        expect(last_name).toBe("Wong");

    })

    test("POST Request - Create New User", async({request}) => {
        const response = await request.post(`${baseURL}/users`, {
            data : {
                email: "tibi",
                job: "leader"
            }
        });
        expect(response.status()).toBe(201);

        
        const responseBody = await response.json();        
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.job).toBe("leader");
        expect(responseBody.email).toBe("tibi");
        expect(responseBody.createdAt).toBeTruthy();


    })

    test("POST Request - Login User", async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        })
        expect(response.status()).toBe(200);

        const responseBody = await response.json();        
        expect(responseBody.token).toBeTruthy();
    });

    test("Post Request - Login Failed", async({request}) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: "eve.holt@reqres.in",
            }
        })
        expect(response.status()).toBe(400);
        const responseBody = await response.json();  
        expect(responseBody.error).toBe('Missing password');
        
    })

    test("PUT Request - Update User", async({ request }) => {
        const response = await request.put(`${baseURL}/users/2`, {
            data: {
                name: "morpheus",
                job: "zion resident"
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();  

        expect(responseBody.name).toBe("morpheus");
        expect(responseBody.job).toBe("zion resident");
        expect(responseBody.updatedAt).toBeTruthy();

    })

    test("Delete Request - Delete User", async({ request }) => {
        const response = await request.delete(`${baseURL}/users/2`);
        expect(response.status()).toBe(204);

    })
})