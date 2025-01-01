// Add animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Get product details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get DOM elements
    const modal = document.getElementById('confirmationModal');
    const markSoldButton = document.getElementById('markSoldButton');
    const confirmSaleButton = document.getElementById('confirmSale');
    const cancelSaleButton = document.getElementById('cancelSale');

    // Function to validate hostel name
    const validateHostel = (hostel) => {
        const validHostels = ['Cauvery Hostel', 'Krishna Hostel', 'Sir MV Hostel', 'Chamundi Hostel'];
        return validHostels.includes(hostel) ? hostel : 'Cauvery Hostel'; // Default to Cauvery if invalid
    };

    // Function to load product details from URL parameters
    const loadProductDetails = () => {
        // Get values from URL parameters
        const productDetails = {
            id: urlParams.get('productId'),
            name: urlParams.get('name'),
            category: urlParams.get('category'),
            description: urlParams.get('description'),
            seller: urlParams.get('seller'),
            location: validateHostel(urlParams.get('location')), // Validate hostel name
            image: urlParams.get('image'),
        };

        // Update the DOM with product details
        document.getElementById('productName').textContent = productDetails.name;
        document.getElementById('productCategory').textContent = productDetails.category;
        document.getElementById('productDescription').textContent = productDetails.description;
        document.getElementById('sellerName').textContent = productDetails.seller;
        document.getElementById('location').textContent = productDetails.location;
        document.getElementById('productImage').src = productDetails.image;

        // Add hostel-specific styling (optional)
        const locationElement = document.getElementById('location');
        locationElement.classList.add('hostel-location');
        
        // Create thumbnails
        const thumbnailsContainer = document.getElementById('productThumbnails');
        thumbnailsContainer.innerHTML = '';
        
        const thumbnail = document.createElement('img');
        thumbnail.src = productDetails.image;
        thumbnail.classList.add('thumbnail', 'active');
        thumbnail.addEventListener('click', () => {
            document.getElementById('productImage').src = productDetails.image;
            document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        thumbnailsContainer.appendChild(thumbnail);
    };

    // Load initial product details
    loadProductDetails();

    // Handle mark as sold button click
    markSoldButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Handle confirm sale
    confirmSaleButton.addEventListener('click', () => {
        // Here you would typically update the database to mark the item as sold
        alert('Item marked as sold successfully!');
        modal.style.display = 'none';
        markSoldButton.disabled = true;
        markSoldButton.textContent = 'Item Sold';
        markSoldButton.style.backgroundColor = '#6c757d';
    });

    // Handle cancel sale
    cancelSaleButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
  
