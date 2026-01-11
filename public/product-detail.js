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
                <div class="product-detail-price">
                    <div class="price-container">
                        <span class="price-label">Price:</span>
                        <div class="price-value">
                            <span class="inr-price">₹${product.price}/kg</span>
                            <span class="usd-price">($${product.priceUsd || '0.7-1'}/kg)</span>
                        </div>
                    </div>
                </div>
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
                            <span class="spec-label">Type:</span>
                            <span class="spec-value">Organic Millet</span>
                        </div>
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
                    <a href="https://wa.me/917058766180?text=Hello%20SayOne%20Ventures%2C%20I%20have%20a%20query%20about%20your%20product%3A%20${encodeURIComponent(product.name)}" 
                       class="btn-request-query" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        <i class="fab fa-whatsapp"></i> Request a Query
                    </a>
                </div>
                <div class="product-detail-note">
                    <p><strong>Note:</strong> Click the button above to contact us directly via WhatsApp for any queries about this product.</p>
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
        seeMoreBtn.addEventListener('click', function() {
            const isCollapsed = detailMoreText.classList.contains('collapsed');
            detailMoreText.classList.toggle('collapsed');
            seeMoreBtn.textContent = isCollapsed ? 'See less' : 'See more';
        });
    }
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing product detail page');
    loadProductDetail();
});
