/**
 * Notification System for Video Calls
 * This script handles sending notifications when a user clicks the video call button
 */

// Check if emailjs is available
function isEmailJsAvailable() {
    return typeof emailjs !== 'undefined' && 
           typeof emailjs.init === 'function' &&
           typeof emailjs.send === 'function';
}

// Initialize EmailJS if available
if (typeof emailjs !== 'undefined') {
    try {
        emailjs.init({
            publicKey: 'YOUR_EMAILJS_PUBLIC_KEY' // Replace with your actual public key
        });
        console.log('EmailJS initialized successfully');
    } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
    }
}

// Function to send video call notification
function sendVideoCallNotification() {
    // Get user and page information
    const userAgent = navigator.userAgent;
    const pageUrl = window.location.href;
    const timestamp = new Date().toLocaleString();
    
    // Try to get IP address
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

// Send email notification if EmailJS is available
function sendEmailNotification(userAgent, pageUrl, timestamp, ipAddress) {
    if (!isEmailJsAvailable()) {
        console.log('EmailJS not available, skipping email notification');
        return;
    }

    const templateParams = {
        to_email: 'your-email@example.com', // Replace with your email
        from_name: 'Website Visitor',
        page_url: pageUrl,
        timestamp: timestamp,
        user_agent: userAgent,
        ip_address: ipAddress
    };

    try {
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);
            }, function(error) {
                console.error('Failed to send email:', error);
            });
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Send WhatsApp notification
function sendWhatsAppNotification(userAgent, pageUrl, timestamp, ipAddress) {
    const whatsappUrl = 'https://wa.me/917058766180?text=' + 
        encodeURIComponent(`📞 New Video Call Request!%0A` +
                         `🌐 Page: ${encodeURIComponent(pageUrl)}%0A` +
                         `⏰ Time: ${encodeURIComponent(timestamp)}%0A` +
                         `📱 Device: ${encodeURIComponent(userAgent)}%0A` +
                         `🌍 IP: ${encodeURIComponent(ipAddress)}`);
    
    // Open in new tab without blocking
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
        newWindow.location.href = whatsappUrl;
    }
}

// Add click event to all video call buttons
document.addEventListener('DOMContentLoaded', function() {
    const videoCallButtons = document.querySelectorAll('.video-call-float a, .video-call-button');
    
    // Only add event listeners if buttons exist
    if (videoCallButtons.length > 0) {
        videoCallButtons.forEach(button => {
            // Remove any existing click handlers to prevent duplicates
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add new click handler
            newButton.addEventListener('click', function(e) {
                // Always send notification
                sendVideoCallNotification();
                
                // Only prevent default if it's not a direct link
                const href = this.getAttribute('href');
                if (!href || href === '#' || href === 'javascript:void(0)') {
                    e.preventDefault();
                    window.open('https://meet.google.com/new', '_blank');
                }
            });
        });
    } else {
        console.log('No video call buttons found on the page');
    }
});
