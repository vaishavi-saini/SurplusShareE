document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you'd send this data to a server
        // For this demo, we'll just show a success message
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate network delay
        setTimeout(() => {
          // Show success message
          const formContainer = contactForm.parentNode;
          const successMsg = document.createElement('div');
          successMsg.className = 'success-message';
          successMsg.innerHTML = `
            <h3>Message Sent!</h3>
            <p>Thank you for contacting us, ${name}! We'll get back to you soon at ${email}.</p>
            <button class="btn btn-outline" id="send-another">Send Another Message</button>
          `;
          
          // Hide form and show success message
          contactForm.style.display = 'none';
          formContainer.appendChild(successMsg);
          
          // Reset form for future use
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          
          // Add event listener to "Send Another Message" button
          document.getElementById('send-another').addEventListener('click', function() {
            successMsg.remove();
            contactForm.style.display = 'block';
          });
        }, 1500);
      });
    }
  });