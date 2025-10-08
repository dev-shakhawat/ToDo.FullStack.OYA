const argon = require("argon2");
const sendUserMail = require("../../helpers/sendMail");
const userSchema = require("../../schema/userSchema");
const jwt = require("jsonwebtoken");
const emailqueue = require("../../configurations/mailConfig");

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Regex for email validation
    const mailPattern =
      /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/;

    if (!username)
      return res
        .status(400)
        .send({ success: false, message: "Username is required" });

    if (username && username.length < 3)
      return res
        .status(400)
        .send({
          success: false,
          message: "Username must be at least 3 characters long",
        });

    if (!email)
      return res
        .status(400)
        .send({ success: false, message: "Email is required" });

    if (!mailPattern.test(email))
      return res
        .status(400)
        .send({ success: false, message: "Invalid email address" });

    if (!password)
      return res
        .status(400)
        .send({ success: false, message: "Password is required" });

    // hash password
    const passwordHash = await argon.hash(password);

    // create user
    const user = await userSchema.create({
      username,
      email,
      password: passwordHash,
    });

    if (user) {




      await emailqueue.add(
        "accountVerificationMail",
        { email: user.email , _id: user._id },
        { attempts: 5, backoff: 5000, removeOnComplete: true }
      );

      return res.status(200).send({
        success: true,
        message:
          "Registered successfully, please check your email for verification",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ error: error.message || "user registration failed" });
  }
}



emailqueue.process( "accountVerificationMail" , async (job) => {
 
  try {

    // access token generate
      const accessToken = jwt.sign( { _id: job.data._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" } );

    // verification link
    const link = `${process.env.CLIENT_URL}/auth/verify-token/${accessToken}`;

    await sendUserMail(
      job.data.email,
      "Account Verification",
      `<h2>Please click <a href="${link}">verify your account</a> to complete your registration</h2>`
    );

  } catch (error) {
    console.log(error);
  }
});

module.exports = register;
