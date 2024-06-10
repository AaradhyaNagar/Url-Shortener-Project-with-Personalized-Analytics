const USER = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const UserSignUp = async (req, res) => {
  const { firstName, lastName, email, password, reEnterPassword } = req.body;

  console.log(
    "Creating new user with name",
    firstName,
    lastName,
    "\n and e-mail :",
    email
  );
  if (password !== reEnterPassword) {
    return res.render("register-page", { error: "Passwords do not match" });
  }

  try {
    await USER.create({
      firstName,
      lastName,
      email,
      password,
    });
    console.log("Hemlo from registration page");

    console.log(
      "New user with name " +
        firstName +
        " " +
        lastName +
        " is created\n" +
        "With e-mail: " +
        email
    );

    return res.render("logIn-page");
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      return res.render("register-page", { error: "Email already exists" });
    }
    console.error("Error creating user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const UserLogIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(`Looking for user with email : ${email}`);
    const findEmail = await USER.findOne({ email });
    if (!findEmail) {
      return res.render("logIn-page", {
        error: "No User with this e-mail found",
      });
    }

    const user = await USER.findOne({ email, password });
    if (!user) {
      return res.render("logIn-page", {
        error: "Incorrect password",
      });
    }
    console.log(`User found with e-mail ${email}`);

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);

    return res.redirect("/app");
  } catch (error) {}
};

module.exports = { UserSignUp, UserLogIn };
