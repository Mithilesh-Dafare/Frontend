// Millet Products Data
// To change images, update the 'image' path below for each millet product
window.milletProducts = [
    {
        id: 1,
        name: 'Finger Millet (Ragi)',
        price: 58, // 0.7 * 83
        priceUsd: '0.7-1',
        description: 'Rich in calcium, iron, and fiber. Perfect for bone health and managing diabetes.',
        benefits: [
            'High in calcium (3x more than milk)',
            'Rich in dietary fiber',
            'Helps control blood sugar',
            'Gluten-free'
        ],
        longDescription: 'Finger Millet (Ragi) is celebrated for its exceptional calcium and iron content, making it ideal for bone health and anemia management. Its low glycemic index supports blood sugar control, while high dietary fiber aids digestion and satiety. Ragi is naturally gluten-free, versatile in traditional porridges, rotis, and baked goods, and suitable for infant foods and diabetic-friendly diets. When sourced organically, it retains maximum nutrients and a nutty, earthy flavor profile.',
        image: 'images/finger_millets.webp',
        imageClass: 'millet-ragi'
    },
    {
        id: 2,
        name: 'Pearl Millet (Bajra)',
        price: 62, // 0.75 * 83 (average of 0.6-0.9)
        priceUsd: '0.6-0.9',
        description: 'High in protein and iron. Excellent for energy and preventing anemia.',
        benefits: [
            'High protein content',
            'Rich in iron and zinc',
            'Good source of B vitamins',
            'Supports heart health'
        ],
        longDescription: 'Pearl Millet (Bajra) is a powerhouse of protein, iron, and essential micronutrients. Its complex carbohydrates provide sustained energy, while high fiber supports digestion and heart health. Bajra is naturally gluten-free and resilient to harsh climates, making it a sustainable crop. It suits rotis, porridges, and multigrain mixes, and its rich mineral profile helps combat anemia and supports immune function.',
        image: 'images/peral_millets.webp',
        imageClass: 'millet-bajra'
    },
   
    {
        id: 3,
        name: 'Sorghum Millet (Jowar)',
        price: 54, // 0.65 * 83 (average of 0.5-0.8)
        priceUsd: '0.5-0.8',
        description: 'Rich in antioxidants and fiber. Supports digestive health.',
        benefits: [
            'High in antioxidants',
            'Rich in dietary fiber',
            'Supports digestion',
            'Gluten-free'
        ],
        longDescription: 'Sorghum (Jowar) is a versatile whole grain rich in antioxidants and fiber, supporting digestive health and satiety. Naturally gluten-free, it is excellent for rotis, porridges, and grain bowls. Its phenolic compounds contribute to heart health, while its resilience as a crop makes it environmentally sustainable.',
        image: 'images/sorgam_millets.avif',
        imageClass: 'millet-jowar'
    },

    {
        id: 4,
        name: 'Groundnut (Peanut)',
        price: 125, // 1.5 * 83 (average of 1-2)
        priceUsd: '1-2',
        description: 'Rich source of healthy fats, protein, and antioxidants. Supports heart and muscle health.',
        benefits: [
        'High in plant-based protein',
        'Rich in healthy monounsaturated fats',
        'Supports heart health',
        'Good source of vitamin E and antioxidants'
        ],
        longDescription: 'Groundnut (Peanut) is a nutrient-dense legume packed with high-quality protein and healthy fats that support muscle growth and cardiovascular health. It contains antioxidants like resveratrol and essential vitamins such as vitamin E and B-complex vitamins. Groundnuts help maintain energy levels, promote satiety, and support brain health. They are widely used in cooking, snacks, oils, and traditional recipes, making them a versatile and affordable superfood when consumed in moderation.',
        image: 'images/groundnut.png',
        imageClass: 'millet-groundnut'
    },

    {       
        id: 5,
        name: 'Soyabean',
        price: 71, // 0.85 * 83 (average of 0.7-1)
        priceUsd: '0.7-1',
    description: 'Excellent source of complete plant protein and essential amino acids.',
    benefits: [
        'Complete protein source',
        'Rich in calcium and iron',
        'Supports muscle and bone health',
        'Helps reduce cholesterol levels'
    ],
    longDescription: 'Soyabean is one of the few plant foods that provides complete protein, containing all essential amino acids. It is highly beneficial for muscle development, bone strength, and heart health. Rich in isoflavones, soyabean supports hormonal balance and helps reduce bad cholesterol. It is widely used in the form of soy flour, tofu, soy milk, and textured vegetable protein, making it a valuable component of vegetarian and vegan diets.',
    image: 'images/soyabean.jpg',
    imageClass: 'millet-soyabean'   
    },

        {
        id: 6,
        name: 'Dehydrated Onion Powder',
        price: 141, // 1.7 * 83 (average of 1.4-2)
        priceUsd: '1.4-2',
    description: 'Concentrated onion flavor with long shelf life. Enhances taste and immunity.',
    benefits: [
        'Rich in antioxidants',
        'Supports immune health',
        'Improves digestion',
        'Convenient and long-lasting'
    ],
    longDescription: 'Dehydrated Onion Powder is made by carefully drying fresh onions to preserve their flavor and nutrients. It contains antioxidants and sulfur compounds that support immunity, digestion, and heart health. This powder offers a strong, consistent onion flavor without the hassle of chopping or tears. It is widely used in seasoning blends, soups, curries, sauces, and snacks, making it an essential kitchen ingredient with extended shelf life.',
    image: 'images/dehydrated_onion_powder.webp',
    imageClass: 'millet-onion'
    },

        {
        id: 7,
        name: 'Guar Gum Powder',
        price: 153, // 1.85 * 83 (average of 1.5-2.2)
        priceUsd: '1.5-2.2',
    description: 'Natural thickening and stabilizing agent derived from guar beans.',
    benefits: [
        'Improves digestion',
        'Helps control blood sugar',
        'Supports gut health',
        'Acts as a natural thickener'
    ],
    longDescription: 'Guar Gum Powder is a natural dietary fiber extracted from guar beans and widely used as a thickening, stabilizing, and binding agent in food products. It helps regulate digestion, supports gut health, and slows glucose absorption, making it beneficial for blood sugar control. Guar gum is commonly used in gluten-free baking, sauces, dairy products, and processed foods, as well as in pharmaceutical and industrial applications.',
    image: 'images/guargum_powder.webp',
    imageClass: 'millet-guargum'
    }
];

