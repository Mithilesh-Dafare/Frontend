// Product Detail Page Script
// Get product ID from URL parameter
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    console.log('Product ID from URL:', id);
    return id;
}
// Get product ID from sessionStorage (if coming from products page)
function getProductIdFromStorage() {
    const storedId = sessionStorage.getItem('viewProductId');
    if (storedId) {
        sessionStorage.removeItem('viewProductId');
        const id = parseInt(storedId);
        console.log('Product ID from storage:', id);
        return id;
    }
    return null;
}

// Display product details
function displayProductDetail(product) {
    console.log('Displaying product:', product);
    const container = document.getElementById('productDetailContainer');
    
    if (!container) {
        console.error('Product detail container not found');
        return;
    }
    if (!product) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist.</p>
                <a href="products.html" class="btn-primary">View All Products</a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="product-detail-wrapper">
            <div class="product-detail-image">
                <div class="product-detail-img-container ${product.imageClass}" style="background-image: url('${product.image}')">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none';">
                </div>
            </div>
            <div class="product-detail-info">
                <div class="breadcrumb">
                    <a href="index.html">Home</a> / 
                    <a href="products.html">Products</a> / 
                    <span>${product.name}</span>
                </div>
                <h1 class="product-detail-title">${product.name}</h1>
                <div class="product-detail-description">
                    <h3>Description</h3>
                    <p>${product.description}</p>
                </div>
                <div class="product-detail-benefits">
                    <h3>Key Benefits</h3>
                    <ul>
                        ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-detail-specs">
                    <h3>Product Specifications</h3>
                    <div class="specs-grid">
                        
                        <div class="spec-item">
                            <span class="spec-label">Certification:</span>
                            <span class="spec-value">FSSAI Certified</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Packaging:</span>
                            <span class="spec-value">Food Grade</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Shelf Life:</span>
                            <span class="spec-value">12 Months</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Storage:</span>
                            <span class="spec-value">Cool & Dry Place</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Origin:</span>
                            <span class="spec-value">India</span>
                        </div>
                    </div>
                </div>
                <div class="product-detail-usage">
                    <h3>How to Use</h3>
                    <p>${product.name} can be used in various ways:</p>
                    <ul>
                        <li>Cook as a rice substitute</li>
                        <li>Use in porridge and breakfast dishes</li>
                        <li>Add to soups and stews</li>
                        <li>Make rotis, dosas, or other traditional dishes</li>
                        <li>Use in baking for healthier alternatives</li>
                    </ul>
                </div>
                <div class="product-detail-actions">
                    <a href="https://wa.me/917058766180?text=${encodeURIComponent(
                        'Hello SayOne Ventures,\n\n' +
                        'I am interested in your product: *' + product.name + '*\n\n' +
                        'Could you please provide more information about the following?\n' +
                        '1. Minimum Order Quantity (MOQ)\n' +
                        '2. Available packaging options\n' +
                        '3. Sample availability\n' +
                        '4. Current pricing and shipping terms\n\n' +
                        'Looking forward to your response.\n\n' 
                        
                    )}" 
                       class="btn-request-query" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        <i class="fab fa-whatsapp"></i> Request a Quote / Enquire Now
                    </a>
                </div>
                <div class="product-detail-note">
                    <p><strong>Note:</strong> Clicking the button will open WhatsApp with a pre-filled message. Please complete your contact details before sending.</p>
                </div>
            </div>
        </div>
        <div class="product-detail-more">
            <h3>Detailed Explanation</h3>
            <div class="detail-more-text collapsed" id="detailMoreText">
                ${product.longDescription || 'More details coming soon.'}
            </div>
            <button class="btn-see-more" id="seeMoreBtn">See more</button>
        </div>
    `;
}

// Get product by ID
function getProductById(id) {
    console.log('Looking for product with ID:', id);
    console.log('Available products:', window.milletProducts);
    
    if (typeof window.milletProducts === 'undefined') {
        console.error('milletProducts is not defined');
        return null;
    }
    
    const product = window.milletProducts.find(p => p.id === id);
    console.log('Found product:', product);
    return product;
}

// Load product detail with retry mechanism
function loadProductDetail() {
    const productId = getProductIdFromURL() || getProductIdFromStorage();
    console.log('Loading product detail for ID:', productId);
    
    if (!productId) {
        showError("No product ID provided");
        return;
    }
    const tryLoading = (attempt = 0) => {
        console.log(`Attempt ${attempt + 1} to load product`);
        
        if (typeof window.milletProducts === 'undefined') {
            if (attempt < 10) {
                console.log('milletProducts not loaded yet, retrying...');
                setTimeout(() => tryLoading(attempt + 1), 200);
            } else {
                showError("Failed to load product data. Please refresh the page.");
            }
            return;
        }
        const product = getProductById(productId);
        if (product) {
            displayProductDetail(product);
            // Setup the see more button after the product is displayed
            setupSeeMoreButton();
        } else {
            showError("Product not found");
        }
    };
    // Show loading state
    const container = document.getElementById('productDetailContainer');
    if (container) {
        container.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading product details...</p>
            </div>
        `;
    }
    // Start loading
    tryLoading();
}
function showError(message) {
    console.error(message);
    const container = document.getElementById('productDetailContainer');
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Error Loading Product</h2>
                <p>${message}</p>
                <a href="products.html" class="btn-primary">Back to Products</a>
            </div>
        `;
    }
}
function setupSeeMoreButton() {
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const detailMoreText = document.getElementById('detailMoreText');
    
    if (seeMoreBtn && detailMoreText) {
        // Initially hide the button if there's no content to expand
        if (!detailMoreText.textContent.trim() || detailMoreText.textContent.trim() === 'More details coming soon.') {
            seeMoreBtn.style.display = 'none';
            detailMoreText.classList.remove('collapsed');
            return;
        }
        
        // Show/hide functionality
        seeMoreBtn.addEventListener('click', function() {
            detailMoreText.classList.toggle('collapsed');
            seeMoreBtn.textContent = detailMoreText.classList.contains('collapsed') ? 'See more' : 'See less';
            
            // Smooth scroll to the expanded content
            if (!detailMoreText.classList.contains('collapsed')) {
                setTimeout(() => {
                    detailMoreText.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
        
        // Show the button if it was hidden by default
        seeMoreBtn.style.display = 'block';
    }
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing product detail page');
    loadProductDetail();
});
