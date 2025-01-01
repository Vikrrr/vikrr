document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sell-form');
    const imageBoxes = document.querySelectorAll('.image-upload-box');
    
    // Handle image uploads
    imageBoxes.forEach(box => {
        const fileInput = box.querySelector('.file-input');
        const preview = box.querySelector('.preview');
        const icon = box.querySelector('i');
        const span = box.querySelector('span');
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                // Validate file size (5MB max)
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size must be less than 5MB');
                    fileInput.value = '';
                    return;
                }

                // Preview image
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.style.backgroundImage = `url(${e.target.result})`;
                    preview.style.backgroundColor = '#fff';
                    icon.style.display = 'none';
                    span.style.display = 'none';
                };
                reader.readAsDataURL(file);
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

        // Validate main image
        const mainImage = document.getElementById('file-1').files[0];
        if (!mainImage) {
            alert('Please upload at least one main image');
            return;
        }

        const formData = new FormData();
        
        // Add product details
        formData.append('name', document.getElementById('product-name').value);
        formData.append('category', document.getElementById('category').value);
        formData.append('condition', document.getElementById('condition').value);
        formData.append('price', document.getElementById('price').value);
        formData.append('negotiable', document.getElementById('negotiable').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('contactNumber', document.getElementById('contact-number').value);
        formData.append('location', document.getElementById('location').value);

        // Add images
        formData.append('mainImage', mainImage);
        if (document.getElementById('file-2').files[0]) {
            formData.append('image2', document.getElementById('file-2').files[0]);
        }
        if (document.getElementById('file-3').files[0]) {
            formData.append('image3', document.getElementById('file-3').files[0]);
        }

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Product listed successfully!');
                window.location.href = 'acc.html'; // Redirect back to account page
            } else {
                throw new Error('Failed to list product');
            }
        } catch (error) {
            alert('Error listing product: ' + error.message);
        }
    });
}); 