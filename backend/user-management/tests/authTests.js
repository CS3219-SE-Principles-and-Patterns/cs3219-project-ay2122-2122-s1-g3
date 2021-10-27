const should = require("should");
const { expect, assert } = require("chai");
const supertest = require("supertest");
const app = require("../src/index");
const User = require("../src/model/user-model");

describe("Authentication APIs", () => {
  after((done) => {
    User.deleteOne({ email: "SignUpTestCase@gmail.com" }, (err) => {
      done();
    });
  });

  it("Should create user with username, password, email", function (done) {
    supertest(app)
      .post("/auth/signup")
      .send({
        username: "SignUpTestCase",
        password: "SignUpTestCase",
        email: "SignUpTestCase@gmail.com",
      })
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        assert(res.body.hasOwnProperty("_id"));
        assert(res.body.hasOwnProperty("username"));
        assert(res.body.hasOwnProperty("password"));
        assert(res.body.hasOwnProperty("email"));
        assert(res.body.hasOwnProperty("isAdmin"));
        assert(res.body.hasOwnProperty("isSearching"));
        assert(res.body.hasOwnProperty("difficulty"));

        assert(res.body.username == "SignUpTestCase");
        assert(res.body.email == "SignUpTestCase@gmail.com");
        assert(res.body.isAdmin == false);

        if (err) {
          console.error(err);
        }
        done();
      });
  });

  it("Should login user with password, email", function (done) {
    supertest(app)
      .post("/auth/signin")
      .send({
        password: "SignUpTestCase",
        email: "SignUpTestCase@gmail.com",
      })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(err);
        }
        res.status.should.equal(200);
        assert(res.body.hasOwnProperty("user"));
        assert(res.body.hasOwnProperty("token"));
        assert(res.body.hasOwnProperty("expiredAt"));

        assert(res.body.user.username == "SignUpTestCase");
        assert(res.body.user.email == "SignUpTestCase@gmail.com");
        assert(res.body.user.isAdmin == false);
        done();
      });
  });
});
