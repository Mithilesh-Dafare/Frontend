// Handle contact form submission
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const submitButton = document.getElementById("contactSubmitButton");
  const messageDiv = document.getElementById("contactMessageDiv");
  const popup = document.getElementById("contactPopup");
  const popupText = document.getElementById("contactPopupText");
  const popupClose = document.getElementById("contactPopupClose");
  const popupCloseButton = document.getElementById("contactPopupCloseButton");
  const popupGoogleLink = document.getElementById("contactPopupGoogleLink");

  function setSendButtonState(isSending) {
    if (!submitButton) return;
    submitButton.disabled = isSending;
    submitButton.textContent = isSending ? "Sending..." : "Send Message";
  }

  function showPopup(message, googleFormLink = "") {
    if (!popup || !popupText) return;
    popupText.textContent = message;
    popup.style.display = "block";
    popup.setAttribute("aria-hidden", "false");

    if (popupGoogleLink) {
      if (googleFormLink) {
        popupGoogleLink.style.display = "inline-block";
        popupGoogleLink.href = googleFormLink;
      } else {
        popupGoogleLink.style.display = "none";
      }
    }
  }

  function closePopup() {
    if (!popup) return;
    popup.style.display = "none";
    popup.setAttribute("aria-hidden", "true");
  }

  if (popupClose) {
    popupClose.addEventListener("click", closePopup);
  }

  if (popupCloseButton) {
    popupCloseButton.addEventListener("click", closePopup);
  }

  if (popup) {
    popup.addEventListener("click", function (event) {
      if (event.target === popup) {
        closePopup();
      }
    });
  }

  // Check if product info is in URL
  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get("product");
  const productPrice = urlParams.get("price");

  if (productName && productPrice) {
    // Pre-fill message with product information
    const messageTextarea = document.getElementById("contactMessageText");
    if (messageTextarea) {
      messageTextarea.value = `I am interested in purchasing ${productName} at ₹${productPrice}/Kg.\n\nPlease provide more information about availability and bulk pricing options.`;
    }
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (submitButton && submitButton.disabled) {
        return;
      }

      const formData = {
        name: document.getElementById("contactName").value.trim(),
        email: document.getElementById("contactEmail").value.trim(),
        message: document.getElementById("contactMessageText").value.trim(),
      };

      // Validate
      if (!formData.name || !formData.email || !formData.message) {
        showMessage("Please fill in all fields", "error");
        return;
      }

      try {
        setSendButtonState(true);
        const response = await fetch(
          "https://backend-sandy-delta-67.vercel.app/api/contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        const data = await response.json();

        if (data.success) {
          showMessage(data.message, "success");
          showPopup(data.message, "https://forms.gle/79Sd2jqgUQK6Q1Z47");
          contactForm.reset();
        } else {
          const err = data.error || "Failed to send message";
          showMessage(err, "error");
          showPopup(
            `${err}. Please send via Google Form.`,
            "https://forms.gle/79Sd2jqgUQK6Q1Z47",
          );
        }
      } catch (error) {
        console.error("Contact form error:", error);
        const errorMessage = "Failed to send message. Please use Google Form.";
        showMessage(errorMessage, "error");
        showPopup(errorMessage, "https://forms.gle/79Sd2jqgUQK6Q1Z47");
      } finally {
        setSendButtonState(false);
      }
    });
  }
});

// Show message
function showMessage(message, type) {
  const messageDiv = document.getElementById("contactMessageDiv");
  if (messageDiv) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Hide after 5 seconds
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 5000);
  }
}
