document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu a');
    const mainContent = document.getElementById('main-content');

    // Fetch Profile Data
    const fetchProfileData = async () => {
        try {
            const response = await fetch('/api/profile');
            const profile = await response.json();
            return `
                <h2>Profile Information</h2>
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" value="${profile.firstName}">
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" value="${profile.lastName}">
                </div>
                <div class="form-group">
                    <label>Your Gender</label>
                    <input type="radio" name="gender" ${profile.gender === 'Male' ? 'checked' : ''}> Male
                    <input type="radio" name="gender" ${profile.gender === 'Female' ? 'checked' : ''}> Female
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" value="${profile.email}">
                </div>
                <div class="form-group">
                    <label>Mobile Number</label>
                    <input type="tel" value="${profile.mobile}">
                </div>
            `;
        } catch (error) {
            return '<p>Error fetching profile data.</p>';
        }
    };

    // Fetch Recent Chats
    const fetchRecentChats = async () => {
        try {
            const response = await fetch('/api/chats');
            const chats = await response.json();
            return `
                <h2>Recent Chats</h2>
                <ul>
                    ${chats.map(chat => `<li>${chat.sender}: ${chat.message}</li>`).join('')}
                </ul>
            `;
        } catch (error) {
            return '<p>Error fetching chats.</p>';
        }
    };

    // Sell Page Content
    const sellPageContent = `
        <div class="sell-page">
            <!-- Product Card Section -->
            <div class="product-card">
                <h3>Product Card</h3>
                <div id="product-details">
                    <p>No product details yet.</p>
                </div>
            </div>

            <!-- Input Form Section -->
            <div class="form-section">
                <!-- Placeholders -->
                <div class="placeholders">
                    <input type="select" id="category" placeholder="Category">
                    
                    <input type="text" id="mode" placeholder="Mode (Buy/Rent)">
                </div>
                <div class="product-card"> <h3>upload image</h3></div>

                <!-- Image Preview Section -->
                <div class="image-preview">
                    <div class="diamond" id="image-preview-1">I</div>
                    <div class="diamond" id="image-preview-2">M</div>
                    <div class="diamond" id="image-preview-3">G</div>
                </div>

                <!-- Description and Submit -->
                <div class="description-box">
                    <textarea id="description" rows="4" placeholder="Product Description..."></textarea>
                    <button type="button" id="submit-product">Submit</button>
                </div>
            </div>
        </div>
    `;

    // Fetch Preorders
    const fetchPreOrders = async () => {
        try {
            const response = await fetch('/api/preorders');
            const orders = await response.json();
            return `
                <h2>Recent Preorders</h2>
                <ul>
                    ${orders.map(order => `<li>${order.product} - ${order.status}</li>`).join('')}
                </ul>
            `;
        } catch (error) {
            return '<p>Error fetching preorders.</p>';
        }
    };

    // Settings Page Content
    const settingsPageContent = `
        <h2>Settings</h2>
        <div class="form-group">
            <label>Enable Dark Mode</label>
            <input type="checkbox" id="dark-mode-toggle">
        </div>
    `;

    // Queries Page Content
    const queriesPageContent = `
        <h2>Submit a Query</h2>
        <form id="query-form">
            <textarea rows="5" placeholder="Write your query here..."></textarea>
            <button type="submit">Send Query</button>
        </form>
    `;

    // Page Routes
    const pages = {
        profile: async () => await fetchProfileData(),
        chat: async () => await fetchRecentChats(),
        sell: () => sellPageContent,
        preorders: async () => await fetchPreOrders(),
        settings: () => settingsPageContent,
        queries: () => queriesPageContent,
    };

    // Handle Menu Link Clicks
    menuLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            const pageContent = typeof pages[page] === 'function' ? await pages[page]() : `<p>Page not found.</p>`;
            mainContent.innerHTML = pageContent;

            // Additional JavaScript for specific pages
            if (page === 'sell') {
                const submitProductButton = document.getElementById('submit-product');
                const productDetails = document.getElementById('product-details');
                const imagePreviews = ['image-preview-1', 'image-preview-2', 'image-preview-3'];

                // Handle Image Upload Previews
                imagePreviews.forEach((id, index) => {
                    const diamond = document.getElementById(id);
                    diamond.addEventListener('click', async () => {
                        const fileInput = document.createElement('input');
                        fileInput.type = 'file';
                        fileInput.accept = 'image/*';
                        fileInput.onchange = (event) => {
                            const file = event.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    diamond.innerHTML = `<img src="${reader.result}" alt="Image ${index + 1}" style="width: 100%; height: 100%; border-radius: 50%;">`;
                                };
                                reader.readAsDataURL(file);
                            }
                        };
                        fileInput.click();
                    });
                });

                // Handle Product Submission
                submitProductButton.addEventListener('click', () => {
                    const category = document.getElementById('category').value;
                    const mode = document.getElementById('mode').value;
                    const description = document.getElementById('description').value;

                    productDetails.innerHTML = `
                        <h4>${category} - ${mode}</h4>
                        <p>${description}</p>
                        <div class="image-gallery">
                            ${imagePreviews.map(id => document.getElementById(id).innerHTML).join('')}
                        </div>
                    `;
                    alert('Product Submitted!');
                });
            }

            if (page === 'settings') {
                const darkModeToggle = document.getElementById('dark-mode-toggle');
                darkModeToggle.addEventListener('change', () => {
                    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
                });
            }
        });
    });
});
