//controller mah user use huncha
import bcrypt from "bcryptjs";
import { User } from "../../models/model.js";
import userValidator from "../../validators/userValidator.js";
import jwt from "jsonwebtoken";
import appConfig from "../../appConfig.js";
import loginValidator from "../../validators/loginValidator.js";



export const loginUser = async (req, res) => {
  try {
    const { error, value } = loginValidator.validate(req.body, {
      abortEarly: false, // Report all errors
      stripUnknown: true, // Remove unknown fields
    });
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        })),
      });
    }
    const { email, password } = value;

    // Validate that email and password are provided

    // Find the user and include the password field
    const checkUser = await User.findOne({ email }).select("+password");
    console.log("Check User:", checkUser); // Log the entire user object

    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User  doesn't exist! Please register first",
      });
    }

    //check passwword match
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password, please try again",
      });
    }

    const token = jwt.sign(
      { id: checkUser.id, role: checkUser.role /* email: checkUser.email  */ },
      appConfig.userSecretKey,
      {
        subject: "accessApi",
        expiresIn: parseInt(appConfig.jwtExpirationTime, 10),
      }
    );
    console.log("JWT Expiration Time:", appConfig.jwtExpirationTime);
    console.log(
      "Cookie Max-Age:",
      parseInt(appConfig.jwtExpirationTime) * 1000
    ); //10
    // console.log("Generated Token:", token); // Log the generated token

    res
      .cookie("token", token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: appConfig.nodeEnv === "production", // Set to true in production
        sameSite: "lax", // Adjust based on your needs
        maxAge: parseInt(appConfig.jwtExpirationTime, 10) * 1000,
        path: "/", // This should allow the cookie to be sent with requests to all routes
        domain: appConfig.cookieDomain || undefined, // Should be 'localhost' in development
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          /*  email: checkUser .email, */
          role: checkUser.role,
          id: checkUser.id,
        },
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Some error occurred." });
  }
};

export const logoutUser = (req, res) => {
  console.log("inside logout");
  // Clear the cookie with the name 'token'
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only secure in production
    sameSite: "lax",
    path: "/", // Important to match cookie path
  });
  // res.redirect("https://accounts.google.com/Logout"); // Redirect to Google logout

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("token from authmiddleware", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided.",
      });
    }

    // Verify and decode token
    const decodedToken = jwt.verify(token, appConfig.userSecretKey);

    // Check user existence in the database
    const user = await User.findById(decodedToken.id); // Assuming `id` is in the token payload
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found.",
      });
    }

    // Check if the user is active (optional, based on app requirements)
    /* if (!user.isActive) {
          return res.status(403).json({
              success: false,
              message: 'Unauthorized: User is deactivated.',
          });
      } */
    console.log("after decoding the token from auth middleware", user);
    // Attach user data to the request object
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication Middleware Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token.",
    });
  }
};





export const setPassword =async (req, res) => {
  try {
    console.log("req.body for password",req.body);
    const { password } = req.body;
    console.log("paswprd to be set",password);
     
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
    }

    // Get user ID from JWT (cookie or auth header)
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("getting token from setpassword",token);
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized. Token missing." });
    }

    // Verify token
    const decoded = jwt.verify(token, appConfig.userSecretKey);
    const userId = decoded.id;

    // Find user in database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save password to user
    user.password = hashedPassword;
    await user.save();

    return res.json({ success: true, message: "Password set successfully.",user:{
      id: user.id,
      role: user.role,
    } });

  } catch (error) {
    console.error("Error setting password:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};