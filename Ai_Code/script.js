// 照片轮播功能
const photos = [
    {
        url: 'img/普通话证书.jpg',
        description: '普通话水平测试证书'
    },
    {
        url: 'img/工业和信息化人才岗位能力认证证书.jpg',
        description: '工业和信息化人才岗位能力认证证书'
    },
    {
        url: 'img/蓝桥杯证书.jpg',
        description: '蓝桥杯全国软件和信息技术专业人才大赛证书'
    },
    {
        url: 'img/嵌入式芯片与系统设计竞赛证书.jpg',
        description: '全国大学生嵌入式芯片与系统设计竞赛证书'
    }
];

let currentPhotoIndex = 0;
let autoPlayInterval;
const carousel = document.querySelector('.photo-carousel');

function createCarousel() {
    // 创建轮播图容器
    photos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `url(${photo.url})`;

        const description = document.createElement('div');
        description.className = 'photo-description';
        description.textContent = photo.description;

        slide.appendChild(description);
        carousel.appendChild(slide);
    });

    // 创建控制按钮
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';

    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-control';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.addEventListener('click', () => showPhoto(currentPhotoIndex - 1));

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-control';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.addEventListener('click', () => showPhoto(currentPhotoIndex + 1));

    controls.appendChild(prevButton);
    controls.appendChild(nextButton);
    carousel.appendChild(controls);

    // 创建指示器
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';

    photos.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => showPhoto(index));
        indicators.appendChild(indicator);
    });

    carousel.appendChild(indicators);
}

function showPhoto(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    // 处理索引边界
    if (index < 0) index = photos.length - 1;
    if (index >= photos.length) index = 0;

    // 更新当前索引
    currentPhotoIndex = index;

    // 更新幻灯片显示
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    // 更新指示器
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });

    // 重置自动播放计时器
    resetAutoPlay();
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        showPhoto(currentPhotoIndex + 1);
    }, 3000); // 3秒切换一次
}

// 初始化轮播
createCarousel();
resetAutoPlay();

// 鼠标悬停时暂停自动播放
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carousel.addEventListener('mouseleave', () => {
    resetAutoPlay();
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 