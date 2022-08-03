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

describe("/api/articles/id", () => {
  describe("GET", () => {
    test("returns an array of articles with matching id", async () => {
      const { body } = await request(app).get("/api/articles/1").expect(200);

      body.article.forEach((article) => {
        expect(article).toMatchObject({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: expect.any(String),
          votes: 100,
        });
      });
    });
    test("when passed a valid query but no article responds with a 404 message.", async () => {
      const { body } = await request(app).get("/api/articles/9000").expect(404);

      expect(body.msg).toBe("id not found");
    });
    test("when passed an id which is not a number responds with a 400 error message.", async () => {
      const { body } = await request(app)
        .get("/api/articles/not-a-number")
        .expect(400);

      expect(body.msg).toBe("Invalid input");
    });
  });
  describe("PATCH", () => {
    test("updates the votes property by 50", async () => {
      const { body } = await request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 50 })
        .expect(200);

      expect(body[0].votes).toBe(150);
    });
    test("when passed a valid query but no article responds with a 404 message.", async () => {
      const { body } = await request(app)
        .patch("/api/articles/9000")
        .send({ inc_votes: 50 })
        .expect(404);

      expect(body.msg).toBe("id not found");
    });
    test("when passed an id which is not a number responds with a 400 error message.", async () => {
      const { body } = await request(app)
        .patch("/api/articles/not-a-number")
        .send({ inc_votes: 50 })
        .expect(400);

      expect(body.msg).toBe("Invalid input");
    });
    test("when the user sends a object and the value is not a number returns a 400 error message", async () => {
      const { body } = await request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "not-a-number" })
        .expect(400);
      expect(body.msg).toBe("Invalid input");
    });
  });
});
