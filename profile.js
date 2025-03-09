// التحكم في تحرير المعلومات الشخصية
function toggleEditMode(section) {
    if (section === 'info') {
        const displayDiv = document.getElementById('infoDisplay');
        const form = document.getElementById('infoForm');
        
        if (form.style.display === 'none') {
            // تعبئة النموذج بالبيانات الحالية
            const savedInfo = JSON.parse(localStorage.getItem('personalInfo')) || {};
            document.getElementById('editName').value = savedInfo.name || '';
            document.getElementById('editEmail').value = savedInfo.email || '';
            document.getElementById('editPhone').value = savedInfo.phone || '';
            
            displayDiv.style.display = 'none';
            form.style.display = 'block';
        } else {
            displayDiv.style.display = 'grid';
            form.style.display = 'none';
        }
    }
}

// تحميل المعلومات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    loadPersonalInfo();
    loadAddresses();
    setupEventListeners();
    loadOrders();
    loadSavedImages();
});

// التحقق من حالة تسجيل الدخول
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('user');
    
    if (!isLoggedIn || !user) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // مستمعي الأحداث للقائمة الجانبية
    const menuItems = document.querySelectorAll('.profile-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            switchSection(targetSection);
        });
    });

    // مستمعي الأحداث للنماذج
    document.getElementById('infoForm')?.addEventListener('submit', savePersonalInfo);
    document.getElementById('addressForm')?.addEventListener('submit', handleAddressSubmit);
}

// تحميل المعلومات الشخصية
function loadPersonalInfo() {
    const savedInfo = JSON.parse(localStorage.getItem('personalInfo')) || {
        name: '',
        email: '',
        phone: ''
    };
    
    // تحديث العرض في الصفحة
    document.getElementById('userName').textContent = savedInfo.name || 'لم يتم تحديد الاسم';
    document.getElementById('userEmail').textContent = savedInfo.email || 'لم يتم تحديد البريد الإلكتروني';
    document.getElementById('userPhone').textContent = savedInfo.phone || 'لم يتم تحديد رقم الهاتف';
    
    // تحديث الترويسة
    document.getElementById('userNameHeader').textContent = savedInfo.name || 'مستخدم جديد';
    document.getElementById('userEmailHeader').textContent = savedInfo.email || 'user@example.com';
    
    // تعبئة نموذج التحرير
    document.getElementById('editName').value = savedInfo.name || '';
    document.getElementById('editEmail').value = savedInfo.email || '';
    document.getElementById('editPhone').value = savedInfo.phone || '';
}

// تحديث رسالة الترحيب
function updateWelcomeMessage(name) {
    const welcomeDiv = document.querySelector('.profile-welcome');
    if (welcomeDiv) {
        welcomeDiv.textContent = name ? `أهلاً، ${name}` : 'أهلاً بك';
    }
}

// حفظ المعلومات الشخصية
function savePersonalInfo(event) {
    event.preventDefault();
    
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    
    // حفظ المعلومات في localStorage
    const personalInfo = { name, email, phone };
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
    
    // تحديث العرض في الصفحة
    document.getElementById('userName').textContent = name;
    document.getElementById('userEmail').textContent = email;
    document.getElementById('userPhone').textContent = phone;
    
    // تحديث الترويسة
    document.getElementById('userNameHeader').textContent = name;
    document.getElementById('userEmailHeader').textContent = email;
    
    // إخفاء نموذج التحرير وإظهار العرض
    document.getElementById('infoDisplay').style.display = 'grid';
    document.getElementById('infoForm').style.display = 'none';
    
    // إظهار رسالة نجاح
    showToast('تم حفظ المعلومات بنجاح', 'success');
}

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// إظهار رسالة للمستخدم
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// تحميل العناوين
function loadAddresses() {
    const addresses = JSON.parse(localStorage.getItem('userAddresses')) || [];
    const addressesContainer = document.getElementById('addressesContainer');
    addressesContainer.innerHTML = '';
    
    if (addresses.length === 0) {
        addressesContainer.innerHTML = '<p class="no-data">لا توجد عناوين مضافة</p>';
        return;
    }
    
    addresses.forEach((address, index) => {
        const addressElement = document.createElement('div');
        addressElement.className = 'address-item';
        addressElement.innerHTML = `
            <div class="address-details">
                <h4>${address.title}</h4>
                <p>${address.street}</p>
                <p>${address.city}، ${address.area}</p>
                ${address.details ? `<p>${address.details}</p>` : ''}
            </div>
            <div class="address-actions">
                <button onclick="editAddress(${index})" class="edit-button">
                    <i class="fas fa-edit"></i>
                    تعديل
                </button>
                <button onclick="deleteAddress(${index})" class="delete-button">
                    <i class="fas fa-trash"></i>
                    حذف
                </button>
            </div>
        `;
        addressesContainer.appendChild(addressElement);
    });
}

