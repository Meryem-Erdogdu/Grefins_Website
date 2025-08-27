# GREFINS Website Email Section Setup Instructions

This document provides detailed instructions for setting up the email functionality in the contact section of the GREFINS website to make it fully active and functional.

## Overview

The contact form in the GREFINS website uses a dual approach for email delivery:
1. **Primary Method**: EmailJS (client-side email service)
2. **Fallback Method**: Outlook mailto link

## Setting Up EmailJS (Recommended)

### Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. The free tier allows 200 emails/month which should be sufficient for most use cases

### Step 2: Set Up an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, or custom SMTP)
4. Configure the service with your email account credentials
5. Name the service `service_grefins` (this matches the code in script.js)

### Step 3: Create an Email Template

1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Name the template `template_grefins` (this matches the code in script.js)
4. Design your email template using the following variables:
   - `{{from_email}}` - Sender's email address
   - `{{message}}` - Message content
   - `{{subject}}` - Email subject
   - `{{to_email}}` - Recipient email address

Example template:
```
Subject: {{subject}}

New message from GREFINS website:

From: {{from_email}}

Message:
{{message}}
```

### Step 4: Update Your Public Key (If Needed)

The website is already configured with a public key (`sWI9EUuBLiYp1XRyN`). If you want to use your own EmailJS account:

1. In your EmailJS dashboard, go to "Account" → "API Keys"
2. Copy your "Public Key"
3. In `index.html`, find this line:
   ```javascript
   emailjs.init("sWI9EUuBLiYp1XRyN");
   ```
4. Replace `sWI9EUuBLiYp1XRyN` with your own public key

### Step 5: Update Recipient Email (Optional)

The current recipient email is set to `grefins.contact@gmail.com`. To change this:

1. In `script.js`, find this line:
   ```javascript
   to_email: 'grefins.contact@gmail.com'
   ```
2. Replace `grefins.contact@gmail.com` with your desired recipient email

## Testing the Email Functionality

1. Open `index.html` in your browser
2. Scroll to the contact section (Section 06)
3. Fill in the email form with a test message
4. Click "Send Message"
5. Check your email inbox for the received message

## Troubleshooting

### If emails are not being sent:

1. Check your browser console for errors (F12 → Console tab)
2. Verify your EmailJS service is properly configured
3. Ensure your EmailJS account is active and not over its usage limits
4. Check that the service name (`service_grefins`) and template name (`template_grefins`) match exactly

### If the fallback Outlook method isn't working:

1. Ensure you have an email client (like Outlook or Gmail) installed and configured on your system
2. Check that your browser is set to use the correct email client for mailto links

## Alternative: Using PHP Backend (Advanced)

If you prefer a server-side solution, you can use the included `send-mail.php` file:

1. Upload `send-mail.php` to your web server
2. Modify the `$to` variable in the PHP file to your email address
3. Update the form action in `index.html` to point to `send-mail.php`
4. Ensure your web server supports PHP and has mail functionality enabled

## Contact

For additional help with setting up the email functionality, contact the GREFINS development team.