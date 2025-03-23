import { Router } from "express";
import {
  authMiddleware,
  loginUser,
  logoutUser,
  setPassword,
} from "../../controllers/auth/authController.js";
import passport from "passport";
import jwt from 'jsonwebtoken';
import appConfig from "../../appConfig.js";
import { User } from "../../models/model.js";


let authRouter = Router();

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/auth/login" ,session: false}),
  async (req, res) => {
    try {
      console.log("inside/google")
      const user = req.user;
      console.log("user from",user)
     
       
      const token = jwt.sign(
        { id:  user._id, role: user.role, /* email: checkUser.email  */},
        appConfig.userSecretKey,
        { subject: "accessApi", expiresIn: parseInt(appConfig.jwtExpirationTime, 10)}
      );
      res.cookie("token", token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: appConfig.nodeEnv === "production", // Set to true in production
        sameSite: "lax", // Adjust based on your needs
        maxAge: parseInt(appConfig.jwtExpirationTime, 10) * 1000,
        path: "/", // This should allow the cookie to be sent with requests to all routes
        domain: appConfig.cookieDomain || undefined, // Should be 'localhost' in development
      })

      const existingUser = await User.findById(user._id).select("+password"); 

      console.log("User from DB with password:", existingUser); 
      
       if (!existingUser.password) {
        return res.redirect("http://localhost:5173/auth/set-password");
      }


   // Redirect to frontend dashboard
      if (user.role==="admin") {
        res.redirect("http://localhost:5173/admin/dashboard");
      } else {
        res.redirect("http://localhost:5173/shop/home");
      }
    
      // res.redirect("http://localhost:5173/dashboard");
    } catch (error) {
      console.error("Error in Google callback:", error);
      res.redirect("http://localhost:5173/login?error=server");
    }
  }
);


// authRouter.post("/register", registerUser); //  kunchain frontend ko child page bata data pathauni ho rah kun ,function ley db mah save garcha
authRouter.post("/login", loginUser);
authRouter.post("/set-password",setPassword);
authRouter.post("/logout", logoutUser);
authRouter.get("/check-auth", authMiddleware, async (req, res) => {
  //auth midddler ley token chaki chaina check garcha rah cha bhaney token ko data lai get garera middleware next mah pathaucha
  try {
    // Extract user from middleware-processed request
    const user = req.user;
     console.log("sending data of user from next middleware to frontend", user)
    // Validate user object
    //uta authmiddleware lai feri get garera check gareko
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User data not found.",
      });
    }
    // Log user for debugging (avoid logging sensitive data)
    // console.log("Authenticated User Details:", user);
    const safeUser = {
      id: user._id, 
      name: user.name,
      email: user.email,
      role: user.role,
      picture: user.picture,
      notificationPreferences: user.notificationPreferences,
      createdAt: user.createdAt,
      isPasswordSet: !!user.password,
    };
    // Return success response
    res.status(200).json({
      success: true,
      message: "User authenticated successfully.",
      user:safeUser, // Send user data in response
    });
  } catch (error) {
    // Catch unexpected errors
    console.error("Error in /check-auth route:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default authRouter;
