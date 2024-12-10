document.addEventListener('DOMContentLoaded', () => {
    const allProducts = {
      Electronics: [
        {
          id: 1,
          name: "Smartphone",
          description: "Latest model with amazing features.",
          price: "$599",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 2,
          name: "Laptop",
          description: "Powerful performance for professionals.",
          price: "$999",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Fashion: [
        {
          id: 3,
          name: "Jacket",
          description: "Stylish and warm winter jacket.",
          price: "$79",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 4,
          name: "Sneakers",
          description: "Comfortable sneakers for daily wear.",
          price: "$99",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      "Home & Furniture": [
        {
          id: 5,
          name: "Sofa Set",
          description: "Luxurious and comfortable sofa.",
          price: "$499",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 6,
          name: "Dining Table",
          description: "Elegant wooden dining table.",
          price: "$399",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      Books: [
        {
          id: 7,
          name: "Fiction Novel",
          description: "A gripping tale of adventure.",
          price: "$19",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 8,
          name: "Self-Help Book",
          description: "Improve your life with actionable advice.",
          price: "$15",
          image: "https://via.placeholder.com/200x150",
        },
      ],
      "Beauty & Personal Care": [
        {
          id: 9,
          name: "Face Cream",
          description: "Nourishes and protects your skin.",
          price: "$12",
          image: "https://via.placeholder.com/200x150",
        },
        {
          id: 10,
          name: "Shampoo",
          description: "Smooth and silky hair guaranteed.",
          price: "$10",
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
    const displayProducts = (category) => {
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
              <p class="price">${product.price}</p>
              <button onclick=done.html>View Details</button>
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
  
    // Event listeners for sidebar links
    sidebarLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const category = link.textContent; // Get the category name
        displayProducts(category); // Load products for the selected category
      });
    });
  
    // Load default category
    displayProducts('Electronics');
  });
  