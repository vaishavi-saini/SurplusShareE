document.addEventListener('DOMContentLoaded', function() {
    // Listings filter functionality
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const distanceFilter = document.getElementById('distance-filter');
    const listingCards = document.querySelectorAll('.listing-card');
    
    // Search functionality
    if (searchInput) {
      searchInput.addEventListener('input', filterListings);
    }
    
    // Category filter
    if (categoryFilter) {
      categoryFilter.addEventListener('change', filterListings);
    }
    
    // Distance filter
    if (distanceFilter) {
      distanceFilter.addEventListener('change', filterListings);
    }
    
    function filterListings() {
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
      const categoryValue = categoryFilter ? categoryFilter.value.toLowerCase() : '';
      const distanceValue = distanceFilter ? parseFloat(distanceFilter.value) : 0;
      
      listingCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.listing-description').textContent.toLowerCase();
        const category = card.querySelector('.listing-category') ? 
                        card.querySelector('.listing-category').textContent.toLowerCase() : '';
        
        // Extract distance from the location text (e.g., "Downtown, 2.3 miles away")
        const locationText = card.querySelector('.listing-location').textContent;
        const distanceMatch = locationText.match(/(\d+\.\d+|\d+)\s*miles/);
        const cardDistance = distanceMatch ? parseFloat(distanceMatch[1]) : 999;
        
        // Check if the card matches all active filters
        const matchesSearch = searchTerm === '' || 
                             title.includes(searchTerm) || 
                             description.includes(searchTerm);
                             
        const matchesCategory = categoryValue === '' || 
                               category.includes(categoryValue);
                               
        const matchesDistance = distanceValue === 0 || 
                               cardDistance <= distanceValue;
        
        // Show or hide the card based on filter results
        if (matchesSearch && matchesCategory && matchesDistance) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
    
    // Pagination functionality
    const pageButtons = document.querySelectorAll('.page-btn');
    if (pageButtons.length > 0) {
      pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          // Remove active class from all buttons
          pageButtons.forEach(b => b.classList.remove('active'));
          
          // Add active class to clicked button
          if (!this.classList.contains('next')) {
            this.classList.add('active');
          }
          
          // In a real application, we would load the new page of results here
          // For this demo, just scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }
    
    // Request item buttons
    const requestButtons = document.querySelectorAll('.listing-card .btn');
    requestButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const listingTitle = this.closest('.listing-content').querySelector('h3').textContent;
        alert(`Request sent for "${listingTitle}"! In a real application, this would open a messaging interface.`);
      });
    });
  });