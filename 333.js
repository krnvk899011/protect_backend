// Устанавливаем начальную позицию прокрутки наверх
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    
    // Запускаем таймер после загрузки DOM
    updateTimer();
    setInterval(updateTimer, 1000);
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });
}

// Mobile dropdown toggle
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu) dropdownMenu.classList.toggle('active');
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// ========== ТАЙМЕР ДО СЛЕДУЮЩЕЙ ГОНКИ ==========

// ========== ТАЙМЕР ДО СЛЕДУЮЩЕЙ ГОНКИ (КАЛЕНДАРЬ 2026) ==========
function updateTimer() {
    // Календарь 2026 года (без гонок 4 и 5 - Бахрейн и Саудовская Аравия)
    const races = [
        { name: 'Австралия', year: 2026, month: 2, day: 8, hour: 5, minute: 0 },     // 6-8 марта, гонка 8 марта
        { name: 'Китай', year: 2026, month: 2, day: 15, hour: 7, minute: 0 },         // 13-15 марта, гонка 15 марта
        { name: 'Япония', year: 2026, month: 2, day: 29, hour: 6, minute: 0 },        // 27-29 марта, гонка 29 марта
        // Гонки 4 и 5 (Бахрейн и Саудовская Аравия) ПРОПУЩЕНЫ по вашему запросу
        { name: 'Майами', year: 2026, month: 4, day: 3, hour: 20, minute: 0 },        // 1-3 мая, гонка 3 мая
        { name: 'Канада', year: 2026, month: 4, day: 24, hour: 19, minute: 0 },       // 22-24 мая, гонка 24 мая
        { name: 'Монако', year: 2026, month: 5, day: 7, hour: 14, minute: 0 },        // 5-7 июня, гонка 7 июня
        { name: 'Испания (Барселона)', year: 2026, month: 5, day: 14, hour: 14, minute: 0 }, // 12-14 июня, гонка 14 июня
        { name: 'Австрия', year: 2026, month: 5, day: 28, hour: 13, minute: 0 },      // 26-28 июня, гонка 28 июня
        { name: 'Великобритания', year: 2026, month: 6, day: 5, hour: 14, minute: 0 }, // 3-5 июля, гонка 5 июля
        { name: 'Бельгия', year: 2026, month: 6, day: 19, hour: 14, minute: 0 },      // 17-19 июля, гонка 19 июля
        { name: 'Венгрия', year: 2026, month: 6, day: 26, hour: 14, minute: 0 },      // 24-26 июля, гонка 26 июля
        { name: 'Нидерланды', year: 2026, month: 7, day: 23, hour: 14, minute: 0 },   // 21-23 августа, гонка 23 августа
        { name: 'Италия (Монца)', year: 2026, month: 8, day: 6, hour: 14, minute: 0 }, // 4-6 сентября, гонка 6 сентября
        { name: 'Испания (Мадрид)', year: 2026, month: 8, day: 13, hour: 14, minute: 0 }, // 11-13 сентября, гонка 13 сентября
        { name: 'Азербайджан', year: 2026, month: 8, day: 27, hour: 12, minute: 0 },  // 25-27 сентября, гонка 27 сентября
        { name: 'Сингапур', year: 2026, month: 9, day: 11, hour: 13, minute: 0 },     // 9-11 октября, гонка 11 октября
        { name: 'США (Остин)', year: 2026, month: 9, day: 25, hour: 20, minute: 0 },  // 23-25 октября, гонка 25 октября
        { name: 'Мексика', year: 2026, month: 9, day: 31, hour: 19, minute: 0 },      // 30 окт - 1 ноя, гонка 1 ноября (месяц 9 = октябрь, день 31)
        { name: 'Бразилия', year: 2026, month: 10, day: 8, hour: 17, minute: 0 },     // 6-8 ноября, гонка 8 ноября
        { name: 'Лас-Вегас', year: 2026, month: 10, day: 21, hour: 6, minute: 0 },    // 19-21 ноября, гонка 21 ноября
        { name: 'Катар', year: 2026, month: 10, day: 29, hour: 16, minute: 0 },       // 27-29 ноября, гонка 29 ноября
        { name: 'Абу-Даби', year: 2026, month: 11, day: 6, hour: 13, minute: 0 }      // 4-6 декабря, гонка 6 декабря
    ];
    
    const now = new Date();
    
    // Находим следующую гонку
    let nextRace = null;
    for (let race of races) {
        const raceDate = new Date(race.year, race.month, race.day, race.hour, race.minute, 0);
        if (raceDate > now) {
            nextRace = race;
            break;
        }
    }
    
    // Получаем элементы таймера
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const timerTitle = document.querySelector('.next-race-timer h3');
    const timerSubtitle = document.querySelector('.next-race-timer p');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        return;
    }
    
    // Если все гонки прошли
    if (!nextRace) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        if (timerTitle) timerTitle.innerHTML = '<i class="fas fa-check-circle"></i> Сезон 2026 завершён!';
        if (timerSubtitle) timerSubtitle.textContent = 'Спасибо за сезон! Ждём 2027 год.';
        return;
    }
    
    // Обновляем заголовок
    if (timerTitle && !timerTitle.innerHTML.includes('завершён')) {
        timerTitle.innerHTML = `<i class="fas fa-hourglass-half"></i> Следующий Гран-при: ${nextRace.name} 2026`;
    }
    
    // Вычисляем разницу
    const raceDate = new Date(nextRace.year, nextRace.month, nextRace.day, nextRace.hour, nextRace.minute, 0);
    const diff = raceDate - now;
    
    if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Запуск таймера
