// app/nodemailer.js

import nodemailer from 'nodemailer';

// Create a transporter object using your email service's SMTP settings
const transporter = nodemailer.createTransport({
  service: process.env.Service, // e.g., 'Gmail', 'Yahoo', etc.
  auth: {
    user: process.env.User,
    pass: process.env.Pass,
  },
});

export default transporter;
