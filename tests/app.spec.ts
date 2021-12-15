import { response } from "express";
import request, { Response } from "supertest";
import mockRequest from "../mocks/mockRequest";
import app from "../src/app";
import { ReducedShow } from "../src/types";

describe("GET /", () => {
  test("Should respond 404 to GET /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
  });
});

describe("POST / with shows payload", () => {
  test("Should return OK status", async () => {
    const response = await request(app).post("/").send(mockRequest);
    expect(response.statusCode).toBe(200);
  });

  test("Has a 'response' key in response.", async () => {
    const response = await request(app).post("/").send(mockRequest);
    expect(Object.keys(response.body)).toContain("response");
  });

  test("Matches expected structure", async () => {
    const response = await request(app).post("/").send(mockRequest);
    const shows = response.body?.response;
    shows.forEach((show: ReducedShow) => {
      expect(show).toHaveProperty("image");
      expect(show).toHaveProperty("slug");
      expect(show).toHaveProperty("title");
    });
  });

  test("Empty response on empty body", async () => {
    const response = await request(app).post("/").send({ payload: [] });
    expect(response.body).toStrictEqual({
      response: [],
    });
  });

  test("400 if bad request payload", async () => {
    const response = await request(app)
      .post("/")
      .send({ badPayload: "Please hire me thanks :)" });
    expect(response.statusCode).toBe(400);
  });
});
