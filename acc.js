document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu a');
    const mainContent = document.getElementById('main-content');

    // Fetch Profile Data
    const fetchProfileData = async () => {
        try {
            const response = await fetch('/api/profile');
            const profile = await response.json();
            return `
                <div class="profile-container">
                    <div class="profile-header">
                        <div class="profile-image-container">
                            <img src="${profile.profileImage || 'default-avatar.png'}" alt="Profile" id="profile-image">
                            <button class="change-photo-btn" id="change-photo-btn">
                                <i class="fa-solid fa-camera"></i>
                            </button>
                        </div>
                        <h2>Profile Information</h2>
                    </div>
                    
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" id="username" value="${profile.username}">
                        <button class="edit-btn" data-field="username">Edit</button>
                    </div>
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" id="firstName" value="${profile.firstName}">
                        <button class="edit-btn" data-field="firstName">Edit</button>
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" id="lastName" value="${profile.lastName}">
                        <button class="edit-btn" data-field="firstName">Edit</button>
                    </div>
                    <div class="form-group">
                        <label>Mobile Number</label>
                        <input type="tel" id="mobile" value="${profile.mobile}">
                        <button class="edit-btn" data-field="mobile">Edit</button>
                    </div>
                    <button class="save-profile-btn">Save Changes</button>
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
            <h2 class="sell-title">List Your Product</h2>
            
            <!-- Product Upload Form -->
            <div class="product-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Product Name</label>
                        <input type="text" id="product-name" placeholder="Enter product name">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="category">
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="books">Books</option>
                            <option value="furniture">Furniture</option>
                            <option value="clothing">Clothing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Price (₹)</label>
                        <input type="number" id="price" placeholder="Enter price">
                    </div>
                    <div class="form-group">
                        <label>Mode</label>
                        <select id="mode">
                            <option value="sell">Sell</option>
                            <option value="rent">Rent</option>
                        </select>
                    </div>
                </div>

                <!-- Image Upload Section -->
                <div class="image-upload-section">
                    <label>Product Images</label>
                    <div class="image-upload-grid">
                        <div class="upload-box" id="image-preview-1">
                            <i class="fas fa-plus"></i>
                            <span>Add Image</span>
                        </div>
                        <div class="upload-box" id="image-preview-2">
                            <i class="fas fa-plus"></i>
                            <span>Add Image</span>
                        </div>
                        <div class="upload-box" id="image-preview-3">
                            <i class="fas fa-plus"></i>
                            <span>Add Image</span>
                        </div>
                    </div>
                    <p class="image-hint">Upload up to 3 images (Max 5MB each)</p>
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea id="description" rows="4" placeholder="Describe your product..."></textarea>
                </div>

                <div class="form-actions">
                    <button type="button" class="preview-btn">Preview</button>
                    <button type="button" id="submit-product" class="submit-btn">List Product</button>
                </div>
            </div>

            <!-- Preview Section -->
            <div class="product-preview" id="product-details">
                <h3>Product Preview</h3>
                <div class="preview-content">
                    <p>Your product listing will appear here</p>
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
        sell: () => {
            window.location.href = 'public/sell.html';
            return '';
        },
        preorders: async () => await fetchPreOrders(),
        settings: () => settingsPageContent,
        queries: () => queriesPageContent,
    };

    // Handle Menu Link Clicks
    menuLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            
            // Add special handling for chat option
            if (page === 'chat') {
                window.location.href = 'chat.html'; // Redirect to chat page
                return;
            }

            // Rest of your existing menu handling code...
            switch (page) {
                case 'profile':
                    mainContent.innerHTML = await fetchProfileData();
                    break;
                case 'sell':
                    window.location.href = 'public/sell.html';
                    break;
                // ... other cases
            }

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

            if (page === 'profile') {
                // Handle profile image upload
                const changePhotoBtn = document.getElementById('change-photo-btn');
                const profileImage = document.getElementById('profile-image');
                
                changePhotoBtn.addEventListener('click', () => {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    fileInput.click();
                    
                    fileInput.onchange = async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                profileImage.src = e.target.result;
                            };
                            reader.readAsDataURL(file);
                            
                            // Upload image to server
                            const formData = new FormData();
                            formData.append('profileImage', file);
                            
                            try {
                                const response = await fetch('/api/profile/image', {
                                    method: 'POST',
                                    body: formData
                                });
                                if (!response.ok) throw new Error('Failed to upload image');
                            } catch (error) {
                                alert('Failed to upload image');
                            }
                        }
                    };
                });

                // Handle edit buttons
                const editButtons = document.querySelectorAll('.edit-btn');
                editButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const field = btn.dataset.field;
                        const input = document.getElementById(field);
                        input.removeAttribute('readonly');
                        input.focus();
                    });
                });

                // Handle save changes
                const saveBtn = document.querySelector('.save-profile-btn');
                saveBtn.addEventListener('click', async () => {
                    const updatedProfile = {
                        username: document.getElementById('username').value,
                        firstName: document.getElementById('firstName').value,
                        lastName: document.getElementById('lastName').value,
                        mobile: document.getElementById('mobile').value
                    };

                    try {
                        const response = await fetch('/api/profile', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedProfile)
                        });

                        if (!response.ok) throw new Error('Failed to update profile');
                        alert('Profile updated successfully!');
                    } catch (error) {
                        alert('Failed to update profile');
                    }
                });
            }
        });
    });

    // Add this function to handle chat notifications
    function updateChatNotifications() {
        const chatLink = document.querySelector('a[data-page="chat"]');
        // You can add a notification counter if needed
        // chatLink.innerHTML = `Chat <span class="notification-badge">2</span>`;
    }
});
