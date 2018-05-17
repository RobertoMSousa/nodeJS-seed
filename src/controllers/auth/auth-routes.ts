
import express = require("express");
import authCtrl = require("./auth");
import * as passport from "passport";

export namespace Routes {
	export function auth(): express.Router {
		const router = express.Router();
		router.route("/login")
			.post(authCtrl.postLogin);

		router.route("/logout")
			.get(authCtrl.logout);

		router.route("/signup")
			.post(authCtrl.postSignup);

		return router;
	}
}
