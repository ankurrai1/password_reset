import { Router } from "express";
import { check, param } from "express-validator/check";
import * as asyncHandler from "express-async-handler";

import { User, Auth } from "../handlers";
// import { validator } from "../helper";

//suddenly i learnd we can use import in our js file it is implimented for node .

const router = Router();

router.use(Auth.authJwt);

router.post("/", [
    check("data")
    .custom(value => validator.fields(value, "User", true))
    .custom(value => validator.checkData(value, "User")),
    check("data.email")
        .isEmail().withMessage("Must be a valid email")
        .trim()
        .normalizeEmail()
], asyncHandler(User.create));

router.get("/", asyncHandler(User.all));

router.get("/:id", [
    check("id")
    .trim()
    .custom(value => validator.objectId(value))
], asyncHandler(User.byId));

router.get("/:field/:data", [
    check("field")
    .trim()
    .custom(value => validator.fields(value, "User")),
    check("data")
    .trim()
], asyncHandler(User.byField));

router.put("/:id", [
    check("id")
    .trim()
    .custom(value => validator.objectId(value)),
    check("data")
    .custom(value => validator.fields(value, "User", true))
    .custom(value => validator.checkData(value, "User", false))
], asyncHandler(User.update));

router.delete("/:id", [
    check("id")
    .trim()
    .custom(value => validator.objectId(value))
], asyncHandler(User.remove));

export default router;