// إضافة/تعديل عنوان
function handleAddressSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const newAddress = {
        title: form.querySelector('[name="title"]').value,
        street: form.querySelector('[name="street"]').value,
        city: form.querySelector('[name="city"]').value,
        area: form.querySelector('[name="area"]').value,
        details: form.querySelector('[name="details"]').value
    };
    
    // التحقق من وجود البيانات المطلوبة
    if (!newAddress.title || !newAddress.street || !newAddress.city || !newAddress.area) {
        showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // جلب العناوين الحالية
    const addresses = JSON.parse(localStorage.getItem('userAddresses')) || [];
    
    if (form.dataset.editIndex) {
        // تحديث عنوان موجود
        const index = parseInt(form.dataset.editIndex);
        addresses[index] = newAddress;
        delete form.dataset.editIndex;
    } else {
        // إضافة عنوان جديد
        addresses.push(newAddress);
    }
    
    // حفظ العناوين
    localStorage.setItem('userAddresses', JSON.stringify(addresses));
    
    // إخفاء النموذج وتحديث العرض
    toggleAddressForm();
    loadAddresses();
    showToast('تم حفظ العنوان بنجاح');
}

// تعديل عنوان
function editAddress(index) {
    const addresses = JSON.parse(localStorage.getItem('userAddresses')) || [];
    const address = addresses[index];
    
    if (!address) return;
    
    const form = document.getElementById('addressForm');
    form.querySelector('[name="title"]').value = address.title;
    form.querySelector('[name="street"]').value = address.street;
    form.querySelector('[name="city"]').value = address.city;
    form.querySelector('[name="area"]').value = address.area;
    form.querySelector('[name="details"]').value = address.details || '';
    
    // تخزين مؤشر العنوان المراد تعديله
    form.dataset.editIndex = index;
    
    // إظهار النموذج
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth' });
}

// حذف عنوان
function deleteAddress(index) {
    if (!confirm('هل أنت متأكد من حذف هذا العنوان؟')) return;
    
    const addresses = JSON.parse(localStorage.getItem('userAddresses')) || [];
    addresses.splice(index, 1);
    localStorage.setItem('userAddresses', JSON.stringify(addresses));
    
    loadAddresses();
    showToast('تم حذف العنوان بنجاح');
}

// إضافة مستمع الحدث لنموذج العنوان
document.getElementById('addressForm').addEventListener('submit', handleAddressSubmit);

// إظهار/إخفاء نموذج العناوين
function toggleAddressForm() {
    const form = document.getElementById('addressForm');
    const currentDisplay = form.style.display;
    
    if (currentDisplay === 'none') {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
        form.reset();
        delete form.dataset.editIndex;
    } else {
        form.style.display = 'none';
    }
}

// تحويل الملف إلى Base64
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// التعامل مع تحميل الصورة الشخصية
async function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        try {
            const imageUrl = URL.createObjectURL(file);
            document.getElementById('profileImage').src = imageUrl;

            // تحويل الصورة إلى Base64 وحفظها
            const base64Image = await getBase64(file);
            localStorage.setItem('userAvatar', base64Image);
            showToast('تم حفظ الصورة الشخصية بنجاح');
        } catch (error) {
            console.error('Error uploading avatar image:', error);
            showToast('حدث خطأ أثناء تحميل الصورة', 'error');
        }
    }
}

// التعامل مع تحميل صورة الغلاف
async function handleCoverUpload(event) {
    const file = event.target.files[0];
    if (file) {
        try {
            const imageUrl = URL.createObjectURL(file);
            document.getElementById('coverImage').src = imageUrl;

            // تحويل الصورة إلى Base64 وحفظها
            const base64Image = await getBase64(file);
            localStorage.setItem('userCover', base64Image);
            showToast('تم حفظ صورة الغلاف بنجاح');
        } catch (error) {
            console.error('Error uploading cover image:', error);
            showToast('حدث خطأ أثناء تحميل الصورة', 'error');
        }
    }
}

// تحميل الصور عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadSavedImages();
});

// تحميل الصور المحفوظة
function loadSavedImages() {
    // تحميل الصورة الشخصية
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        document.getElementById('profileImage').src = savedAvatar;
    }

    // تحميل صورة الغلاف
    const savedCover = localStorage.getItem('userCover');
    if (savedCover) {
        document.getElementById('coverImage').src = savedCover;
    }
}

