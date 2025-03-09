document.addEventListener('DOMContentLoaded', function() {
    // استدعاء عناصر النموذج
    const checkoutForm = document.getElementById('checkoutForm');
    const confirmButton = document.getElementById('confirmOrder');
    const orderItemsContainer = document.getElementById('orderItems');
    const subtotalAmountElement = document.querySelector('.subtotal-amount');
    const totalAmountElement = document.querySelector('.total-amount');

    // التحقق من حالة تسجيل الدخول عند تحميل الصفحة
    updateAuthStatus();

    // تحديث حالة تسجيل الدخول في القائمة
    function updateAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const profileLink = document.getElementById('profileLink');
        
        if (isLoggedIn) {
            profileLink.textContent = 'الملف الشخصي';
            profileLink.href = 'profile.html';
            profileLink.onclick = null;
        } else {
            profileLink.textContent = 'تسجيل الدخول';
            profileLink.href = '#';
            profileLink.onclick = handleAuthClick;
        }
    }

    // تحميل السلة
    let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
    
    // عرض عناصر السلة
    function displayOrderItems() {
        if (!cart.items || cart.items.length === 0) {
            window.location.href = 'index.html';
            return;
        }

        orderItemsContainer.innerHTML = '';
        cart.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <div class="item-info">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p class="item-quantity">الكمية: ${item.quantity}</p>
                        <p class="item-price">السعر: ${item.price} جنيه</p>
                    </div>
                </div>
                <div class="item-total">${item.price * item.quantity} جنيه</div>
            `;
            orderItemsContainer.appendChild(itemElement);
        });

        updateTotals();
    }

    // تحديث المجاميع
    function updateTotals() {
        const subtotal = cart.total;
        const shipping = 50;
        const total = subtotal + shipping;

        subtotalAmountElement.textContent = subtotal + ' جنيه';
        totalAmountElement.textContent = total + ' جنيه';
    }

    // حفظ الطلب
    function saveOrder() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderId = 'ORD-' + Date.now();
        
        const orderData = {
            id: orderId,
            date: new Date().toISOString(),
            status: 'pending',
            customerName: localStorage.getItem('userName'),
            email: localStorage.getItem('userEmail'),
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
            products: cart.items,
            subtotal: cart.total,
            shipping: 50,
            total: cart.total + 50
        };
        
        orders.unshift(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.removeItem('cart');
        
        return orderId;
    }

    // إظهار رسالة نجاح
    function showSuccess(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast success show';
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    // إظهار رسالة خطأ
    function showError(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast error show';
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    // معالج حدث زر تأكيد الطلب
    confirmButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // التحقق من تسجيل الدخول
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'login.html';
            return;
        }

        // التحقق من إدخال العنوان ورقم الهاتف
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        if (!address || !phone) {
            showError('يرجى إدخال العنوان ورقم الهاتف');
            return;
        }

        try {
            const orderId = saveOrder();
            showSuccess('تم تأكيد طلبك بنجاح! رقم الطلب: ' + orderId);
            
            setTimeout(() => {
                window.location.href = 'profile.html#orders';
            }, 2000);
        } catch (error) {
            showError('حدث خطأ أثناء تأكيد الطلب. يرجى المحاولة مرة أخرى.');
            console.error(error);
        }
    });

    // عرض عناصر السلة عند تحميل الصفحة
    displayOrderItems();
});
