// تهيئة السلة
let cart = {
    items: [],
    total: 0
};

// تحميل السلة من localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
        updateCartCount();
    }
}

// حساب المجموع الكلي
function calculateTotal() {
    cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    updateTotalDisplay();
    saveCart();
}

// تحديث عرض المجموع
function updateTotalDisplay() {
    const totalElements = document.querySelectorAll('.total-amount');
    totalElements.forEach(element => {
        if (element) {
            element.textContent = cart.total + ' جنيه';
        }
    });
}

// حفظ السلة في localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// إضافة منتج إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.items.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    calculateTotal();
    updateCartDisplay();
    updateCartCount();
}

// تحديث عرض السلة
function updateCartDisplay() {
    updateCartDropdown();
    updateCartCount();
}

// تحديث عرض السلة المنسدلة
function updateCartDropdown() {
    const cartItems = document.querySelectorAll('.cart-items');
    
    cartItems.forEach(container => {
        if (!container) return;
        
        container.innerHTML = '';
        
        if (cart.items.length === 0) {
            container.innerHTML = '<div class="empty-cart">السلة فارغة</div>';
            return;
        }

        cart.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-price">${item.price} جنيه</div>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeItem(${item.id})">×</button>
            `;
            container.appendChild(itemElement);
        });
    });

    calculateTotal();
}

// تحديث عدد العناصر في السلة
function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalCount = cart.items.reduce((count, item) => count + item.quantity, 0);
    
    cartCounts.forEach(element => {
        if (element) {
            element.textContent = totalCount;
            element.style.display = totalCount > 0 ? 'flex' : 'none';
        }
    });
}

// تحديث كمية منتج
function updateQuantity(productId, change) {
    const item = cart.items.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeItem(productId);
    } else {
        calculateTotal();
        updateCartDisplay();
    }
}

// إزالة منتج من السلة
function removeItem(productId) {
    cart.items = cart.items.filter(item => item.id !== productId);
    calculateTotal();
    updateCartDisplay();
    showNotification('تم حذف المنتج من السلة');
}

// الانتقال إلى صفحة إتمام الشراء
function goToCheckout() {
    if (cart.items.length === 0) {
        showNotification('السلة فارغة', 'error');
        return;
    }
    window.location.href = 'checkout.html';
}

// إظهار رسالة تأكيد
function showNotification(message, type = 'success') {
    // إزالة أي رسائل سابقة
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // إنشاء عنصر الرسالة
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // إضافة الرسالة للصفحة
    document.body.appendChild(notification);

    // إظهار الرسالة
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });

    // إخفاء الرسالة بعد 1.5 ثانية
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 1500);
}

// إعداد مستمعي أحداث السلة
function setupCartListeners() {
    const cartIcons = document.querySelectorAll('.cart-icon');
    
    cartIcons.forEach(icon => {
        if (!icon) return;
        
        icon.addEventListener('click', function(event) {
            const dropdown = this.querySelector('.cart-dropdown');
            if (!dropdown) return;
            
            dropdown.classList.toggle('show');
            event.stopPropagation();
        });
    });

    // إغلاق السلة عند النقر خارجها
    document.addEventListener('click', function(event) {
        const dropdowns = document.querySelectorAll('.cart-dropdown');
        dropdowns.forEach(dropdown => {
            if (dropdown && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    });
}

// تحديث السلة في الوقت الحقيقي
function setupRealtimeCartSync() {
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            loadCart();
        }
    });
}

// تحميل السلة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    setupCartListeners();
    setupRealtimeCartSync();
});
