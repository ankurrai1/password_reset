const request = require("supertest");
let assert = require("chai").assert;
let app = require("../app.js");


describe("app", () => {
    beforeEach(function () {
        handleError = function (done) {
            return function (err, res) {
                if (err) {
                    return done(err);
                }
                done();
            };
        };
    });
    describe("GET /bad", () => {
        it("resonds with 404", done => {
            request(app)
                .get("/bad")
                .expect(404)
                .end(handleError(done));
        });
    });
});