document.addEventListener('DOMContentLoaded', function() {
    updateTimer();
    setInterval(updateTimer, 1000);
});

// Gallery Data
const galleryData = {
    photos: [
        { src: '1.JPG', alt: 'Команда в боксах' },
        { src: '14.JPG', alt: 'Команда в боксах' },
        { src: '2.JPG', alt: 'Пилоты на подиуме' },
        { src: '15.JPG', alt: 'Команда в боксах' },
        { src: '4.JPG', alt: 'Болид на трассе' },
        { src: '5.JPG', alt: 'Командная встреча' },
        { src: '16.JPG', alt: 'Команда в боксах' },
        { src: '6.JPG', alt: 'Команда в боксах' },
        { src: '17.JPG', alt: 'Команда в боксах' },
        { src: '7.JPG', alt: 'Пилоты на подиуме' },
        { src: '18.JPG', alt: 'Команда в боксах' },
        { src: '8.JPG', alt: 'Техническая команда' },
        { src: '9.JPG', alt: 'Болид на трассе' },
        { src: '20.JPG', alt: 'Команда в боксах' },
        { src: '11.JPG', alt: 'Болид на трассе' },
        { src: '13.JPG', alt: 'Командная встреча' },
        { src: '21.JPG', alt: 'Every dream needs a team' }
    ],
    videos: [
        { src: 'video1.MP4', poster: '11.JPG', title: '' },
        { src: 'v15.MP4', poster: '11.JPG', title: '' },
        { src: 'video2.MP4', poster: '11.JPG', title: '' },
        { src: 'v16.MP4', poster: '11.JPG', title: '' },
        { src: 'v25.MP4', poster: '11.JPG', title: '' },
        { src: 'video4.MP4', poster: '11.JPG', title: '' },
        { src: 'v17.MP4', poster: '11.JPG', title: '' },
        { src: 'video5.MP4', poster: '11.JPG', title: '' },
        { src: 'video16.MP4', poster: '11.JPG', title: '' },
        { src: 'v18.MP4', poster: '11.JPG', title: '' },
        { src: 'video7.MP4', poster: '11.JPG', title: '' },
        { src: 'video8.MP4', poster: '11.JPG', title: '' },
        { src: 'v19.MP4', poster: '11.JPG', title: '' },
        { src: 'v24.MP4', poster: '11.JPG', title: '' },
        { src: 'video10.MP4', poster: '11.JPG', title: '' },
        { src: 'v20.MP4', poster: '11.JPG', title: '' },
        { src: 'video11.MP4', poster: '11.JPG', title: '' },
        { src: 'video12.MP4', poster: '11.JPG', title: '' },
        { src: 'v21.MP4', poster: '11.JPG', title: '' },
        { src: 'video13.MP4', poster: '11.JPG', title: '' },
        { src: 'video14.MP4', poster: '11.JPG', title: '' },
        { src: 'v22.MP4', poster: '11.JPG', title: '' },
        { src: 'v23.MP4', poster: '11.JPG', title: '' }
    ]
};

// Gallery functionality
class Gallery {
    constructor(type, data) {
        this.type = type;
        this.data = data;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.createGallery();
        this.setupControls();
        this.showItem(0);
    }

