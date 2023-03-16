// const express = require('express');
// const env = require('dotenv').config();
// const nodemailer = require('nodemailer');

import express from 'express';
import env from 'dotenv';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname} + /public/index.html`);
});

app.post('/', (req, res) => {
  console.log('Sending Mail');
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // service: 'gmail',
    auth: {
      user: 'YOUR_EMAIL_GOES_HERE',
      pass: 'YOUR_PASSWORD_GOES_HERE'
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: 'tomisinadeoti@gmail.com',
    subject: `Message from website: ${req.body.email}`,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        status: 'error',
        message: error
      });
    } else {
      console.log(`Email sent: ${info.response}`);
      res.status(200).json({
        status: 'success',
        data: info
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
