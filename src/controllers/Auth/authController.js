const User = require("../../models/user");
const Email = require("../../utils/mailer");
const ResetEmail = require("../../utils/resetMailer");

const {
  compareString,
  generateAccessToken,
  hashString,
  randomToken,
} = require("../../utils/helper");

class Auth {
  signup = async (req, res) => {
    try {
      //   console.log(req.body);
      //   console.log(req.params);
      let { name, email, address, password, phone, role, zipCode, service } =
        req.body;
      email = email.toLowerCase();
      const user = await User.findOne({ email });

      // console.log(user);
      if (user) {
        return res.status(400).json({
          status: "error",
          message: "email already exist!",
        });
      }

      const passwordHash = await hashString(password);
      const data = await User.create({
        name,
        email,
        address: address ? address : "",
        phone,
        role: role,
        password: passwordHash,
        zipCode: zipCode ? zipCode : "",
        service: service ? service : "",
      });

      res.status(201).json({
        status: "success",
        message: "signup successfully!",
        data: data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  login = async (req, res) => {
    try {
      let { email, password } = req.body;
      email = email.toLowerCase();
      console.log(req.body);

      const response = await User.findOne({ email });

      // console.log(response);
      if (response && compareString(password, response.password)) {
        let accessToken = generateAccessToken(response);
        // console.log(accessToken, "......");
        return res.status(200).json({
          status: "success",
          token: accessToken,
          data: response,
          message: "login Successfully!",
        });
      } else {
        return res.status(403).json({
          status: "error",
          message: "Invalid credentials",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  resetPassword = async (req, res) => {
    try {
      console.log(req.params, req.body);
      const { _id } = req.params;
      const { password } = req.body;
      const passwordHash = await hashString(password);

      let data = await User.findByIdAndUpdate(
        _id,
        { password: passwordHash },
        { new: true }
      );

      if (data) {
        res.status(200).json({ message: "password reset successfully" });
      } else {
        res.status(400).json({ message: "unable to find user" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  sendResetPassword = async (req, res) => {
    try {
      console.log(req.body);
      const { email } = req.body;
      const data = await User.findOne({ email });
      if (data) {
        const url = `${process.env.FRONT_END_URL}/resetPassword/${data._id}`;
        await new ResetEmail(email, data.name, url).sendWelcome();
        res.status(200).json({ message: "Reset Mail sent successfully" });
      } else {
        res.status(400).json({ message: "email not exist" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };

  changePassword = async (req, res) => {
    try {
      const { _id } = req.params;
      const { currentPassword, newPassword } = req.body;
      console.log(_id, req.body);
      const data = await User.findById(_id);
      if (data && compareString(currentPassword, data.password)) {
        const passwordHash = await hashString(newPassword);
        const response = await User.findByIdAndUpdate(
          { _id },
          { password: passwordHash },
          { new: true }
        );
        res.status(200).json({ message: "password changed successfully" });
      } else {
        return res.status(400).json({ message: "invalid current Password" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "server error",
      });
    }
  };
}

module.exports = new Auth();
