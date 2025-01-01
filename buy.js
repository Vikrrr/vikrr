document.addEventListener('DOMContentLoaded', () => {
    const allProducts = {
      Aprons: [
        {
          id: 11,
          name: "Kitchen Apron",
          description: "Stylish and durable kitchen apron",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 12,
          name: "Chef Apron",
          description: "Professional chef apron with pockets",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Stationery: [
        {
          id: 13,
          name: "Notebook Set",
          description: "Premium quality notebooks",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Fruits: [
        {
          id: 14,
          name: "Fresh Apple Pack",
          description: "Organic fresh apples",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Shoes: [
        {
          id: 15,
          name: "Running Shoes",
          description: "Comfortable sports shoes",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Electronics: [
        {
          id: 1,
          name: "Smartphone",
          description: "Latest model with amazing features.",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 2,
          name: "Laptop",
          description: "Powerful performance for professionals.",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Fashion: [
        {
          id: 3,
          name: "Jacket",
          description: "Stylish and warm winter jacket.",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 4,
          name: "Sneakers",
          description: "Comfortable sneakers for daily wear.",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      "Home & Furniture": [
        {
          id: 5,
          name: "Sofa Set",
          description: "Luxurious and comfortable sofa.",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 6,
          name: "Dining Table",
          description: "Elegant wooden dining table.",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Books: [
        {
          id: 7,
          name: "Fiction Novel",
          description: "A gripping tale of adventure.",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 8,
          name: "Self-Help Book",
          description: "Improve your life with actionable advice.",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      "Beauty & Personal Care": [
        {
          id: 9,
          name: "Face Cream",
          description: "Nourishes and protects your skin.",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 10,
          name: "Shampoo",
          description: "Smooth and silky hair guaranteed.",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Sports: [
        {
          id: 16,
          name: "Cricket Bat",
          description: "Professional grade cricket bat",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 17,
          name: "Football",
          description: "Official size soccer ball",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Bikes: [
        {
          id: 18,
          name: "Mountain Bike",
          description: "All-terrain mountain bicycle",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 19,
          name: "Road Bike",
          description: "Lightweight road bicycle",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Toys: [
        {
          id: 20,
          name: "Remote Control Car",
          description: "High-speed RC car",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 21,
          name: "Building Blocks",
          description: "Educational building set",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Luggage: [
        {
          id: 22,
          name: "Travel Suitcase",
          description: "Durable rolling suitcase",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 23,
          name: "Backpack",
          description: "Spacious travel backpack",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Pets: [
        {
          id: 24,
          name: "Pet Bed",
          description: "Comfortable pet bed",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 25,
          name: "Pet Food Bowl",
          description: "Stainless steel food bowl",
          image: "https://via.placeholder.com/200x150",
        },
      ],
    };
  
    const productGrid = document.getElementById('product-grid');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    const productImage = document.getElementById('product-image');
    const productInfo = document.getElementById('product-info');
    const productDetailView = document.getElementById('product-detail-view');
  
    // Function to display products
    window.displayProducts = (category) => {
      // Hide the product detail view and show the product grid
      productDetailView.style.display = 'none';
      productGrid.style.display = 'grid';
  
      const products = allProducts[category] || [];
      productGrid.innerHTML = ''; // Clear existing products
      
      if (products.length === 0) {
        productGrid.innerHTML = '<p>No products available in this category.</p>';
      } else {
        products.forEach((product) => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');
          productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="info">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <button onclick="viewDetails(${product.id}, '${category}')">View Details</button>
            </div>
          `;
          productGrid.appendChild(productCard);
        });
      }
    };
  
    // Function to go back to the product grid
    window.goBack = () => {
      productGrid.style.display = 'grid';
      productDetailView.style.display = 'none';
    };
  
    // Add click event listeners to sidebar category links
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.textContent;
        displayProducts(category);
        
        // Update active state in sidebar
        sidebarLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  
    // Check for category in URL when page loads
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    
    if (categoryFromUrl && allProducts[categoryFromUrl]) {
      displayProducts(categoryFromUrl);
      // Highlight the active category in sidebar
      const activeLink = document.querySelector(`.sidebar a[href="#"][onclick*="${categoryFromUrl}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    } else {
      // Default to first category if none specified
      const firstCategory = Object.keys(allProducts)[0];
      displayProducts(firstCategory);
    }
  
    // Update sidebar to include new categories
    const updateSidebar = () => {
        const sidebarUl = document.querySelector('.sidebar ul');
        sidebarUl.innerHTML = '';
        Object.keys(allProducts).forEach(category => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" onclick="displayProducts('${category}')">${category}</a>`;
            sidebarUl.appendChild(li);
        });
    };
  
    updateSidebar();
  
    // Function to get random hostel (for demo purposes)
    const getRandomHostel = () => {
        const hostels = ['Cauvery Hostel', 'Krishna Hostel', 'Sir MV Hostel', 'Chamundi Hostel'];
        return hostels[Math.floor(Math.random() * hostels.length)];
    };
  
    window.viewDetails = (productId, category) => {
        const product = allProducts[category].find(p => p.id === productId);
        if (product) {
            // Convert product data to URL parameters
            const params = new URLSearchParams({
                productId: product.id,
                name: product.name,
                category: category,
                description: product.description,
                image: product.image,
                seller: "John Doe", // Example seller name
                location: getRandomHostel(), // Use one of the four hostels
            });
            
            // Redirect to done.html with product parameters
            window.location.href = `done.html?${params.toString()}`;
        }
    };
  });
  
