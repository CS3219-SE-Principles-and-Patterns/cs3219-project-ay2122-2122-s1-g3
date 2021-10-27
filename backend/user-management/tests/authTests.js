const should = require("should");
const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../src/index");
const User = require("../src/model/user-model");

describe("Sign Up API", () => {
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
        res.status.should.equal(200);
        done();
      });
  });
});
