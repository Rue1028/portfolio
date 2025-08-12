document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // 导航链接点击后关闭菜单（移动端）
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // 滚动时激活对应的导航链接
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // 滚动动画
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    checkFade(); // 初始检查

    // 植物浇水动画模拟（仅作为演示）
    const waterButtons = document.querySelectorAll('.water-plant-btn');
    
    if (waterButtons.length > 0) {
        waterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const plantContainer = this.closest('.plant-container');
                if (plantContainer) {
                    // 添加水滴动画元素
                    const waterDrop = document.createElement('div');
                    waterDrop.classList.add('water-drop');
                    plantContainer.appendChild(waterDrop);
                    
                    // 移除水滴动画元素
                    setTimeout(() => {
                        waterDrop.remove();
                        
                        // 显示成长动画
                        const growthAnimation = document.createElement('div');
                        growthAnimation.classList.add('growth-animation');
                        growthAnimation.innerHTML = '<i class="fas fa-seedling"></i> +5 成长值';
                        plantContainer.appendChild(growthAnimation);
                        
                        setTimeout(() => {
                            growthAnimation.classList.add('fade-out');
                            setTimeout(() => {
                                growthAnimation.remove();
                            }, 500);
                        }, 1500);
                    }, 1000);
                }
            });
        });
    }

    // 积分获取动画模拟
    const earnPointsButtons = document.querySelectorAll('.earn-points-btn');
    
    if (earnPointsButtons.length > 0) {
        earnPointsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const pointsContainer = this.closest('.points-container');
                if (pointsContainer) {
                    // 显示积分动画
                    const pointsAnimation = document.createElement('div');
                    pointsAnimation.classList.add('points-animation');
                    pointsAnimation.innerHTML = '<i class="fas fa-coins"></i> +10 积分';
                    pointsContainer.appendChild(pointsAnimation);
                    
                    setTimeout(() => {
                        pointsAnimation.classList.add('fly-to-corner');
                        setTimeout(() => {
                            pointsAnimation.remove();
                            
                            // 更新积分显示
                            const pointsDisplay = document.querySelector('.points-display');
                            if (pointsDisplay) {
                                const currentPoints = parseInt(pointsDisplay.textContent) || 0;
                                pointsDisplay.textContent = currentPoints + 10;
                                pointsDisplay.classList.add('points-updated');
                                setTimeout(() => {
                                    pointsDisplay.classList.remove('points-updated');
                                }, 500);
                            }
                        }, 1000);
                    }, 1000);
                }
            });
        });
    }

    // 商品购买动画模拟
    const buyButtons = document.querySelectorAll('.buy-item-btn');
    
    if (buyButtons.length > 0) {
        buyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemContainer = this.closest('.item-container');
                if (itemContainer) {
                    // 添加购买确认动画
                    itemContainer.classList.add('item-purchased');
                    
                    // 显示成功消息
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('purchase-success');
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> 购买成功！';
                    itemContainer.appendChild(successMessage);
                    
                    setTimeout(() => {
                        successMessage.classList.add('fade-out');
                        setTimeout(() => {
                            successMessage.remove();
                            itemContainer.classList.remove('item-purchased');
                        }, 500);
                    }, 2000);
                }
            });
        });
    }

    // 视频播放控制
    const videos = document.querySelectorAll('video');
    const playButtons = document.querySelectorAll('.play-video-btn');
    
    if (videos.length > 0 && playButtons.length > 0) {
        playButtons.forEach((button, index) => {
            if (index < videos.length) {
                button.addEventListener('click', function() {
                    const video = videos[index];
                    if (video.paused) {
                        video.play();
                        this.innerHTML = '<i class="fas fa-pause"></i>';
                    } else {
                        video.pause();
                        this.innerHTML = '<i class="fas fa-play"></i>';
                    }
                });
            }
        });
    }

    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // 表单验证
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
                
                if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('error');
                    }
                }
            });
            
            if (isValid) {
                // 模拟表单提交成功
                const submitButton = this.querySelector('.btn-submit');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = '提交中...';
                
                setTimeout(() => {
                    submitButton.textContent = '提交成功！';
                    this.reset();
                    
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    }, 2000);
                }, 1500);
            }
        });
        
        // 实时验证
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
                
                if (this.type === 'email' && this.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(this.value.trim())) {
                        this.classList.add('error');
                    }
                }
            });
        });
    }
});