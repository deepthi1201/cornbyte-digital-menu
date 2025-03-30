// Cart functionality
let cart = [];
let cartTotal = 0;

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

function addToCart(button, name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification('Item added to cart!');
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
    showNotification('Item removed from cart!');
}

function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    const cartTotalElement = document.getElementById('cartTotal');
    const subtotalElement = document.getElementById('subtotal');
    const gstElement = document.getElementById('gst');
    const serviceTaxElement = document.getElementById('serviceTax');
    
    // Update cart count
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.name}')">&times;</button>
        </div>
    `).join('');
    
    // Calculate bill details
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const gst = subtotal * 0.05; // 5% GST
    const serviceTax = subtotal * 0.05; // 5% Service Tax
    const total = subtotal + gst + serviceTax;
    
    // Update bill details
    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    gstElement.textContent = `₹${gst.toFixed(2)}`;
    serviceTaxElement.textContent = `₹${serviceTax.toFixed(2)}`;
    cartTotalElement.textContent = `₹${total.toFixed(2)}`;
    
    // Update cart total for other functions
    cartTotal = total;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'var(--background-light)';
        navbar.style.boxShadow = 'none';
    }
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Review Modal Functionality
const addReviewBtn = document.querySelector('.add-review-btn');
const reviewModal = document.createElement('div');
reviewModal.className = 'review-modal';
reviewModal.innerHTML = `
    <div class="review-modal-content">
        <div class="review-modal-header">
            <h3>Write a Review</h3>
            <button class="close-review-modal">&times;</button>
        </div>
        <form id="reviewForm" class="review-form">
            <div class="form-group">
                <label for="reviewerName">Your Name</label>
                <input type="text" id="reviewerName" required>
            </div>
            <div class="form-group">
                <label for="reviewDish">Which dish did you try?</label>
                <select id="reviewDish" required>
                    <option value="">Select a dish</option>
                    <option value="Butter Sweetcorn">Butter Sweetcorn</option>
                    <option value="Cheese Corn">Cheese Corn</option>
                    <option value="Masala Corn">Masala Corn</option>
                    <option value="Grilled Lemon-Pepper Corn">Grilled Lemon-Pepper Corn</option>
                    <option value="Crispy Chilli Garlic Baby Corn">Crispy Chilli Garlic Baby Corn</option>
                    <option value="Herbed Corn with Olive Oil">Herbed Corn with Olive Oil</option>
                    <option value="Schezwan Corn">Schezwan Corn</option>
                    <option value="Sweetcorn with Mint & Chaat Masala">Sweetcorn with Mint & Chaat Masala</option>
                    <option value="Corn & Cheese Pizza">Corn & Cheese Pizza</option>
                    <option value="Sweetcorn Fried Rice">Sweetcorn Fried Rice</option>
                    <option value="Corn & Paneer Tikka">Corn & Paneer Tikka</option>
                    <option value="Corn Stuffed Paratha">Corn Stuffed Paratha</option>
                    <option value="Sweetcorn Milkshake">Sweetcorn Milkshake</option>
                    <option value="Corn Pudding">Corn Pudding</option>
                    <option value="Caramelized Corn Dessert">Caramelized Corn Dessert</option>
                    <option value="Mexican Street Corn (Elote)">Mexican Street Corn (Elote)</option>
                    <option value="Corn Pakora (Corn Fritters)">Corn Pakora (Corn Fritters)</option>
                    <option value="Sweetcorn Frankie (Wraps)">Sweetcorn Frankie (Wraps)</option>
                    <option value="Peri-Peri Corn">Peri-Peri Corn</option>
                    <option value="Spicy Lemon Corn">Spicy Lemon Corn</option>
                    <option value="Corn & Spinach Momos">Corn & Spinach Momos</option>
                    <option value="Creamy Corn Chowder">Creamy Corn Chowder</option>
                    <option value="Sweetcorn Soup">Sweetcorn Soup</option>
                    <option value="Corn Bites">Corn Bites</option>
                </select>
            </div>
            <div class="form-group">
                <label>Rating</label>
                <div class="rating-input">
                    <i class="far fa-star" data-rating="1"></i>
                    <i class="far fa-star" data-rating="2"></i>
                    <i class="far fa-star" data-rating="3"></i>
                    <i class="far fa-star" data-rating="4"></i>
                    <i class="far fa-star" data-rating="5"></i>
                </div>
                <input type="hidden" id="ratingValue" required>
            </div>
            <div class="form-group">
                <label for="reviewText">Your Review</label>
                <textarea id="reviewText" rows="4" required></textarea>
            </div>
            <button type="submit" class="submit-review-btn">Submit Review</button>
        </form>
    </div>
`;

document.body.appendChild(reviewModal);

// Show review modal
addReviewBtn.addEventListener('click', () => {
    reviewModal.style.display = 'flex';
});

// Close review modal
reviewModal.querySelector('.close-review-modal').addEventListener('click', () => {
    reviewModal.style.display = 'none';
});

// Close modal when clicking outside
reviewModal.addEventListener('click', (e) => {
    if (e.target === reviewModal) {
        reviewModal.style.display = 'none';
    }
});

// Rating stars functionality
const ratingStars = reviewModal.querySelectorAll('.rating-input i');
ratingStars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = star.dataset.rating;
        ratingStars.forEach(s => {
            if (s.dataset.rating <= rating) {
                s.className = 'fas fa-star';
            } else {
                s.className = 'far fa-star';
            }
        });
        document.getElementById('ratingValue').value = rating;
    });
});

// Handle review submission
reviewModal.querySelector('#reviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const reviewerName = document.getElementById('reviewerName').value;
    const reviewDish = document.getElementById('reviewDish').value;
    const rating = document.getElementById('ratingValue').value;
    const reviewText = document.getElementById('reviewText').value;
    
    // Create new review card
    const newReview = document.createElement('div');
    newReview.className = 'review-card';
    newReview.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <img src="https://randomuser.me/api/portraits/${Math.random() < 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg" alt="${reviewerName}" class="reviewer-avatar">
                <div>
                    <h4>${reviewerName}</h4>
                    <div class="rating">
                        ${Array(5).fill().map((_, i) => 
                            `<i class="${i < rating ? 'fas' : 'far'} fa-star"></i>`
                        ).join('')}
                    </div>
                </div>
            </div>
            <span class="review-date">${new Date().toLocaleDateString()}</span>
        </div>
        <p class="review-text">"${reviewText}"</p>
        <div class="review-dish">Ordered: ${reviewDish}</div>
    `;
    
    // Add new review to the beginning of the reviews container
    document.querySelector('.reviews-container').prepend(newReview);
    
    // Close modal and reset form
    reviewModal.style.display = 'none';
    e.target.reset();
    ratingStars.forEach(star => star.className = 'far fa-star');
    
    // Show success notification
    showNotification('Thank you for your review!');
}); 