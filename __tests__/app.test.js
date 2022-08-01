const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  if (db.end) db.end();
});

describe("GET /api/topics", () => {
  test("returns an array of topics with slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body.topics.length).toBeGreaterThanOrEqual(1);
        response.body.topics.forEach((topics) => {
          expect.objectContaining({
            topics_slug: expect.any(String),
            topics_description: expect.any(String),
          });
        });
      });
  });
});