// متغيرات عامة لتتبع محاولات تغيير كلمة المرور
let passwordAttempts = 0;
const MAX_PASSWORD_ATTEMPTS = 3;
let passwordFormLocked = false;
let lockoutTimer = null;

// تبديل نموذج تغيير كلمة المرور مع إضافة المزيد من التحقق
function togglePasswordForm() {
    const form = document.getElementById('password-form');
    const currentDisplay = form.style.display;
    
    if (currentDisplay === 'none' || !currentDisplay) {
        // التحقق من قفل النموذج
        if (passwordFormLocked) {
            const remainingTime = Math.ceil((lockoutTimer._idleTimeout - (Date.now() - lockoutTimer._idleStart)) / 1000);
            showToast(`النموذج مقفل. يرجى الانتظار ${remainingTime} ثانية`, 'error');
            return;
        }
        
        // فتح النموذج
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
        
        // إضافة مستمعي الأحداث للتحقق من قوة كلمة المرور
        const newPasswordInput = document.querySelector('[name="newPassword"]');
        newPasswordInput.addEventListener('input', checkPasswordStrength);
        
        // إعادة تعيين حقول النموذج
        resetPasswordForm();
    } else {
        // إغلاق النموذج
        form.style.display = 'none';
        resetPasswordForm();
        
        // إعادة تعيين عداد المحاولات إذا تم إغلاق النموذج يدويًا
        passwordAttempts = 0;
    }
}

// إعادة تعيين نموذج كلمة المرور
function resetPasswordForm() {
    const form = document.getElementById('password-form');
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    
    // إخفاء مؤشر قوة كلمة المرور
    const strengthIndicator = document.getElementById('password-strength-indicator');
    if (strengthIndicator) {
        strengthIndicator.style.display = 'none';
    }
}

// التحقق من قوة كلمة المرور
function checkPasswordStrength(event) {
    const password = event.target.value;
    const strengthIndicator = document.getElementById('password-strength-indicator');
    const strengthText = document.getElementById('password-strength-text');
    
    // إظهار مؤشر القوة
    strengthIndicator.style.display = 'block';
    
    // حساب قوة كلمة المرور
    let strength = 0;
    let feedback = [];
    
    // التحقق من طول كلمة المرور
    if (password.length >= 8) {
        strength += 1;
    } else {
        feedback.push('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
    }
    
    // التحقق من وجود أحرف كبيرة وصغيرة
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        strength += 1;
    } else {
        feedback.push('يجب أن تحتوي على أحرف كبيرة وصغيرة');
    }
    
    // التحقق من وجود أرقام
    if (/\d/.test(password)) {
        strength += 1;
    } else {
        feedback.push('يجب أن تحتوي على رقم واحد على الأقل');
    }
    
    // التحقق من وجود رموز خاصة
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength += 1;
    } else {
        feedback.push('يجب أن تحتوي على رمز خاص واحد على الأقل');
    }
    
    // تحديث مؤشر القوة
    const strengthBar = strengthIndicator.querySelector('.password-strength');
    strengthBar.className = 'password-strength';
    
    if (strength === 0) {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'ضعيفة جداً';
    } else if (strength === 1) {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'ضعيفة';
    } else if (strength === 2) {
        strengthBar.classList.add('medium');
        strengthText.textContent = 'متوسطة';
    } else if (strength === 3) {
        strengthBar.classList.add('strong');
        strengthText.textContent = 'قوية';
    } else {
        strengthBar.classList.add('very-strong');
        strengthText.textContent = 'قوية جداً';
    }
    
    // عرض الملاحظات
    const feedbackElement = document.getElementById('password-feedback');
    if (feedback.length > 0) {
        feedbackElement.innerHTML = feedback.map(item => `<li>${item}</li>`).join('');
        feedbackElement.style.display = 'block';
    } else {
        feedbackElement.style.display = 'none';
    }
}

