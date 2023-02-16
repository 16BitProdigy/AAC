// eslint-disable-next-line import/no-extraneous-dependencies
const express = require("express");
const env = require("dotenv").config();

const app = express();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(`${__dirname} + /public/index.html`);
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: req.body.formEmail,
    to: "tomisinadeoti@gmail.com",
    subject: `Message from website: ${req.body.formEmail}`,
    text: req.body.formMessage,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error ${error}`);
      res.send("error");
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
