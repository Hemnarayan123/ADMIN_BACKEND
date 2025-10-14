const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailer = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

exports.generateEmailTemplate = (type, recipientName, actionLink) => {
    let subject, title, message, buttonText;

    switch (type) {
        case "enquiry":
            subject = "Thank you for your enquiry - Brenin";
            title = "We Received Your Enquiry";
            message = `Hi ${recipientName},<br/><br/>Thank you for reaching out to us. We have received your enquiry and our team will get back to you shortly. You can check the status of your enquiry by clicking the link below.`;
            buttonText = "More Information";
            break;

        default:
            throw new Error("Invalid email type");
    }

    return {
        subject,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        /* Basic styling */
        body, table, td, a {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            text-decoration: none;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        .email-container {
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #f8f9fa;
            text-align: center;
            height: 260px;
            width: 100%;
        }
        .email-header img {
            max-width: 100%;
            height: 100%;
            object-fit: cover; /* Ensures the image fills the container */
        }
        .email-hero {
            background-color: #f8f9fa;
            text-align: center;
            padding: 20px;
        }
        .email-hero h2 {
            font-size: 22px;
            color: #333;
            margin: 0 0 10px;
        }
        .email-hero p {
            color: #555;
            margin: 10px 0;
        }
        .email-button {
            padding: 12px 24px;
            background-color: #279be3;
            color: #FFFFFF;
            border-radius: 4px;
            text-decoration: none;
            display: inline-block;
            margin-top: 10px;
        }
        .email-content {
            padding: 20px;
            color: #333;
            font-size: 14px;
            text-align: center; /* Corrected here */
        }
        .email-footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 20px;
            color: #777;
            font-size: 12px;
        }
        .email-footer img {
            max-width: 120px;
            margin-top: 10px;
        }
            .ii a[href]{
            color: #FFFFFF !important;
            }
    </style>
</head>
<body>
    <table class="email-container">
        <!-- Header -->
        <tr>
            <td class="email-header">
                <img src="https://drive.google.com/uc?export=view&id=1Evk3iZ89A9VGvFFFT0A_wcntr7K7d6iq" alt="Header Image">
            </td>
        </tr>
        <!-- Hero Section -->
        <tr>
            <td class="email-hero">
                <h2>${title}</h2>
                <p>${message}</p>
                <a href="${actionLink}" class="email-button">${buttonText}</a>
            </td>
        </tr>
        <!-- Main Content -->
        <tr>
            <td class="email-content">
                <p>If you did not request this, please ignore this email.</p>
            </td>
        </tr>
        <!-- Footer -->
        <tr>
            <td class="email-footer">
                <p>&copy; 2024 Brenin || All rights reserved.</p>
                <img src="https://drive.google.com/uc?export=view&id=1ZQq6WzUfiD1ex-M6ZVC_30zlV6t_jxnv" alt="Company Logo" class="email-logo">
            </td>
        </tr>
    </table>
</body>
</html>
`,
    };
};
