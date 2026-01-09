// Product Detail Page Script

// Get product ID from URL parameter
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Get product ID from sessionStorage (if coming from products page)
function getProductIdFromStorage() {
    const storedId = sessionStorage.getItem('viewProductId');
    if (storedId) {
        sessionStorage.removeItem('viewProductId');
        return parseInt(storedId);
    }
    return null;
}

// Display product details
function displayProductDetail(product) {
    const container = document.getElementById('productDetailContainer');
    
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
                    <a href="contact.html?product=${encodeURIComponent(product.name)}&price=${product.price}" class="btn-buy-now">
                        <span>Buy Now</span>
                        <span class="btn-icon">→</span>
                    </a>
                    <a href="contact.html" class="btn-contact">
                        Contact Us for Bulk Orders
                    </a>
                </div>
                <div class="product-detail-note">
                    <p><strong>Note:</strong> For bulk orders or wholesale inquiries, please contact us directly. We offer competitive pricing for large quantities.</p>
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
    // Check if milletProducts is available in the global scope
    if (typeof window.milletProducts !== 'undefined') {
        return window.milletProducts.find(product => product.id === id);
    } else {
        console.error('milletProducts is not defined');
        return null;
    }
}

// Load product detail
function loadProductDetail() {
    const productId = getProductIdFromURL() || getProductIdFromStorage();
    
    // If milletProducts is not loaded yet, wait a bit and try again
    if (typeof window.milletProducts === 'undefined') {
        console.log('milletProducts not loaded yet, retrying...');
        setTimeout(loadProductDetail, 100);
        return;
    }
    
    const product = getProductById(productId);
    if (!product) {
        console.error('Product not found with ID:', productId);
        const container = document.getElementById('productDetailContainer');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h2>Product Not Found</h2>
                    <p>The product you're looking for doesn't exist or failed to load.</p>
                    <a href="products.html" class="btn-primary">View All Products</a>
                </div>
            `;
        }
        return;
    }
    displayProductDetail(product);
    
    // Add event listener for see more/less button
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetail();
});

