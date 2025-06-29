// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニューの開閉
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const headerNav = document.querySelector('.header-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            headerNav.classList.toggle('active');
        });
    }

    // モバイルメニューのリンクをクリックした時にメニューを閉じる
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // 事業内容のリンクをクリックした場合のモバイル版対応
                if (this.textContent.includes('事業内容') && !this.getAttribute('href')) {
                    e.preventDefault();
                    window.location.href = 'index.html#services';
                    return;
                }
                
                mobileMenuToggle.classList.remove('active');
                headerNav.classList.remove('active');
            }
        });
    });

    // モバイル版での事業内容ドロップダウンメニュー制御
    const businessMenus = document.querySelectorAll('.has-dropdown');
    businessMenus.forEach(menu => {
        menu.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                window.location.href = 'index.html#services';
            }
        });
    });

    // メニューエリア外をクリックした時にメニューを閉じる
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            headerNav.classList.contains('active') && 
            !headerNav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            headerNav.classList.remove('active');
        }
    });

    // スムーススクロール
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // フェードインアニメーション
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
});