    createGallery() {
        const galleryTrack = document.getElementById(`${this.type}Gallery`);
        const thumbnails = document.getElementById(`${this.type}Thumbnails`);
        
        if (!galleryTrack || !thumbnails) return;
        
        galleryTrack.innerHTML = '';
        thumbnails.innerHTML = '';
        
        this.data.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            if (this.type === 'photo') {
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.alt;
                img.onerror = () => { img.src = 'https://via.placeholder.com/800x450?text=Photo'; };
                galleryItem.appendChild(img);
            } else {
                const video = document.createElement('video');
                video.src = item.src;
                video.poster = item.poster;
                video.controls = true;
                video.preload = 'metadata';
                video.style.maxWidth = '100%';
                video.style.maxHeight = '400px';
                galleryItem.appendChild(video);
            }
            
            galleryTrack.appendChild(galleryItem);
            
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            
            if (this.type === 'photo') {
                const thumbImg = document.createElement('img');
                thumbImg.src = item.src;
                thumbImg.alt = item.alt;
                thumbnail.appendChild(thumbImg);
            } else {
                const thumbImg = document.createElement('img');
                thumbImg.src = item.poster;
                thumbImg.alt = 'video thumbnail';
                thumbnail.appendChild(thumbImg);
            }
            
            thumbnail.addEventListener('click', () => this.showItem(index));
            thumbnails.appendChild(thumbnail);
        });
    }

    setupControls() {
        const prevBtn = document.getElementById(`prev${this.type.charAt(0).toUpperCase() + this.type.slice(1)}Btn`);
        const nextBtn = document.getElementById(`next${this.type.charAt(0).toUpperCase() + this.type.slice(1)}Btn`);
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevItem());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextItem());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevItem();
            if (e.key === 'ArrowRight') this.nextItem();
        });
    }

    showItem(index) {
        this.currentIndex = (index + this.data.length) % this.data.length;
        
        const galleryTrack = document.getElementById(`${this.type}Gallery`);
        const thumbnails = document.querySelectorAll(`#${this.type}Thumbnails .thumbnail`);
        
        if (galleryTrack) {
            galleryTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }
        
        thumbnails.forEach((thumb, idx) => {
            thumb.classList.toggle('active', idx === this.currentIndex);
            if (idx === this.currentIndex) {
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
        
        if (this.type === 'video') {
            document.querySelectorAll('#videoGallery video').forEach(video => {
                video.pause();
            });
        }
    }

    prevItem() {
        this.showItem(this.currentIndex - 1);
    }

    nextItem() {
        this.showItem(this.currentIndex + 1);
    }
}

// Инициализация галерей
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('photoGallery')) {
            new Gallery('photo', galleryData.photos);
        }
        if (document.getElementById('videoGallery')) {
            new Gallery('video', galleryData.videos);
        }
    }, 100);
});

// History Show/Hide Functions
function showFullHistory() {
    document.getElementById('historyShort').style.display = 'none';
    document.getElementById('historyFull').style.display = 'block';
}

function hideFullHistory() {
    document.getElementById('historyFull').style.display = 'none';
    document.getElementById('historyShort').style.display = 'block';
}

window.showFullHistory = showFullHistory;
window.hideFullHistory = hideFullHistory;

// Form Validation
function validateForm() {
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';
    const agree = document.getElementById('agree')?.checked || false;
    
    const errors = [];
    
    if (name === '') {
        errors.push('Пожалуйста, введите ваше имя');
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name)) {
        errors.push('Имя должно содержать только буквы');
    } else if (name.length < 2) {
        errors.push('Имя должно содержать не менее 2 символов');
    }
    
    if (email === '') {
        errors.push('Пожалуйста, введите ваш email');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Пожалуйста, введите корректный email адрес');
        }
    }
    
    if (phone === '') {
        errors.push('Пожалуйста, введите ваш телефон');
    } else if (!/^\d+$/.test(phone)) {
        errors.push('Телефон должен содержать только цифры');
    } else if (phone.length !== 11) {
        errors.push('Телефон должен содержать ровно 11 цифр');
    }
    
    if (message === '') {
        errors.push('Пожалуйста, введите ваше сообщение');
    } else if (message.length < 10) {
        errors.push('Сообщение должно содержать не менее 10 символов');
    }
    
    if (!agree) {
        errors.push('Пожалуйста, согласитесь с обработкой персональных данных');
    }
    
    return errors;
}

function showFormErrors(errors) {
    const errorsContainer = document.getElementById('formErrors');
    if (!errorsContainer) return;
    errorsContainer.innerHTML = '';
    
    if (errors.length > 0) {
        errors.forEach(error => {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = error;
            errorsContainer.appendChild(errorElement);
        });
        errorsContainer.classList.add('active');
    }
}

function showFormSuccess(message) {
    const errorsContainer = document.getElementById('formErrors');
    if (!errorsContainer) return;
    errorsContainer.innerHTML = '';
    const successElement = document.createElement('div');
    successElement.className = 'form-success active';
    successElement.textContent = message;
    errorsContainer.appendChild(successElement);
    errorsContainer.classList.add('active');
}

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('formErrors')?.classList.remove('active');
        
        const errors = validateForm();
        if (errors.length > 0) {
            showFormErrors(errors);
            return false;
        }
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim(),
            agree: document.getElementById('agree').checked,
            timestamp: new Date().toISOString(),
            source: 'Mercedes F1 Contact Form'
        };

        fetch('https://formcarry.com/s/TOPOuH54Qma', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка при отправке формы');
            return response.json();
        })
        .then(() => {
            showFormSuccess('Сообщение успешно отправлено! Мы свяжемся с вами.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            setTimeout(() => {
                document.getElementById('formErrors')?.classList.remove('active');
            }, 5000);
        })
        .catch(() => {
            showFormErrors(['Произошла ошибка при отправке. Попробуйте еще раз.']);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            setTimeout(() => {
                document.getElementById('formErrors')?.classList.remove('active');
            }, 5000);
        });
    });
}

// Ограничение ввода для телефона
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').slice(0, 11);
        document.getElementById('formErrors')?.classList.remove('active');
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
        if (window.innerWidth <= 768) {
            document.querySelector('.nav-links')?.classList.remove('active');
        }
    });
});

// Scroll effect for navbar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    }
});

// Scroll to top when clicking on logo
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}