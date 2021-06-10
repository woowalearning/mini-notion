import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";

passport.serializeUser(function (user, done: any) {
  done(null, user);
});

passport.deserializeUser(function (obj, done: any) {
  done(null, obj);
});

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Google account with a user record in your database,
        // and return that user instead.
        console.log("profile", profile);

        return done(null, profile);
      });
    }
  )
);

export const setup = function (app: any) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["openid", "email"] }),
    function (req: Express.Request, res: Express.Response) {
      // The request will be redirected to Google for authentication, so this
      // function will not be called.
    }
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req: Express.Request, res: Express.Response) {
      console.log((req as any).query);
      (res as any).redirect("/");
    }
  );

  app.get("/logout", function (req: Express.Request, res: Express.Response) {
    req.logout();
    (res as any).redirect("/login");
  });
};
