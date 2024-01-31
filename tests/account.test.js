import { describe, expect, it, afterEach, afterAll } from "vitest";
import supertest from "supertest";
import app from "../src/app.js";
import { PrismaClient } from "@prisma/client";

const request = supertest(app);
const endpoint = "/v1/accounts";
const prisma = new PrismaClient();

const accountData = {
  fullname: "Fullname Test",
  username: "username_test",
  email: "email@test.com",
  password: "password_test",
  role: "USER",
};

const accountDataOptional = {
  fullname: "Fullname Test",
  username: "username_test",
  email: "email@test.com",
  password: "password_test",
  role: "USER",
  phone: "6281234567890",
  address: "Address Test",
  birthdate: new Date().toISOString(),
  company: "Company Test",
  gender: "LAKI_LAKI",
};

const accountDataInvalid = {
  fullname: "Fullname Test",
  username: "wrong username format",
  email: "wrong email format",
  password: "wrongpw",
  role: "Invalid Role",
};

describe("POST /accounts", () => {
  afterEach(async () => {
    await prisma.account.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Should return 201 when input required fields only", async () => {
    const response = await request.post(endpoint).send(accountData);

    expect(response.status).toBe(201);
  });

  it("Should return 201 when input all fields", async () => {
    const response = await request.post(endpoint).send(accountDataOptional);

    expect(response.status).toBe(201);
  });

  it("Should return 400 when input wrong field format", async () => {
    const response = await request.post(endpoint).send(accountDataInvalid);

    expect(response.status).toBe(400);
  });

  it("Should return 400 when input unknown field", async () => {
    const accountDataUnknown = {
      fullname: "Fullname Test",
      username: "username_test",
      email: "email@test.com",
      password: "password_test",
      role: "USER",
      random: "Random Test",
    };

    const response = await request.post(endpoint).send(accountDataUnknown);

    expect(response.status).toBe(400);
  });
});

describe("GET /accounts", () => {
  it("Should return 200 when get all accounts", async () => {
    const response = await request.get(endpoint);

    expect(response.status).toBe(200);
  });
});

describe("GET /accounts/:id", () => {
  afterEach(async () => {
    await prisma.account.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Should return 200 when provide valid id", async () => {
    const { id } = await prisma.account.create({ data: accountData });

    const response = await request.get(`${endpoint}/${id}`);

    console.log(response.body);

    expect(response.status).toBe(200);
  });

  it("Should return 404 when account not found", async () => {
    const id = "84757068-0d65-4d98-9fb8-3163d0d86d21";
    const response = await request.get(`${endpoint}/${id}`);

    expect(response.status).toBe(404);
  });

  it("Should return 400 when input invalid id format", async () => {
    const response = await request.get(`${endpoint}/invalid_id`);

    expect(response.status).toBe(400);
  });
});

describe("PUT /accounts/:id", () => {
  afterEach(async () => {
    await prisma.account.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Should return 200 when update account with valid format", async () => {
    const { id } = await prisma.account.create({ data: accountData });

    const response = await request
      .put(`${endpoint}/${id}`)
      .send(accountDataOptional);

    expect(response.status).toBe(200);
  });

  it("Should return 404 when account not found", async () => {
    const id = "84757068-0d65-4d98-9fb8-3163d0d86d21";
    const response = await request
      .put(`${endpoint}/${id}`)
      .send(accountDataOptional);

    console.log(response.body);

    expect(response.status).toBe(404);
  });

  it("Should return 400 when input invalid id format", async () => {
    const response = await request
      .put(`${endpoint}/invalid_id`)
      .send(accountDataOptional);

    expect(response.status).toBe(400);
  });

  it("Should return 400 when input wrong field format", async () => {
    const { id } = await prisma.account.create({ data: accountData });

    const response = await request
      .put(`${endpoint}/${id}`)
      .send(accountDataInvalid);

    expect(response.status).toBe(400);
  });
});

describe("DELETE /accounts/:id", () => {
  afterEach(async () => {
    await prisma.account.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Should return 200 when delete account with valid id", async () => {
    const { id } = await prisma.account.create({ data: accountData });

    const response = await request.delete(`${endpoint}/${id}`);

    expect(response.status).toBe(200);
  });

  it("Should return 404 when account not found", async () => {
    const id = "84757068-0d65-4d98-9fb8-3163d0d86d21";
    const response = await request.delete(`${endpoint}/${id}`);

    console.log(response.body);

    expect(response.status).toBe(404);
  });

  it("Should return 400 when input invalid id format", async () => {
    const response = await request.get(`${endpoint}/invalid_id`);

    expect(response.status).toBe(400);
  });
});