// تغيير كلمة المرور مع إضافة المزيد من التحقق والأمان
function changePassword() {
    if (passwordFormLocked) {
        showToast('النموذج مقفل. يرجى المحاولة لاحقاً', 'error');
        return;
    }
    
    const currentPassword = document.querySelector('[name="currentPassword"]').value;
    const newPassword = document.querySelector('[name="newPassword"]').value;
    const confirmPassword = document.querySelector('[name="confirmPassword"]').value;
    
    // التحقق من صحة المدخلات
    if (!currentPassword || !newPassword || !confirmPassword) {
        showToast('يرجى ملء جميع الحقول', 'error');
        return;
    }
    
    // التحقق من تطابق كلمة المرور الجديدة
    if (newPassword !== confirmPassword) {
        showToast('كلمة المرور الجديدة غير متطابقة', 'error');
        passwordAttempts++;
        checkAttempts();
        return;
    }
    
    // التحقق من قوة كلمة المرور
    if (!isPasswordStrong(newPassword)) {
        showToast('كلمة المرور الجديدة ضعيفة جداً. يرجى اتباع متطلبات قوة كلمة المرور', 'error');
        return;
    }
    
    // محاكاة التحقق من كلمة المرور الحالية
    const storedPassword = localStorage.getItem('userPassword');
    if (currentPassword !== storedPassword) {
        showToast('كلمة المرور الحالية غير صحيحة', 'error');
        passwordAttempts++;
        checkAttempts();
        return;
    }
    
    // حفظ كلمة المرور الجديدة
    localStorage.setItem('userPassword', newPassword);
    
    // إعادة تعيين عداد المحاولات
    passwordAttempts = 0;
    
    // إغلاق النموذج وعرض رسالة نجاح
    togglePasswordForm();
    showToast('تم تغيير كلمة المرور بنجاح', 'success');
    
    // تسجيل محاولة تغيير كلمة المرور
    logPasswordChange();
}

// التحقق من قوة كلمة المرور
function isPasswordStrong(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength &&
           hasUpperCase &&
           hasLowerCase &&
           hasNumbers &&
           hasSpecialChars;
}

// التحقق من عدد المحاولات وقفل النموذج إذا لزم الأمر
function checkAttempts() {
    if (passwordAttempts >= MAX_PASSWORD_ATTEMPTS) {
        passwordFormLocked = true;
        const form = document.getElementById('password-form');
        form.style.display = 'none';
        
        // قفل النموذج لمدة 5 دقائق
        const LOCKOUT_TIME = 5 * 60 * 1000; // 5 دقائق
        showToast(`تم قفل النموذج لمدة 5 دقائق بسبب كثرة المحاولات الخاطئة`, 'error');
        
        lockoutTimer = setTimeout(() => {
            passwordFormLocked = false;
            passwordAttempts = 0;
            showToast('تم إعادة تفعيل نموذج تغيير كلمة المرور', 'success');
        }, LOCKOUT_TIME);
    }
}

// تسجيل محاولة تغيير كلمة المرور
function logPasswordChange() {
    const now = new Date();
    const log = {
        timestamp: now.toISOString(),
        action: 'password_change',
        success: true
    };
    
    // حفظ السجل في localStorage
    const logs = JSON.parse(localStorage.getItem('securityLogs') || '[]');
    logs.push(log);
    localStorage.setItem('securityLogs', JSON.stringify(logs));
}

// حذف الحساب
function confirmDeleteAccount() {
    if (confirm('هل أنت متأكد من رغبتك في حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.')) {
        // هنا يمكن إضافة كود حذف الحساب
        localStorage.clear();
        window.location.href = 'index.html';
    }
}

// إضافة مستمعي الأحداث
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    
    // حفظ الإعدادات عند تغيير أي خيار
    const settingsInputs = document.querySelectorAll('.settings-content input, .settings-content select');
    settingsInputs.forEach(input => {
        input.addEventListener('change', saveSettings);
    });
});

// إظهار رسالة للمستخدم
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// تبديل أقسام الإعدادات
function toggleSettingsSection(sectionId) {
    const content = document.getElementById(`${sectionId}-settings`);
    const button = content.previousElementSibling.querySelector('.toggle-btn i');
    
    if (content.style.display === 'none' || !content.style.display) {
        content.style.display = 'block';
        button.classList.remove('fa-chevron-down');
        button.classList.add('fa-chevron-up');
    } else {
        content.style.display = 'none';
        button.classList.remove('fa-chevron-up');
        button.classList.add('fa-chevron-down');
    }
}

