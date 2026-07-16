document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameInput = document.getElementById('name');
      const nameGroup = nameInput.parentElement;
      if (nameInput.value.trim() === '') {
        nameGroup.classList.add('invalid');
        isValid = false;
      } else {
        nameGroup.classList.remove('invalid');
      }

      // Validate Email
      const emailInput = document.getElementById('email');
      const emailGroup = emailInput.parentElement;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailGroup.classList.add('invalid');
        isValid = false;
      } else {
        emailGroup.classList.remove('invalid');
      }

      // Validate Message
      const messageInput = document.getElementById('message');
      const messageGroup = messageInput.parentElement;
      if (messageInput.value.trim() === '') {
        messageGroup.classList.add('invalid');
        isValid = false;
      } else {
        messageGroup.classList.remove('invalid');
      }

      if (isValid) {
        // Clear Form Values
        form.reset();
        
        // Show Success Toast
        if (toast) {
          toast.classList.add('active');
          document.body.style.overflow = 'hidden'; // Lock background scroll
        }
      }
    });

    // Clear validation states on input typing
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('invalid');
      });
    });
  }
});

// Toast Close Function
function closeToast() {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  }
}
