const API_URL = 'http://localhost:3000';

async function checkConnection() {
    try {
        const response = await fetch(`${API_URL}/api/health`);
        return response.ok;
    } catch (error) {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sell-form');
    const imageBoxes = document.querySelectorAll('.image-upload-box');
    
    // Handle image uploads
    imageBoxes.forEach(box => {
        const fileInput = box.querySelector('.file-input');
        const preview = box.querySelector('.preview');
        const icon = box.querySelector('i');
        const span = box.querySelector('span');
        
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                // Validate file type
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!validTypes.includes(file.type)) {
                    alert('Please upload only JPG, JPEG or PNG images');
                    fileInput.value = '';
                    return;
                }

                // Validate file size (5MB max)
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size must be less than 5MB');
                    fileInput.value = '';
                    return;
                }

                try {
                    box.classList.add('loading');

                    // Preview image
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        preview.style.backgroundImage = `url(${e.target.result})`;
                        icon.style.display = 'none';
                        span.style.display = 'none';
                    };
                    reader.onerror = () => {
                        alert('Error reading file');
                        fileInput.value = '';
                    };
                    reader.readAsDataURL(file);

                } catch (error) {
                    alert('Error processing image: ' + error.message);
                    fileInput.value = '';
                } finally {
                    box.classList.remove('loading');
                }
            }
        });

        // Add drag and drop support
        box.addEventListener('dragover', (e) => {
            e.preventDefault();
            box.classList.add('dragover');
        });

        box.addEventListener('dragleave', () => {
            box.classList.remove('dragover');
        });

        box.addEventListener('drop', (e) => {
            e.preventDefault();
            box.classList.remove('dragover');
            
            const file = e.dataTransfer.files[0];
            if (file) {
                fileInput.files = e.dataTransfer.files;
                fileInput.dispatchEvent(new Event('change'));
            }
        });
    });

    // Preview button functionality
    const previewBtn = document.querySelector('.preview-btn');
    previewBtn.addEventListener('click', () => {
        const productName = document.getElementById('product-name').value;
        const category = document.getElementById('category').value;
        const condition = document.getElementById('condition').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;

        if (!productName || !category || !condition || !price || !description) {
            alert('Please fill in all required fields to preview');
            return;
        }

        // Create preview modal or update preview section
        alert(`Preview of "${productName}"\nCategory: ${category}\nCondition: ${condition}\nPrice: ₹${price}\n\n${description}`);
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            // Show loading state
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

            // Create FormData object
            const formData = new FormData();
            
            // Add form fields
            formData.append('name', document.getElementById('product-name').value);
            formData.append('category', document.getElementById('category').value);
            formData.append('condition', document.getElementById('condition').value);
            formData.append('price', document.getElementById('price').value);
            formData.append('negotiable', document.getElementById('negotiable').value === 'negotiable' || document.getElementById('negotiable').value === 'slight');
            formData.append('description', document.getElementById('description').value);
            formData.append('contactNumber', document.getElementById('contact-number').value);
            formData.append('location', document.getElementById('location').value);

            // Add images
            const mainImage = document.getElementById('file-1').files[0];
            if (!mainImage) {
                throw new Error('Please upload at least one main image');
            }
            formData.append('mainImage', mainImage);

            // Add additional images if they exist
            const additionalImage1 = document.getElementById('file-2').files[0];
            const additionalImage2 = document.getElementById('file-3').files[0];
            if (additionalImage1) formData.append('additionalImages', additionalImage1);
            if (additionalImage2) formData.append('additionalImages', additionalImage2);

            // Send data to server with error handling
            const response = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to upload product');
            }

            const result = await response.json();

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Product listed successfully!</p>
            `;
            form.insertBefore(successMessage, form.firstChild);

            // Reset the form
            form.reset();

            // Reset image previews
            imageBoxes.forEach(box => {
                const preview = box.querySelector('.preview');
                const icon = box.querySelector('i');
                const span = box.querySelector('span');
                
                preview.style.backgroundImage = 'none';
                icon.style.display = 'block';
                span.style.display = 'block';
            });

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);

            // Log the product ID
            console.log('Product stored with ID:', result.productId);

        } catch (error) {
            // Handle specific error types
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                alert('Connection error: Please check your internet connection and try again');
            } else {
                alert('Error: ' + error.message);
            }
            console.error('Submission error:', error);
        } finally {
            // Reset submit button
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> List Item';
        }
    });
}); 