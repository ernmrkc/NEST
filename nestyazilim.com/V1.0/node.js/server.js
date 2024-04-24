const HOST = 'www.nestyazilim.com';                                                        // Server ip address
const PORT = process.env.PORT || 8080;                                              // The port the server is running on

const express = require('express');                                                 // It's used for building web applications and APIs.
const https = require('https');                                                     // Secure connection
const fs = require('fs');                                                           // File system
const cors = require('cors');                                                       // Cors-origin resource sharing
const nodemailer = require('nodemailer');                                           // Easy email sending
const multer  = require('multer');                                                  // Multipart/form-data
const app = express();                                                              // Creating an Express application instance.
const upload = multer({ dest: 'uploads/' });                                        // Storage destination for files


const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/nestyazilim.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/nestyazilim.com/fullchain.pem')
};

app.use(cors());                                                                    // Use CORS 
app.use(express.json());                                                            // Use Express


let transporter = nodemailer.createTransport({

  service: 'gmail',                                                                 // Using the 'gmail' service. This allows Nodemailer to directly interact with Gmail's SMTP server.

  // Authentication information for the user.
  auth: {
    user: 'nestsoftwareservice@gmail.com',                                          // E-mail address of the Gmail account.
    pass: 'jyqn xvdt sejh vdza'                                                     // The password for the Gmail account.
  }
});

/**
 * This function sends an email using the 'nodemailer' module of Node.js.
 * It takes a 'mailOptions' object and a 'callback' function as parameters.
 * 
 * @param {Object} mailOptions - An object containing the necessary information for sending an email.
 * This object typically includes:
 *   - from: The sender's email address.
 *   - to: The recipient's email address(es).
 *   - subject: The subject line of the email.
 *   - text: The plain text body of the email.
 *   - html: (optional) The HTML body of the email.
 *
 * @param {Function} callback - A callback function that gets executed after the email has been sent.
 * The callback function takes two parameters:
 *   - error: An error object if the email sending fails.
 *   - info: An object containing information about the sent email if the sending is successful.
 *
 * Usage Example:
 *   sendMail({
 *     from: 'sender@example.com',
 *     to: 'recipient@example.com',
 *     subject: 'Test Email',
 *     text: 'This is a test email.'
 *   }, (error, info) => {
 *     if (error) {
 *       console.log('Error:', error);
 *     } else {
 *       console.log('Email Sent:', info.response);
 *     }
 *   });
 */
function sendMail(mailOptions, callback) {
  transporter.sendMail(mailOptions, callback);
}

/** 
 *  Define a POST endpoint '/careerApplication' for handling career application form submissions.
 *  This endpoint uses 'upload.fields' middleware from Multer for handling multipart/form-data,
 *  which is necessary for processing file uploads. In this case, it's configured to accept two files:
*/ 
app.post('/careerApplication', upload.fields([{ name: 'user_cv', maxCount: 1 }, { name: 'user_coverLetter', maxCount: 1 }]), (req, res) => {

  const { user_name, user_phone, user_email, application_department } = req.body;   // Extract user submitted data from the request body. This includes name, phone number, email, and the department for application.

  let mailOptions = {                                                               // Configure the email options for sending an application confirmation.
    from: 'nestsoftwareservice@gmail.com',                                          // Sender's email address
    to: 'nest@nestyazilim.com',                                                     // Recipient's email address
    subject: `Application for ${application_department}`,                           // E-mail subject
    text: `Name: ${user_name}\nMail: ${user_email}\nPhone: ${user_phone}\nPosition: ${application_department}`,
  
    attachments: [
      { filename: req.files.user_cv[0].originalname, path: req.files.user_cv[0].path },
      { filename: req.files.user_coverLetter[0].originalname, path: req.files.user_coverLetter[0].path }
    ]
  };

  sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Application email could not be sent.');
    } else {
      console.log('Application email sent: ' + info.response);
      res.send('Application email sent successfully.');
    }
  });
});

/**
 *  Define a POST endpoint '/businessInquiry' for handling business inquiries.
 *  This endpoint uses 'upload.none()' middleware from Multer, which indicates that the form does not involve any file upload.
 *  It's purely for text-based data submitted in the request body.
 */ 
app.post('/businessInquiry', upload.none(), (req, res) => {

  const { name_surname, phone_no, mail, company, subject, explanation } = req.body; // Extract data from the request body. This data includes name, phone number, email, company name, subject, and explanation of the inquiry.

  let mailOptions = {                                                               // Configure the email options for sending the business inquiry.
    from: 'nestsoftwareservice@gmail.com',                                          // Sender's email address
    to: 'nest@nestyazilim.com',                                                     // Recipient's email address
    subject: subject,                                                               // E-mail subject
    text: `Name: ${name_surname}\nPhone: ${phone_no}\nMail: ${mail}\nCompany: ${company}\nExplanation: ${explanation}`
  };

  sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Business inquiry email could not be sent.');
    } else {
      console.log('Business inquiry email sent: ' + info.response);
      res.send('Business inquiry email sent successfully.');
    }
  });
});


/**
 *  Define a POST endpoint '/supportRequest' for handling general support requests.
 *  This endpoint uses 'upload.none()' middleware from Multer, indicating that the form doesn't involve any file upload.
 *  It's intended for handling text-based data submitted in the request body.
 */ 
app.post('/supportRequest', upload.none(), (req, res) => {

  const { mail, issue, subject, explanation } = req.body;                           // Extract data from the client's request. This includes the client's email, issue, subject, and a detailed explanation.

  let mailOptions = {                                                               // Configure the email options for sending out the support request.
    from: 'nestsoftwareservice@gmail.com',                                          // Sender's email address
    to: 'nest@nestyazilim.com',                                                     // Recipient's email address (support team's address)
    subject: subject,                                                               // Email subject
    text: `Mail: ${mail}\nIssue: ${issue}\nExplanation: ${explanation}`            
  };

  sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('General inquiry email could not be sent.');
    } else {
      console.log('General inquiry email sent: ' + info.response);
      res.send('General inquiry email sent successfully.');
    }
  });
});

/**
 * Start the HTTPS Server.
 * This block of code uses the 'https' module to create a secure server over HTTPS.
 * The 'https.createServer' method initializes an HTTPS server with SSL/TLS options and the Express application.
 * The 'listen' method is used to bind and listen for connections on the specified host and port.
 * This setup is a fundamental part of setting up a secure web server using Node.js with HTTPS.
 */
https.createServer(options, app).listen(PORT, HOST, () => {
  console.log(`Server is running on https://${HOST}:${PORT}`);
});
