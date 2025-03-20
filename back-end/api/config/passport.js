import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import appConfig from '../appConfig.js';
import dotenv from 'dotenv';
import { User } from '../models/model.js';
import userValidator from '../validators/userValidator.js';

dotenv.config();
const strategy = new GoogleStrategy(
  {
    clientID: appConfig.googleClientId,
    clientSecret: appConfig.googleClientSecret,
    callbackURL: 'http://localhost:9000/api/auth/google/callback', /* yei thau mah pathaucha */
    prompt: 'select_account',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // console.log("Inside Passport.js file");
      // console.log("profile from passport",profile);
      
      if (!profile) {
        return done(new Error('Profile not received from Google'), null);
      }

      // Check if user exists in the database (by email first)
       let user = await User.findOne({ email: profile.emails[0].value });
       console.log("user after finding email",user);
       console.log("user from passport " ,profile._json)
      
      
      
      if (!user) {
        // If user doesn't exist, create a new user
        let {error,value}=userValidator.validate(profile._json,{
          abortEarly: false, // Report all errors
          stripUnknown: true //remove unknown fileds
        })
        console.log("value from validator",value);
        if (error) {
          return done(
            new Error(
              `Validation failed: ${error.details
                .map((detail) => detail.message)
                .join(", ")}`
            ),
            null
          );
        }
          // If validation passes, create new user
        user = new User(value);
        await user.save();
      } else if (!user.googleId) {
        // If user exists but doesn't have a googleId, update it
        user.sub = profile._json.sub;
        await user.save();
      }
      return done(null, user);  //done passes the data to another call back functions
    } catch (error) {
      return done(error, null);
    }
  }
);
passport.use(strategy);
export default passport;







/* //ask password before saving to db
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import appConfig from "../appConfig.js";
import { User } from "../models/model.js";
import userValidator from "../validators/userValidator.js";

dotenv.config();

const strategy = new GoogleStrategy(
  {
    clientID: appConfig.googleClientId,
    clientSecret: appConfig.googleClientSecret,
    callbackURL: "http://localhost:9000/api/auth/google/callback",
    prompt: "select_account",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      if (!profile) {
        return done(new Error("Profile not received from Google"), null);
      }

      // Extract email
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });

      if (!user) {
        // 🚀 New User: Ask for Password Before Saving
        return done(null, { email, profile, newUser: true });
      }

      // 🔴 Existing User But No Password → Ask for Password
      if (!user.password) {
        return done(null, { email, profile, askPassword: true });
      }

      // ✅ User Exists & Has Password → Proceed with Login
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
);

passport.use(strategy);
export default passport; */
