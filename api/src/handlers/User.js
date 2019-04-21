import { User, UserSchema } from "../models";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";

import { tokenHelper } from "../helper";

export const create = async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    const validData = await matchedData(req).data;
    const user = new User(validData);
    try {
        const save= await user.save();
        const token = tokenHelper.create({
            id: save._id,
            email: save.email,
            role: save.role
        });
        return res.status(200).json({ token, save, message: "User has been created" });
    } catch (errors) {
        return res.status(500).json({ errors });
    }
};

export const all = async (req, res)=> {
    try {
        const users = await User.find({});
        return res.status(200).json({ users });
    } catch (errors) {
        return res.status(500).json({ errors });
    }
};


export const byId = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    const validData = matchedData(req);
    try {
        const user = await User.findById(validData.id);
        if (!user) return res.status(404).json({ errors: "User not found" });
        return res.status(200).json({ user });
    } catch (errors) {
        return res.status(500).json({ errors });
    }
};

export const byField = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    const validData = matchedData(req);
    const formatData = {};
    formatData[validData.field] = validData.data;
    try {
        let user = await User.find(formatData);
        if (user.length === 1) user = user[0];
        if (user.length === 0) return res.status(404).json({ errors: "User not found" });
        return res.status(200).json({ user });
    } catch (errors) {
        return res.status(500).json({ errors });
    }
};

export const update = async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    const validData = matchedData(req);
    try {
        await User.findByIdAndUpdate(validData.id, validData.data);
        const user = await User.findById(validData.id);
        return res.status(200).json({ user, message: "User has been updated" });
    } catch (errors) {
        return res.status(500).json({ errors });
    }
};

export const remove = async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    const validData = matchedData(req);
    try {
        const user = await User.findByIdAndRemove(validData.id);
        return res.status(200).json({ user, message: "User has been removed" });
    } catch (errors) {
        return res.status(500).json({ errors });
    }
};
