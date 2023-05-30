import { expect } from "chai";
import { describe, it } from "mocha";
import sinon, { SinonStub, SinonSpy } from "sinon";
import { Request, Response } from "express";
import { createUser, getUser } from "../server/Controller/user";
import { User } from "../server/Models/Users";
import { HTTPStatusCode } from "../server/Utils/Errors/http.status.code";
import { errorType } from "../server/Utils/Errors/error.type";
import { ApiError } from "../server/Utils/Errors/ApiError";

describe("UserController", () => {
  describe("createUser", () => {
    it("should create a new user", async () => {
      const req: Partial<Request> = {
        body: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
      };
      const sendSpy: SinonSpy = sinon.spy();
      const statusSpy: SinonSpy = sinon.spy();
      const res: Partial<Response> = {
        status: statusSpy,
        send: sendSpy,
      };
      const next: sinon.SinonSpy = sinon.spy();

      const createUserStub: SinonStub = sinon
        .stub(User, "create")
        .resolves(req.body);

      await createUser(req as Request, res as Response, next);
      expect(statusSpy.calledWith(HTTPStatusCode.Created)).to.be.true;

      createUserStub.restore();
    });

    it("should handle database validation error", async () => {
      const req: Partial<Request> = {
        body: {},
      };
      const res: Partial<Response> = {};
      const next: sinon.SinonSpy = sinon.spy();

      const createUserStub: SinonStub = sinon.stub(User, "create").rejects({
        name: "ValidationError",
        message: "Validation error occurred",
      });

      await createUser(req as Request, res as Response, next);

      expect(createUserStub.calledOnceWith(req.body)).to.be.true;
      const obj = {
        errorType: errorType.VALIDATION_ERROR,
        statusCode: HTTPStatusCode.UnprocessableEntity,
      };

      expect(next.calledWith(sinon.match.instanceOf(ApiError))).to.be.true;

      expect(next.calledWith(obj)).to.be.true;

      createUserStub.restore();
    });
  });
  describe("get user", () => {
    it("should return user when user with given id exists", async () => {
      const findByIdStub: SinonStub = sinon
        .stub(User, "findById")
        .resolves({ name: "John Doe", age: 25 });

      const req: Partial<Request> = {
        params: {
          id: "123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      } as unknown as Response;

      await getUser(req as Request, res);

      expect(findByIdStub.calledOnceWithExactly("123", { __v: 0 })).to.be.true;
    });
  });
});
