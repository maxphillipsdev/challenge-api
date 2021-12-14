import { response } from "express";
import request, { Response } from "supertest";
import app from "../src/app";

describe("GET /", () => {
  test("Should respond 404 to GET /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
  });
});