// Display Products
function displayProducts() {
    console.log('Display products function called');
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) {
        console.error('Products grid element not found!');
        // Try again after a short delay if the element isn't found
        setTimeout(displayProducts, 100);
        return;
    }

    // Clear any existing content
    productsGrid.innerHTML = '';

    // Add each product to the grid
    milletProducts.forEach(product => {
        const productCard = document.createElement('a');
        productCard.className = 'product-card';
        productCard.href = `product-detail.html?id=${product.id}`;
        productCard.style.textDecoration = 'none';
        productCard.style.color = 'inherit';
        
        productCard.innerHTML = `
            <div class="product-card-image ${product.imageClass || ''}">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">
            </div>
            <div class="product-card-content">
                <h3>${product.name}</h3>
                <div class="price">
                    ₹${product.price}/kg
                    <span class="usd-price">($${product.priceUsd}/kg)</span>
                </div>
                <p class="description">${product.description}</p>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    console.log(`Displayed ${milletProducts.length} products`);
}

// View product detail - Make it globally available
window.viewProductDetail = function(productId) {
    // Store product ID in sessionStorage
    sessionStorage.setItem('viewProductId', productId);
    // Navigate to product detail page
    window.location.href = `product-detail.html?id=${productId}`;
};

// Add to Cart (redirects to contact page) - kept for backward compatibility
function addToCart(productId) {
    viewProductDetail(productId);
}

// Initialize on page load
function initProducts() {
    console.log('Initializing products');
    if (document.getElementById('productsGrid')) {
        displayProducts();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProducts);
} else {
    // In case the document is already loaded
    initProducts();
}

// Export products data for use in order page
if (typeof module !== 'undefined' && module.exports) {
    module.exports = milletProducts;
}