// تبديل نموذج تغيير كلمة المرور
function togglePasswordForm() {
    const form = document.getElementById('password-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    
    if (form.style.display === 'block') {
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

// تغيير كلمة المرور
function changePassword() {
    const currentPassword = document.querySelector('[name="currentPassword"]').value;
    const newPassword = document.querySelector('[name="newPassword"]').value;
    const confirmPassword = document.querySelector('[name="confirmPassword"]').value;
    
    // التحقق من صحة المدخلات
    if (!currentPassword || !newPassword || !confirmPassword) {
        showToast('يرجى ملء جميع الحقول', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showToast('كلمة المرور الجديدة غير متطابقة', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showToast('كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل', 'error');
        return;
    }
    
    // هنا يمكن إضافة المزيد من التحققات لقوة كلمة المرور
    
    // حفظ كلمة المرور الجديدة (يمكن تعديل هذا الجزء حسب نظام المصادقة المستخدم)
    localStorage.setItem('userPassword', newPassword);
    
    // إخفاء النموذج وعرض رسالة نجاح
    togglePasswordForm();
    showToast('تم تغيير كلمة المرور بنجاح');
    
    // إعادة تعيين النموذج
    document.querySelector('[name="currentPassword"]').value = '';
    document.querySelector('[name="newPassword"]').value = '';
    document.querySelector('[name="confirmPassword"]').value = '';
}

// حفظ الإعدادات
function saveSettings() {
    const settings = {
        twoFactorAuth: document.getElementById('twoFactorAuth').checked,
        emailNotifications: document.getElementById('emailNotifications').checked,
        offersNotifications: document.getElementById('offersNotifications').checked,
        orderNotifications: document.getElementById('orderNotifications').checked,
        showPurchaseHistory: document.getElementById('showPurchaseHistory').checked,
        savePaymentInfo: document.getElementById('savePaymentInfo').checked,
        allowRecommendations: document.getElementById('allowRecommendations').checked,
        language: document.querySelector('[name="language"]').value,
        currency: document.querySelector('[name="currency"]').value
    };
    
    // حفظ الإعدادات في Local Storage
    localStorage.setItem('userSettings', JSON.stringify(settings));
    showToast('تم حفظ الإعدادات بنجاح');
}

// تحميل الإعدادات
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('userSettings')) || {};
    
    // تعيين قيم الإعدادات المحفوظة
    if (settings) {
        document.getElementById('twoFactorAuth').checked = settings.twoFactorAuth || false;
        document.getElementById('emailNotifications').checked = settings.emailNotifications !== false;
        document.getElementById('offersNotifications').checked = settings.offersNotifications !== false;
        document.getElementById('orderNotifications').checked = settings.orderNotifications !== false;
        document.getElementById('showPurchaseHistory').checked = settings.showPurchaseHistory !== false;
        document.getElementById('savePaymentInfo').checked = settings.savePaymentInfo || false;
        document.getElementById('allowRecommendations').checked = settings.allowRecommendations !== false;
        
        if (settings.language) {
            document.querySelector('[name="language"]').value = settings.language;
        }
        if (settings.currency) {
            document.querySelector('[name="currency"]').value = settings.currency;
        }
    }
}

// إظهار/إخفاء كلمة المرور
function togglePasswordVisibility(button) {
    const input = button.parentElement.querySelector('input');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// تحميل الطلبات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
});

function loadOrders() {
    const ordersContainer = document.getElementById('ordersList');
    if (!ordersContainer) {
        console.error('Element with id "ordersList" not found');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = '<div class="no-orders">لا توجد طلبات سابقة</div>';
        return;
    }
    
    ordersContainer.innerHTML = '';
    orders.forEach(order => {
        const orderCard = createOrderCard(order);
        ordersContainer.appendChild(orderCard);
    });
}

function createOrderCard(order) {
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('ar-EG');
    const formattedTime = orderDate.toLocaleTimeString('ar-EG');
    
    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';
    orderCard.innerHTML = `
        <div class="order-header">
            <h3>طلب رقم: ${order.id}</h3>
            <span class="order-status">${getStatusText(order.status)}</span>
        </div>
        <div class="order-info">
            <div class="order-info-item">
                <span class="order-info-label">التاريخ</span>
                <span class="order-info-value">${formattedDate}</span>
            </div>
            <div class="order-info-item">
                <span class="order-info-label">الوقت</span>
                <span class="order-info-value">${formattedTime}</span>
            </div>
            <div class="order-info-item">
                <span class="order-info-label">العنوان</span>
                <span class="order-info-value">${order.address}</span>
            </div>
        </div>
        <div class="order-products">
            ${createProductsList(order.products)}
        </div>
        <div class="order-total">
            <span class="order-total-label">المجموع الكلي</span>
            <span class="order-total-value">${order.total} جنيه</span>
        </div>
    `;
    
    return orderCard;
}

function createProductsList(products) {
    return products.map(product => `
        <div class="order-product">
            <img src="${product.image}" alt="${product.name}">
            <div class="order-product-info">
                <div class="order-product-name">${product.name}</div>
                <div class="order-product-details">
                    الكمية: ${product.quantity} | السعر: ${product.price} جنيه
                </div>
            </div>
        </div>
    `).join('');
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'قيد المعالجة',
        'processing': 'جاري التجهيز',
        'shipped': 'تم الشحن',
        'delivered': 'تم التوصيل',
        'cancelled': 'ملغي'
    };
    return statusMap[status] || status;
}
