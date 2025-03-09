// متغيرات عامة
let cart = [];

// تحميل المنتجات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // استرجاع السلة من localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    // تحديث واجهة المستخدم
    if (document.querySelector('.product-grid')) {
        renderProducts();
    }
    updateAuthUI();
    updateCart();
    checkAuthState();
    
    // تحديث المجاميع في صفحة الدفع
    if (window.location.pathname.includes('checkout.html')) {
        displayCheckoutItems();
        updateCheckoutTotals();
    }
});

// دالة عرض المنتجات
function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     onerror="this.src='placeholder.jpg'"
                     loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price} جنيه</p>
                <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                    أضف إلى السلة
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// دالة إضافة منتج للسلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        // حفظ في localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // تحديث السلة والمجاميع
        updateCart();
        updateCheckoutTotals();
        
        // إظهار رسالة نجاح
        showNotification('تمت إضافة المنتج إلى السلة');
    }
}

// دالة تحديث عرض السلة
function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.querySelector('.total-amount');
    const orderItems = document.getElementById('orderItems');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    
    // تحديث عدد العناصر
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // تحديث المجموع الفرعي
    const subtotal = calculateSubtotal();
    if (subtotalAmount) {
        subtotalAmount.textContent = `${subtotal} جنيه`;
    }
    
    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <div class="item-price">
                            <span>${item.price} جنيه</span>
                            <div class="quantity-controls">
                                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
                </div>
            `;
        });
    }

    // تحديث عرض المنتجات في صفحة الدفع
    if (orderItems) {
        orderItems.innerHTML = '';
        let subtotal = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            orderItems.innerHTML += `
                <div class="order-item">
                    <div class="item-info">
                        <div class="item-details">
                            <h3>${item.name}</h3>
                            <p>الكمية: ${item.quantity}</p>
                            <p>السعر: ${item.price} جنيه</p>
                        </div>
                    </div>
                    <div class="item-price">${itemTotal} جنيه</div>
                </div>
            `;
        });
        
        // تحديث المجموع الفرعي في صفحة الدفع
        const subtotalElement = document.querySelector('.subtotal-amount');
        if (subtotalElement) {
            subtotalElement.textContent = `${subtotal} جنيه`;
        }
        
        // تحديث رسوم الشحن والإجمالي
        updateCheckoutTotals();
    }
}

// دالة تحديث الكمية
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
            updateCheckoutTotals();
        }
    }
}

// دالة إزالة منتج من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    updateCheckoutTotals();
}

// دالة إظهار الإشعارات
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// تحديث حالة تسجيل الدخول في القائمة
function updateAuthUI() {
    const loginLink = document.getElementById('loginLink');
    const profileLink = document.getElementById('profileLink');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (loginLink && profileLink) {
        if (isLoggedIn) {
            loginLink.style.display = 'none';
            profileLink.style.display = 'block';
        } else {
            loginLink.style.display = 'block';
            profileLink.style.display = 'none';
        }
    }
}

// التحقق من حالة تسجيل الدخول
function checkAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const profileLink = document.getElementById('profileLink');

    if (profileLink) {
        if (isLoggedIn) {
            profileLink.textContent = 'الملف الشخصي';
            profileLink.href = 'profile.html';
        } else {
            profileLink.textContent = 'تسجيل الدخول';
            profileLink.href = '#';
        }
    }
}

// معالجة النقر على زر تسجيل الدخول/الملف الشخصي
function handleAuthClick(event) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        event.preventDefault();
        // إذا لم يكن مسجل الدخول، توجيه إلى صفحة تسجيل الدخول
        window.location.href = 'login.html';
    }
    // إذا كان مسجل الدخول، سيتم توجيهه إلى صفحة الملف الشخصي تلقائياً
}

// تسجيل الدخول
function login() {
    localStorage.setItem('isLoggedIn', 'true');
    checkAuthState();
}

// تسجيل الخروج
function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    checkAuthState();
}

// التحقق من حالة تسجيل الدخول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', checkAuthState);

// دالة تحديث المبالغ في صفحة الدفع
function updateCheckoutTotals() {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const total = subtotal + shipping;
    
    const subtotalElement = document.querySelector('.subtotal-amount');
    const shippingElement = document.querySelector('.shipping-amount');
    const totalElement = document.querySelector('.total-amount');
    
    if (subtotalElement) {
        subtotalElement.textContent = `${subtotal} جنيه`;
    }
    if (shippingElement) {
        shippingElement.textContent = shipping === 0 ? 'مجاناً' : `${shipping} جنيه`;
    }
    if (totalElement) {
        totalElement.textContent = `${total} جنيه`;
    }
}

// دالة حساب المجموع الفرعي
function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// دالة حساب مصاريف الشحن
function calculateShipping() {
    const subtotal = calculateSubtotal();
    return subtotal > 1000 ? 0 : 50;
}

// دالة عرض المنتجات في صفحة الدفع
function displayCheckoutItems() {
    const orderItems = document.getElementById('orderItems');
    if (!orderItems) return;
    
    orderItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        orderItems.innerHTML += `
            <div class="order-item">
                <div class="item-info">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>الكمية: ${item.quantity}</p>
                        <p>السعر: ${item.price} جنيه</p>
                    </div>
                </div>
                <div class="item-price">${itemTotal} جنيه</div>
            </div>
        `;
    });

    // تحديث المجموع الفرعي
    const subtotalElement = document.querySelector('.subtotal-amount');
    if (subtotalElement) {
        subtotalElement.textContent = `${subtotal} جنيه`;
    }
}