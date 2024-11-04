import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { validPassword } from "../lib/passwordUtils.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
  try {
    //get user from username
    const user = await prisma.users.findUnique({ where: { email: email } });

    //if doesnt exist return done(null,false)
    if (!user) return done(null, false, { message: "Incorrect email" });

    //else check password
    const match = validPassword(password, user.password, user.salt);

    //if its false return done(null,false)
    if (!match) return done(null, false, { message: "Incorrect password" });
    //else was successfull return done(null,user)
    return done(null, user);

    //catch err return done(err)
  } catch (err) {
    return done(err);
  }

  //catch err return done(err)
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.users.findUnique({ where: { id: id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
