const products = [
    {
        id: 1,
        name: "نايك اير ماكس 270",
        price: 2199,
        image: "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-270-shoes-2V5C4p.png"
    },
    {
        id: 2,
        name: "أديداس ألترا بوست 21",
        price: 2499,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_21_Shoes_Black_FY0306_01_standard.jpg"
    },
    {
        id: 3,
        name: "نايك اير فورس 1",
        price: 1899,
        image: "https://static.nike.com/a/images/t_default/5235c31c-3d0b-4352-a89c-a8e262d7cbe1/air-force-1-07-shoes-WrLlWX.png"
    },
    {
        id: 4,
        name: "بوما سويد كلاسيك",
        price: 1299,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers"
    },
    {
        id: 5,
        name: "أديداس سوبرستار",
        price: 1699,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg"
    },
    {
        id: 6,
        name: "نايك زوم بيجاسوس 38",
        price: 2299,
        image: "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-270-shoes-2V5C4p.png"
    },
    {
        id: 7,
        name: "نايك اير جوردن 1",
        price: 2899,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_21_Shoes_Black_FY0306_01_standard.jpg"
    },
    {
        id: 8,
        name: "أديداس ستان سميث",
        price: 1599,
        image: "https://static.nike.com/a/images/t_default/5235c31c-3d0b-4352-a89c-a8e262d7cbe1/air-force-1-07-shoes-WrLlWX.png"
    },
    {
        id: 9,
        name: "نايك ريفولوشن 6",
        price: 1399,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers"
    },
    {
        id: 10,
        name: "بوما آر إكس",
        price: 1799,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg"
    },
    {
        id: 11,
        name: "أديداس إن إم دي",
        price: 2599,
        image: "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-270-shoes-2V5C4p.png"
    },
    {
        id: 12,
        name: "نايك اير ماكس 90",
        price: 2199,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_21_Shoes_Black_FY0306_01_standard.jpg"
    },
    {
        id: 13,
        name: "بوما فيوتشر رايدر",
        price: 1699,
        image: "https://static.nike.com/a/images/t_default/5235c31c-3d0b-4352-a89c-a8e262d7cbe1/air-force-1-07-shoes-WrLlWX.png"
    },
    {
        id: 14,
        name: "أديداس جازيل",
        price: 1499,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers"
    },
    {
        id: 15,
        name: "نايك دنك لو",
        price: 1899,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg"
    },
    {
        id: 16,
        name: "أديداس فورم لو",
        price: 1599,
        image: "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-270-shoes-2V5C4p.png"
    },
    {
        id: 17,
        name: "نايك بليزر",
        price: 1799,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_21_Shoes_Black_FY0306_01_standard.jpg"
    },
    {
        id: 18,
        name: "بوما كالي",
        price: 1399,
        image: "https://static.nike.com/a/images/t_default/5235c31c-3d0b-4352-a89c-a8e262d7cbe1/air-force-1-07-shoes-WrLlWX.png"
    },
    {
        id: 19,
        name: "أديداس سامبا",
        price: 1699,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers"
    },
    {
        id: 20,
        name: "نايك اير هوراتشي",
        price: 2299,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg"
    },
    {
        id: 21,
        name: "أديداس كونتيننتال 80",
        price: 1799,
        image: "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-270-shoes-2V5C4p.png"
    },
    {
        id: 22,
        name: "نايك اير بريستو",
        price: 2199,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_21_Shoes_Black_FY0306_01_standard.jpg"
    },
    {
        id: 23,
        name: "بوما آر إس-زد",
        price: 1899,
        image: "https://static.nike.com/a/images/t_default/5235c31c-3d0b-4352-a89c-a8e262d7cbe1/air-force-1-07-shoes-WrLlWX.png"
    },
    {
        id: 24,
        name: "أديداس زد إكس",
        price: 2099,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers"
    },
    {
        id: 25,
        name: "نايك فري رن",
        price: 1999,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg"
    },
    {
        id: 26,
        name: "أديداس برويفير",
        price: 1699,
        image: "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-270-shoes-2V5C4p.png"
    },
    {
        id: 27,
        name: "نايك إير زوم",
        price: 2599,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_21_Shoes_Black_FY0306_01_standard.jpg"
    },
    {
        id: 28,
        name: "بوما ميراج سبورت",
        price: 1499,
        image: "https://static.nike.com/a/images/t_default/5235c31c-3d0b-4352-a89c-a8e262d7cbe1/air-force-1-07-shoes-WrLlWX.png"
    },
    {
        id: 29,
        name: "أديداس ألفا بونس",
        price: 1899,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers"
    },
    {
        id: 30,
        name: "نايك ريأكت فيجن",
        price: 2399,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg"
    },
    {
        id: 31,
        name: "نايك ريفت",
        price: 1899,
        image: "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-270-shoes-2V5C4p.png"
    },
    {
        id: 32,
        name: "أديداس يونج 96",
        price: 2099,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_21_Shoes_Black_FY0306_01_standard.jpg"
    },
    {
        id: 33,
        name: "بوما آر إس-كيو",
        price: 1799,
        image: "https://static.nike.com/a/images/t_default/5235c31c-3d0b-4352-a89c-a8e262d7cbe1/air-force-1-07-shoes-WrLlWX.png"
    },
    {
        id: 34,
        name: "نايك إير ماكس بلس",
        price: 2499,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers"
    },
    {
        id: 35,
        name: "أديداس نايت جوجر",
        price: 1999,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg"
    },
    {
        id: 36,
        name: "نايك زوم فريك",
        price: 2299,
        image: "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-270-shoes-2V5C4p.png"
    },
    {
        id: 37,
        name: "أديداس أوزويجو",
        price: 1899,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_21_Shoes_Black_FY0306_01_standard.jpg"
    },
    {
        id: 38,
        name: "بوما واي إل دي رايدر",
        price: 1699,
        image: "https://static.nike.com/a/images/t_default/5235c31c-3d0b-4352-a89c-a8e262d7cbe1/air-force-1-07-shoes-WrLlWX.png"
    },
    {
        id: 39,
        name: "نايك ليبرون",
        price: 2799,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers"
    },
    {
        id: 40,
        name: "أديداس فوروم ميد",
        price: 1999,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg"
    },
    {
        id: 41,
        name: "نايك كوبي",
        price: 2599,
        image: "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-270-shoes-2V5C4p.png"
    },
    {
        id: 42,
        name: "أديداس زد إكس 2كيه بوست",
        price: 2199,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_21_Shoes_Black_FY0306_01_standard.jpg"
    },
    {
        id: 43,
        name: "بوما سويد كلاسيك XXI",
        price: 1499,
        image: "https://static.nike.com/a/images/t_default/5235c31c-3d0b-4352-a89c-a8e262d7cbe1/air-force-1-07-shoes-WrLlWX.png"
    },
    {
        id: 44,
        name: "نايك بي جي 5",
        price: 2399,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers"
    },
    {
        id: 45,
        name: "أديداس إكس بلر",
        price: 1799,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg"
    },
    {
        id: 46,
        name: "نايك كيري",
        price: 2299,
        image: "https://static.nike.com/a/images/t_default/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-270-shoes-2V5C4p.png"
    },
    {
        id: 47,
        name: "أديداس سوبر كورت",
        price: 1699,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_21_Shoes_Black_FY0306_01_standard.jpg"
    },
    {
        id: 48,
        name: "بوما آر إس-دريم",
        price: 1899,
        image: "https://static.nike.com/a/images/t_default/5235c31c-3d0b-4352-a89c-a8e262d7cbe1/air-force-1-07-shoes-WrLlWX.png"
    },
    {
        id: 49,
        name: "نايك زوم جي تي كت",
        price: 2499,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers"
    },
    {
        id: 50,
        name: "أديداس ريسبونس سوبر",
        price: 1999,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg"
    }
]; 