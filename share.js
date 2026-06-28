document.addEventListener('DOMContentLoaded', function() {
    const shareForm = document.getElementById('share-form');
    const fileInput = document.getElementById('food-image');
    const fileNameDisplay = document.querySelector('.file-name');
    
    // Update file name display when file is selected
    if (fileInput) {
      fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
          fileNameDisplay.textContent = this.files[0].name;
        } else {
          fileNameDisplay.textContent = 'No file chosen';
        }
      });
    }
    
    // Form submission handling
    if (shareForm) {
      shareForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('food-title').value;
        const category = document.getElementById('category').value;
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Listing...';
        
        // Simulate network delay
        setTimeout(() => {
          // Create a success message
          const formContainer = shareForm.parentNode;
          const successMsg = document.createElement('div');
          successMsg.className = 'success-message';
          successMsg.innerHTML = `
            <h3>Listing Created!</h3>
            <p>Your listing for "${title}" has been created and is now visible to people in your community.</p>
            <p>You'll receive notifications when someone is interested in your listing.</p>
            <div style="margin-top: 20px;">
              <button class="btn btn-outline" id="new-listing">Create Another Listing</button>
              <a href="/listings.html" class="btn btn-outline" style="margin-left: 10px;">View All Listings</a>
            </div>
          `;
          
          // Hide form and show success message
          shareForm.style.display = 'none';
          formContainer.appendChild(successMsg);
          
          // Reset form for future use
          shareForm.reset();
          fileNameDisplay.textContent = 'No file chosen';
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          
          // Add event listener to "Create Another Listing" button
          document.getElementById('new-listing').addEventListener('click', function() {
            successMsg.remove();
            shareForm.style.display = 'block';
          });
        }, 1500);
      });
    }
    
    // Set today's date as the minimum date for the expiry input
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${yyyy}-${mm}-${dd}`;
      
      expiryInput.setAttribute('min', formattedDate);
      expiryInput.value = formattedDate;
    }
  });