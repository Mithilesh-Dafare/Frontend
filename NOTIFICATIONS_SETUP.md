# Notification System Setup Guide

## 1. EmailJS Setup

1. **Sign up for EmailJS**:
   - Go to [EmailJS](https://www.emailjs.com/) and create a free account
   - Verify your email address

2. **Add an Email Service**:
   - In the EmailJS dashboard, click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the prompts to connect your email

3. **Create an Email Template**:
   - Go to "Email Templates" and click "Create New Template"
   - Use these placeholders in your template:
     ```
     New Video Call Request!
     ------------------------
     Page: {{page_url}}
     Time: {{timestamp}}
     User Agent: {{user_agent}}
     IP Address: {{ip_address}}
     ```
   - Save the template and note the Template ID

4. **Get Your Credentials**:
   - Go to "Integration" to find your:
     - Service ID
     - Template ID
     - Public Key

## 2. Update Configuration

1. Open `public/js/notifications.js`
2. Replace these placeholders with your actual credentials:
   - `YOUR_EMAILJS_PUBLIC_KEY`
   - `YOUR_EMAILJS_SERVICE_ID`
   - `YOUR_EMAILJS_TEMPLATE_ID`
   - `your-email@example.com` (your email address)
   - `917058766180` (your WhatsApp number with country code)

## 3. Test the System

1. Open your website in a browser
2. Click the video call button
3. You should receive:
   - An email notification
   - A WhatsApp message with the call details

## Troubleshooting

1. **No Email Received**:
   - Check your spam folder
   - Verify your EmailJS service is connected
   - Check the browser console for errors

2. **WhatsApp Not Opening**:
   - Ensure the phone number is in the correct format
   - Make sure WhatsApp is installed on your device

3. **IP Address Shows 'Not Available'**:
   - The IP lookup service might be blocked
   - Consider using a different IP lookup service

## Customization

1. **Change Notification Messages**:
   - Edit the message in `sendWhatsAppNotification()`
   - Update the email template in EmailJS

2. **Add More Information**:
   - You can add more user details to the notifications
   - Update both the JavaScript and email template

## Security Notes

1. **Rate Limiting**:
   - Consider adding rate limiting to prevent abuse
   - You can use localStorage to limit notifications

2. **Privacy**:
   - Inform users about data collection
   - Add a privacy policy page
   - Comply with GDPR/other regulations

## Support

For help, contact your developer or EmailJS support.
