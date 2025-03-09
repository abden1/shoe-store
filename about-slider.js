document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 1;
    let slideInterval;
    
    // عرض الشريحة الأولى عند تحميل الصفحة
    showSlides(slideIndex);
    startAutoSlide();

    // التحكم في الأزرار التالي/السابق
    window.plusSlides = function(n) {
        stopAutoSlide();
        showSlides(slideIndex += n);
        startAutoSlide();
    }

    // التحكم في النقاط
    window.currentSlide = function(n) {
        stopAutoSlide();
        showSlides(slideIndex = n);
        startAutoSlide();
    }

    function showSlides(n) {
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");
        
        // التأكد من أن الرقم في النطاق الصحيح
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        // إخفاء جميع الشرائح
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // إزالة التنشيط من جميع النقاط
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        // عرض الشريحة الحالية
        if (slides[slideIndex-1]) {
            slides[slideIndex-1].style.display = "block";
        }
        
        // تنشيط النقطة الحالية
        if (dots[slideIndex-1]) {
            dots[slideIndex-1].className += " active";
        }
    }

    // بدء التغيير التلقائي للشرائح
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            plusSlides(1);
        }, 5000); // تغيير كل 5 ثوانٍ
    }

    // إيقاف التغيير التلقائي
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // إيقاف التغيير التلقائي عند تحريك الماوس فوق السلايد شو
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
    slideshowContainer.addEventListener('mouseleave', startAutoSlide);

    // إضافة التحكم بلوحة المفاتيح
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            plusSlides(-1);
        } else if (e.key === 'ArrowRight') {
            plusSlides(1);
        }
    });
});
