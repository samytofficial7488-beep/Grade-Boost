// GRADE BOOST website interactions

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open and close the mobile navigation menu.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

// Close the mobile menu after a navigation link is selected.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

// Keep the copyright year up to date automatically.
document.getElementById("year").textContent = new Date().getFullYear();

// When a class fee card is selected, preselect that class in the enquiry form.
document.querySelectorAll("[data-class]").forEach((link) => {
  link.addEventListener("click", () => {
    const selectedClass = link.getAttribute("data-class");
    document.getElementById("studentClass").value = selectedClass;
  });
});

// Build a WhatsApp message from the enquiry form.
// WhatsApp opens in a new tab; the visitor must review and send the message themselves.
document.getElementById("enquiryForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const studentClass = document.getElementById("studentClass").value;
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !studentClass) {
    alert("Please enter your name and select a class.");
    return;
  }

  const whatsappNumber = "919576627477"; // India country code +91, without spaces or +
  const lines = [
    "Hello GRADE BOOST, I would like to enquire about coaching admission.",
    "",
    `Name: ${name}`,
    `Class: ${studentClass}`,
    phone ? `Phone: ${phone}` : "",
    message ? `Message: ${message}` : "",
    "",
    "Please share the admission details. Thank you."
  ].filter(Boolean);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
