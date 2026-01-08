/**
 * Notification System for Video Calls
 * This script handles sending notifications when a user clicks the video call button
 */

// Initialize EmailJS with your public key
(function() {
    // Replace with your actual EmailJS public key
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
})();

// Function to send video call notification
function sendVideoCallNotification() {
    // Get user and page information
    const userAgent = navigator.userAgent;
    const pageUrl = window.location.href;
    const timestamp = new Date().toLocaleString();
    
    // Get user's IP address (this is a free service, consider replacing with your own endpoint in production)
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIP = data.ip;
            sendEmailNotification(userAgent, pageUrl, timestamp, userIP);
            sendWhatsAppNotification(userAgent, pageUrl, timestamp, userIP);
        })
        .catch(error => {
            console.error('Error getting IP:', error);
            // Proceed without IP if there's an error
            sendEmailNotification(userAgent, pageUrl, timestamp, 'Not available');
            sendWhatsAppNotification(userAgent, pageUrl, timestamp, 'Not available');
        });
}

// Send email notification
function sendEmailNotification(userAgent, pageUrl, timestamp, ipAddress) {
    const templateParams = {
        to_email: 'your-email@example.com', // Replace with your email
        from_name: 'Website Visitor',
        page_url: pageUrl,
        timestamp: timestamp,
        user_agent: userAgent,
        ip_address: ipAddress
    };

    emailjs.send(
        'YOUR_EMAILJS_SERVICE_ID', // Replace with your service ID
        'YOUR_EMAILJS_TEMPLATE_ID', // Replace with your template ID
        templateParams
    ).then(function(response) {
        console.log('Email notification sent:', response.status, response.text);
    }, function(error) {
        console.error('Failed to send email notification:', error);
    });
}

// Send WhatsApp notification
function sendWhatsAppNotification(userAgent, pageUrl, timestamp, ipAddress) {
    const phoneNumber = '917058766180'; // Your WhatsApp number with country code (no + or 00)
    const message = `📞 New Video Call Request!%0A` +
                   `🌐 Page: ${encodeURIComponent(pageUrl)}%0A` +
                   `⏰ Time: ${encodeURIComponent(timestamp)}%0A` +
                   `📱 Device: ${encodeURIComponent(userAgent)}%0A` +
                   `🌍 IP: ${encodeURIComponent(ipAddress)}`;
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Add click event to all video call buttons
document.addEventListener('DOMContentLoaded', function() {
    const videoCallButtons = document.querySelectorAll('.video-call-float a');
    
    videoCallButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't prevent default to allow the link to open
            sendVideoCallNotification();
        });
    });
});
