// التحقق من حالة تسجيل الدخول
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('user');
    return {
        isLoggedIn,
        user: user ? JSON.parse(user) : null
    };
}

// تحديث حالة تسجيل الدخول في القائمة
function updateAuthUI() {
    const auth = checkAuthStatus();
    const profileLink = document.getElementById('profileLink');
    
    if (profileLink) {
        if (auth.isLoggedIn) {
            profileLink.textContent = 'الملف الشخصي';
            profileLink.href = 'profile.html';
        } else {
            profileLink.textContent = 'تسجيل الدخول';
            profileLink.href = 'login.html';
        }
    }
}

// تسجيل الدخول
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // تسجيل دخول المستخدم
    const user = {
        email: email,
        name: email.split('@')[0]
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    
    window.location.href = 'profile.html';
});

// تسجيل الخروج
function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// تحميل بيانات المستخدم في الملف الشخصي
function loadProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('userNameHeader').textContent = user.name;
        document.getElementById('userEmailHeader').textContent = user.email;
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
    }
}

// تحميل واجهة المستخدم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const profileLink = document.getElementById('profileLink');
    
    if (profileLink) {
        if (isLoggedIn) {
            profileLink.textContent = 'الملف الشخصي';
            profileLink.href = 'profile.html';
        } else {
            profileLink.textContent = 'تسجيل الدخول';
            profileLink.href = 'login.html';
        }
    }

    // تحميل بيانات الملف الشخصي إذا كنا في صفحة الملف الشخصي
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
});

// معالجة النقر على زر تسجيل الخروج
document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    logout();
});

// تبديل الأقسام في الملف الشخصي
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.profile-menu-item');
    const sections = document.querySelectorAll('.profile-section');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            // إزالة الفئة النشطة من جميع عناصر القائمة
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            // إضافة الفئة النشطة للعنصر المحدد
            this.classList.add('active');

            // إخفاء جميع الأقسام
            sections.forEach(section => section.classList.remove('active'));
            // إظهار القسم المحدد
            document.getElementById(targetId).classList.add('active');
        });
    });
});
