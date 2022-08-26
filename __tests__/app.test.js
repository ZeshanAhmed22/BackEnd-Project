const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const { response } = require("../app");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  if (db.end) db.end();
});

////////////////// api
describe("GET /api", () => {
  test("returns an object with all endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        Object.keys(response.body).forEach((api) => {
          expect(typeof api).toBe("string");
        });
      });
  });
});

/////////////////////////////////// TOPICS
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
//////////////////////////////// ARTICLESBYID
describe("/api/articles/id", () => {
  describe("GET", () => {
    test("returns an array of articles with the matching id", async () => {
      const { body } = await request(app).get("/api/articles/1").expect(200);

      body.article.forEach((article) => {
        expect(article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: expect.any(String),
            votes: 100,
          })
        );
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
    test("should return comment_count which is total count of comments for the specified id.", async () => {
      const { body } = await request(app).get("/api/articles/3").expect(200);

      expect(+body.article[0].comment_count).toBe(2);
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

  /////////////////////////////// USERS
  describe("GET /api/users", () => {
    test("returns an array of users with  and description", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
          expect(response.body.users.length).toBeGreaterThanOrEqual(1);
          response.body.users.forEach((users) => {
            expect.objectContaining({
              users_username: expect.any(String),
              users_name: expect.any(String),
              users_avatar_url: expect.any(String),
            });
          });
        });
    });
  });
  ///////////////////////////// ARTICLES
  describe("GET /api/article", () => {
    test("returns an array of articles", () => {
      return request(app)
        .get("/api/article")
        .expect(200)
        .then((response) => {
          expect(response.body.article.length).toBeGreaterThanOrEqual(1);
          response.body.article.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(String),
              })
            );
          });
        });
    });
    test("sort_by, returns the articles by any valid column sorted defaulting to date descending ", () => {
      return request(app)
        .get("/api/article")
        .expect(200)
        .then((response) => {
          expect(response.body.article).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("sort_by returns the articles by author ascending", () => {
      return request(app)
        .get("/api/article?sortby=author&orderby=ASC")
        .expect(200)
        .then((response) => {
          expect(response.body.article).toBeSortedBy("author", {
            ascending: true,
          });
        });
    });
    test("topic returns a 200 message when passed a valid topic. ", () => {
      return request(app)
        .get("/api/article?topic=mitch")
        .expect(200)
        .then((response) => {
          response.body.article.forEach((article) => {
            expect(article.topic).toBe("mitch");
          });
        });
    });
    test("sort_by returns an error message with status 400 when not passed a vaild sortby query", () => {
      return request(app)
        .get("/api/article?sortby=banana")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request");
        });
    });
    test("order_by returns an error message with status 400 when not passed a vaild orderby query", () => {
      return request(app)
        .get("/api/article?orderby=banana")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request");
        });
    });

    test("topic returns a 400 message when passed a invalid topic. ", () => {
      return request(app)
        .get("/api/article?topic=22")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad request");
        });
    });
    test("topic returns a 404 message when passed a valid topic that doesnt exist. ", () => {
      return request(app)
        .get("/api/article?topic=banana")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("Topic Not Found");
        });
    });
  });
});
////////////////////////////////////// Articles/article_id_comments
describe("GET /api/article/article_id/comments", () => {
  test("returns an array of comments by article id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments.length).toBeGreaterThanOrEqual(1);
        response.body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              article_id: 1,
              comment_id: expect.any(Number),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );
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
describe("POST /api/articles/:article_id/comments", () => {
  test.only("post request should return a username and body object", () => {
    const newComment = {
      username: "butter_bridge",
      body: "This is a comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        expect(response.body.comments).toEqual(
          expect.objectContaining({
            article_id: 1,
            comment_id: expect.any(Number),
            author: "butter_bridge",
            body: "This is a comment",
            created_at: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  test("when passed a valid query but no article responds with a 404 message.", async () => {
    const { body } = await request(app)
      .post("/api/articles/9000/comments")
      .expect(404);

    expect(body.msg).toBe("id not found");
  });
  test("when passed an id which is not a number responds with a 400 error message.", async () => {
    const { body } = await request(app)
      .post("/api/articles/not-a-number/comments")
      .expect(400);

    expect(body.msg).toBe("Invalid input");
  });
});
////////////////////////////// DELETE /api/comments/:comment_id

describe("DELETE /api/comments/:comment_id", () => {
  test("- delete the given comment by `comment_id`", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });
  test("when passed a valid query but no id exists responds with a 404 message.", () => {
    return request(app)
      .delete("/api/comments/9000")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("id not found");
      });
  });
  test("when passed a invalid id responds with a 400 message.", () => {
    return request(app)
      .delete("/api/comments/not-a-number")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid input");
      });
  });
});
