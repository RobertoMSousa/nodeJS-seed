

import * as async from "async";
import * as crypto from "crypto";

import * as passport from "passport";
import { Request, Response, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import { isEmail } from "validator";
import { each } from "async";
import { Error } from "mongoose";

// mode
import { default as User, UserModel, AuthToken, userSalt } from "../../models/User";



/*
 *POST /auth/ogin
 *Sign in using email and password.
 */
export const postLogin = (req: Request, res: Response, next: NextFunction) => {

	if (!req.body.email) {
		res.status(206).json({message: "no email provided", error: undefined, data: undefined});
		return;
	}

	if (!isEmail(req.body.email)) {
		res.status(206).json({message: "email not valid", err: undefined, data: undefined});
		return;
	}

	if (!req.body.password) {
		res.status(206).json({message: "no password provided", error: undefined, data: undefined});
		return;
	}

	passport.authenticate("local", (err: Error, user: UserModel, info: IVerifyOptions) => {
		if (err) {
			res.status(500).json({message: undefined, error: err.message, data: undefined});
			return;
		}
		if (!user) {
			res.status(404).json({message: "email or password are wrong", error: undefined, data: {_id: undefined, isAuthenticated: false}});
			return;
		}
		req.logIn(user, (err: Error) => {
			if (err) {
				res.status(500).json({message: undefined, error: err.message, data: undefined});
				return;
			}
			res.status(200).json({message: "login with success", error: undefined, data: userSalt(user) });
			return;
		});
	})(req, res, next);
};



/**
 * GET /logout
 * Log out.
 */
export const logout = (req: Request, res: Response) => {
	req.logout();
	res.status(200).json({message: "logout success", error: undefined, data: undefined});
	return;
};

/**
 * POST /signup
 * Create a new local account
 * Params:
 * email -> string
 * password -> string
 * passwordRepeated -> string
 */
export const postSignup = (req: Request, res: Response, next: NextFunction) => {

	if (!req.body.email) {
		res.status(403).json({message: "no email provided", error: undefined, data: undefined});
		return;
	}
	if (!isEmail(req.body.email)) {
		res.status(500).json({message: "email not valid", error: undefined, data: undefined});
		return;
	}
	if (!req.body.password || !req.body.passwordRepeated) {
		res.status(403).json({message: "no password provided", error: undefined, data: undefined});
		return;
	}
	if (req.body.password !== req.body.passwordRepeated) {
		res.status(500).json({message: "passwords don't match", error: undefined, data: undefined});
		return;
	}

	// build the gravatar md5 hash
	const md5: string = crypto.createHash("md5").update(req.body.email).digest("hex");

	const user = new User({
		email: req.body.email,
		password: req.body.password,
		gravatar: `https://gravatar.com/avatar/${md5}?s=200&d=retro`
	});

	User.findOne({ email: req.body.email }, (err: Error, existingUser) => {
		if (err) {
			return next(err);
		}
		if (existingUser) {
			res.status(302).json({message: "user already exist", error: undefined, data: undefined});
			return;
		}
		user.save((err) => {
			if (err) {
				return next(err);
			}
			req.logIn(user, (err: Error) => {
				if (err) {
					res.status(500).json({message: undefined, error: err.message, data: undefined});
					return;
				}
				res.status(200).json({message: "account created", error: undefined, data: userSalt(<UserModel> user) });
				return;
			});
		});
	});
};