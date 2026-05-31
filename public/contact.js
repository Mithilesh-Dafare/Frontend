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

  // Tab switching
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  console.log("Tab buttons found:", tabButtons.length);
  console.log("Tab contents found:", tabContents.length);

  tabButtons.forEach((button, index) => {
    console.log(
      `Setting up click handler for button ${index}:`,
      button.textContent,
    );

    button.addEventListener("click", function (e) {
      console.log("Tab button clicked:", this.textContent);
      e.preventDefault();
      e.stopPropagation();

      const tabName = this.getAttribute("data-tab");
      console.log("Tab name to show:", tabName);

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      const targetContent = document.getElementById(tabName);
      if (targetContent) {
        targetContent.classList.add("active");
        console.log("Activated tab:", tabName);
      } else {
        console.error("Tab content not found:", tabName);
      }
    });
  });
  function setSendButtonState(isSending) {
    if (!submitButton) return;
    submitButton.disabled = isSending;
    submitButton.textContent = isSending ? "Sending..." : "Send Message";
  }

  function showPopup(message, type, googleFormLink = "") {
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
        phone: document.getElementById("contactPhone").value.trim(),
        country: document.getElementById("contactCountry").value.trim(),
        organization: document
          .getElementById("contactOrganization")
          .value.trim(),
        role: document.getElementById("contactRole").value.trim(),
        message: document.getElementById("contactMessageText").value.trim(),
      };

      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.country ||
        !formData.organization ||
        !formData.role
      ) {
        showMessage("Please fill in all required fields", "error");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showMessage("Please enter a valid email address", "error");
        return;
      }

      try {
        setSendButtonState(true);
        console.log("Sending contact form data:", formData);
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });

        console.log("Response status:", response.status);

        let data;
        try {
          data = await response.json();
          console.log("Response data:", data);
        } catch (jsonError) {
          console.error("Error parsing JSON response:", jsonError);
          const text = await response.text();
          console.error("Raw response:", text);
          throw new Error("Invalid response from server");
        }

        if (!response.ok) {
          console.error("Server returned error status:", response.status);
          throw new Error(data.error || `Server error: ${response.statusText}`);
        }

        if (data.success) {
          showMessage(data.message, "success");
          showPopup(data.message, "success");
          contactForm.reset();
        } else {
          const err = data.error || "Failed to send message";
          showMessage(err, "error");
          showPopup(
            `${err}. Please send via Google Form.`,
            "error",
            "https://forms.gle/79Sd2jqgUQK6Q1Z47",
          );
        }
      } catch (error) {
        console.error("Contact form error:", error);
        const errorMessage = "Failed to send message. Please use Google Form.";
        showMessage(errorMessage, "error");
        showPopup(errorMessage, "error", "https://forms.gle/79Sd2jqgUQK6Q1Z47");
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
    messageDiv.style.display = "block";

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Hide after 5 seconds
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 5000);
  }
}
