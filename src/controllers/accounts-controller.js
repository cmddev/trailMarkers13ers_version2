/**
 * Accounts Controller within the application
 * @Author: Caroline Daly
 */
import bcrypt from "bcrypt";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

const saltRounds = 10;

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to TrailMark" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for TrailMark" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      user.password = await bcrypt.hash(user.password, saltRounds); 
      await db.userStore.addUser(user);
      // return h.redirect("/");
      return h.redirect("/login");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Collection" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.password);   
      if (!user || !passwordsMatch) { 
      // if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },

  loginoauth: {
    auth: "github-oauth",
    handler: async function (request, h) {
      if (request.auth.isAuthenticated) {
        console.log(request.auth.credentials)
        const githubName = request.auth.credentials.profile.displayName.split(" ");
        const newUser = {
          firstName: githubName[0],
          lastName: githubName[1],
          email: request.auth.credentials.profile.email
        };
        const user = await db.userStore.addUser(newUser);
        request.cookieAuth.set({id: user._id});
        return h.redirect("/dashboard");
      }
      return h.redirect("/");
    },
  },
  
  showNoticeboard: {
    auth: false,
    handler: function (request, h) {
      return h.view("noticeboard-view", { title: "Welcome to the trailMark Noticeboard" });
    },
  },

  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
