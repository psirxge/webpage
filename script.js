// Данные о продуктах
const products = [
    // Белые схемы
    {
        id: 1,
        title: "Схема Arduino Uno",
        category: "белые схемы",
        price: 199,
        emoji: "🔌",
        description: "Полная схема подключения Arduino Uno",
        fullDescription: "Полная схема подключения и настройки Arduino Uno с примерами кода, диаграммами и подробными инструкциями по программированию для начинающих и опытных пользователей.",
        rating: 4.9,
        reviews: 234,
        color: "white"
    },
    {
        id: 2,
        title: "Схема Raspberry Pi 4",
        category: "белые схемы",
        price: 249,
        emoji: "🎛️",
        description: "Схема распиновки Raspberry Pi 4",
        fullDescription: "Детальная схема распиновки и подключения Raspberry Pi 4, включая все GPIO, подключение периферии, рекомендации по питанию и охлаждению.",
        rating: 4.8,
        reviews: 178,
        color: "white"
    },
    {
        id: 3,
        title: "Схема LED матрицы",
        category: "белые схемы",
        price: 149,
        emoji: "💡",
        description: "Подключение LED матриц",
        fullDescription: "Полная документация по подключению и программированию LED матриц, управлению яркостью, созданию эффектов и интеграции с микроконтроллерами.",
        rating: 4.7,
        reviews: 156,
        color: "white"
    },
    // Серые схемы
    {
        id: 4,
        title: "Схема Bluetooth модуля HC-05",
        category: "серые схемы",
        price: 179,
        emoji: "📡",
        description: "Подключение Bluetooth модуля HC-05",
        fullDescription: "Схема подключения и настройки Bluetooth модуля HC-05 для беспроводной связи, команды AT, прошивка и примеры для различных платформ.",
        rating: 4.8,
        reviews: 145,
        color: "gray"
    },
    {
        id: 5,
        title: "Схема LCD дисплея",
        category: "серые схемы",
        price: 189,
        emoji: "📺",
        description: "Подключение LCD дисплея",
        fullDescription: "Инструкция по подключению LCD 16x2 дисплея к микроконтроллерам, программирование символов, примеры кода на Arduino и Python.",
        rating: 4.7,
        reviews: 167,
        color: "gray"
    },
    {
        id: 6,
        title: "Схема датчика влажности DHT22",
        category: "серые схемы",
        price: 159,
        emoji: "💧",
        description: "Датчик влажности и температуры",
        fullDescription: "Полная документация по использованию датчика влажности и температуры DHT22, калибровка, коррекция ошибок и интеграция с системами мониторинга.",
        rating: 4.9,
        reviews: 189,
        color: "gray"
    },
    // Черные схемы
    {
        id: 7,
        title: "Схема GPU NVIDIA RTX 4090",
        category: "чёрные схемы",
        price: 399,
        emoji: "⚡",
        description: "Архитектура NVIDIA RTX 4090",
        fullDescription: "Техническая документация и схема архитектуры NVIDIA RTX 4090, характеристики CUDA ядер, TensorCore, оптимизация для DLSS и машинного обучения.",
        rating: 4.9,
        reviews: 312,
        color: "black"
    },
    {
        id: 8,
        title: "Схема процессора Intel Core i9",
        category: "чёрные схемы",
        price: 349,
        emoji: "🔧",
        description: "Архитектура Intel Core i9",
        fullDescription: "Детальная схема и инструкция по разборке Intel Core i9, архитектура ядер, кэш-иерархия, требования к охлаждению и оверклокингу.",
        rating: 4.8,
        reviews: 278,
        color: "black"
    },
    {
        id: 9,
        title: "Схема материнской платы ASUS ROG",
        category: "чёрные схемы",
        price: 299,
        emoji: "⚙️",
        description: "Материнская плата ASUS ROG",
        fullDescription: "Полная техническая документация и схема материнской платы ASUS ROG, разъёмы, система питания, BIOS настройки и подводка жидкого охлаждения.",
        rating: 4.9,
        reviews: 295,
        color: "black"
    }
];

// Корзина
let cart = [];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
    loadCartFromStorage();
    updateAuthUI();
});

// Загрузка корзины из localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Сохранение корзины в localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Установка слушателей событий
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const contactForm = document.getElementById('contactForm');

    // Эти элементы есть только на странице каталога
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    // Форма контактов есть только на странице about.html
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

// Отрисовка продуктов
function renderProducts(productsToRender) {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    if (productsToRender.length === 0) {
        productsList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Мануалы не найдены</p>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">${product.price} ₽</div>
                </div>
            </div>
            <button class="add-to-cart-btn" onclick="openProductModal(${product.id})">Подробнее</button>
        `;
        productsList.appendChild(productCard);
    });
}

// Открытие модального окна товара
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = `
        <div class="product-details-container">
            <div class="product-details-image">${product.emoji}</div>
            <div class="product-details-info">
                <div class="product-details-category">${product.category}</div>
                <h3>${product.title}</h3>
                <div class="product-details-price">${product.price} ₽</div>
                <div class="product-rating">⭐ ${product.rating} (${product.reviews} отзывов)</div>
                <p class="product-details-description">${product.fullDescription}</p>
                <div class="product-quantity">
                    <label for="quantity">Количество:</label>
                    <input type="number" id="quantity" class="quantity-input" value="1" min="1">
                </div>
                <button class="btn btn-primary btn-block" onclick="buyProduct(${product.id})">
                    Оформить заказ
                </button>
            </div>
        </div>
    `;

    document.getElementById('productModal').classList.add('show');
}

// Функция для оформления заказа напрямую
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const currentUser = getCurrentUser();

    if (!currentUser) {
        showNotification('Пожалуйста, войдите в аккаунт для покупки', 'error');
        closeProductModal();
        openAuthModal();
        return;
    }

    // Добавляем товар в корзину
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    // Оформляем заказ
    checkout();
    closeProductModal();
}

// Закрытие модального окна товара
function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
}

// Фильтрация продуктов
function filterProducts() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const categoryValue = document.getElementById('categoryFilter').value;

    const filtered = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchValue) ||
                            product.description.toLowerCase().includes(searchValue);
        const matchesCategory = categoryValue === '' || product.category === categoryValue;
        return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
}

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    saveCartToStorage();
    updateCartCount();
    closeProductModal();
    showNotification('Товар добавлен в корзину!');
}

// Обновление счетчика корзины
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Переключение видимости корзины
// ФУНКЦИЯ УДАЛЕНА: корзина больше не используется

// Отрисовка содержимого корзины
// ФУНКЦИЯ УДАЛЕНА: корзина больше не используется

// Удаление товара из корзины
// ФУНКЦИЯ УДАЛЕНА: корзина больше не используется

// Оформление заказа
function checkout() {
    if (cart.length === 0) {
        showNotification('Корзина пуста!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderSummary = cart.map(item => `${item.title} x${item.quantity}`).join(', ');

    // Если пользователь авторизован, сохраняем покупку
    const currentUser = getCurrentUser();
    if (currentUser) {
        const accounts = JSON.parse(localStorage.getItem('accounts') || '{}');
        
        // Инициализируем массивы если их нет
        if (!accounts[currentUser].purchases) {
            accounts[currentUser].purchases = [];
        }
        if (!accounts[currentUser].purchasedItems) {
            accounts[currentUser].purchasedItems = [];
        }

        // Добавляем запись о покупке в историю
        accounts[currentUser].purchases.push({
            date: new Date().toISOString(),
            items: orderSummary,
            total: total
        });

        // Добавляем каждый товар в массив купленных товаров
        cart.forEach(item => {
            accounts[currentUser].purchasedItems.push({
                id: item.id,
                title: item.title,
                category: item.category,
                price: item.price,
                emoji: item.emoji,
                description: item.description,
                purchaseDate: new Date().toISOString()
            });
        });

        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    alert(`Заказ оформлен!\n\nТовары: ${orderSummary}\n\nСумма: ${total} ₽\n\nСпасибо за покупку!`);
    
    cart = [];
    saveCartToStorage();
    showNotification('Заказ успешно оформлен! Товары добавлены в ваш профиль.');
}

// Обработка формы контактов
function handleContactForm(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const message = form.elements[2].value;

    console.log('Получено сообщение:', { name, email, message });
    
    showNotification(`Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами на ${email}`);
    form.reset();
}

// Уведомления
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Закрытие модалей при клике вне них
window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    const productModal = document.getElementById('productModal');

    if (event.target === cartModal) {
        cartModal.classList.remove('show');
    }
    if (event.target === productModal) {
        productModal.classList.remove('show');
    }
};

// Crystal Slider
let currentCrystalIndex = 0;

const crystalData = [
    {
        title: "Белый Кристал",
        description: "Символ света и чистоты. Белый кристал излучает божественное сияние, подобно солнцу. Его сияние олицетворяет надежду и просветление, озаряя мир чистотой и добротой.",
        stats: [100, 95, 85]
    },
    {
        title: "Серый Кристал",
        description: "Воплощение баланса и стабильности. Серый кристал излучает равномерную энергию, создавая волны гармонии. Его спокойствие помогает найти внутренний мир и ясность в любой ситуации.",
        stats: [80, 90, 95]
    },
    {
        title: "Чёрный Кристал",
        description: "Источник глубокой мощи и мистики. Чёрный кристал горит чёрным пламенем, символизирующим трансформацию и возрождение. Из его темноты рождается новая энергия и бесконечные возможности.",
        stats: [75, 85, 100]
    }
];

function updateCrystalSlider(index) {
    const items = document.querySelectorAll('.crystal-item');
    const dots = document.querySelectorAll('.dot');
    
    items.forEach((item, i) => {
        item.classList.remove('active');
        if (i === index) {
            item.classList.add('active');
        }
    });
    
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
    
    // Update description
    const data = crystalData[index];
    document.getElementById('crystalTitle').textContent = data.title;
    document.getElementById('crystalDesc').textContent = data.description;
    
    // Update stats
    const statFills = document.querySelectorAll('.stat-fill');
    statFills.forEach((fill, i) => {
        fill.style.width = data.stats[i] + '%';
    });
}

function nextCrystal() {
    currentCrystalIndex = (currentCrystalIndex + 1) % 3;
    updateCrystalSlider(currentCrystalIndex);
}

function prevCrystal() {
    currentCrystalIndex = (currentCrystalIndex - 1 + 3) % 3;
    updateCrystalSlider(currentCrystalIndex);
}

function goToCrystal(index) {
    currentCrystalIndex = index;
    updateCrystalSlider(currentCrystalIndex);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextCrystal();
    } else if (e.key === 'ArrowLeft') {
        prevCrystal();
    }
});

// ===== СИСТЕМА АККАУНТОВ =====

// Получение текущего пользователя
function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

// Установка текущего пользователя
function setCurrentUser(email) {
    localStorage.setItem('currentUser', email);
    updateAuthUI();
}

// Выход из аккаунта
function logout() {
    localStorage.removeItem('currentUser');
    updateAuthUI();
    window.location.href = 'index.html';
}

// Регистрация нового пользователя
function registerUser(email, password) {
    // Получаем все аккаунты
    let accounts = JSON.parse(localStorage.getItem('accounts') || '{}');
    
    // Проверяем, не существует ли уже такой email
    if (accounts[email]) {
        showNotification('Этот email уже зарегистрирован', 'error');
        return false;
    }
    
    // Сохраняем новый аккаунт
    accounts[email] = {
        password: password,
        createdAt: new Date().toISOString(),
        purchases: [],
        purchasedItems: []
    };
    
    localStorage.setItem('accounts', JSON.stringify(accounts));
    setCurrentUser(email);
    showNotification('Аккаунт успешно создан!');
    closeAuthModal();
    
    // Перенаправляем на профиль
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1000);
    
    return true;
}

// Вход в аккаунт
function loginUser(email, password) {
    const accounts = JSON.parse(localStorage.getItem('accounts') || '{}');
    
    if (!accounts[email]) {
        showNotification('Пользователь не найден', 'error');
        return false;
    }
    
    if (accounts[email].password !== password) {
        showNotification('Неверный пароль', 'error');
        return false;
    }
    
    setCurrentUser(email);
    showNotification('Вы успешно вошли в аккаунт!');
    closeAuthModal();
    
    // Перенаправляем на профиль
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1000);
    
    return true;
}

// Открытие модального окна авторизации
function openAuthModal() {
    document.getElementById('authModal').classList.add('show');
    showLoginForm();
}

// Закрытие модального окна авторизации
function closeAuthModal() {
    document.getElementById('authModal').classList.remove('show');
}

// Показ формы регистрации
function showRegisterForm() {
    const authContent = document.getElementById('authContent');
    authContent.innerHTML = `
        <h2>Регистрация</h2>
        <form id="registerForm" class="auth-form">
            <input type="email" id="registerEmail" class="auth-input" placeholder="Email" required>
            <input type="password" id="registerPassword" class="auth-input" placeholder="Пароль" required>
            <input type="password" id="registerPasswordConfirm" class="auth-input" placeholder="Подтвердите пароль" required>
            <button type="submit" class="btn btn-primary btn-block">Зарегистрироваться</button>
        </form>
        <p class="auth-toggle">Уже есть аккаунт? <a href="#" onclick="showLoginForm(); return false;">Войти</a></p>
    `;
    
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
        
        if (password !== passwordConfirm) {
            showNotification('Пароли не совпадают', 'error');
            return;
        }
        
        if (password.length < 3) {
            showNotification('Пароль должен быть не менее 3 символов', 'error');
            return;
        }
        
        registerUser(email, password);
    });
}

// Показ формы входа
function showLoginForm() {
    const authContent = document.getElementById('authContent');
    authContent.innerHTML = `
        <h2>Вход</h2>
        <form id="loginForm" class="auth-form">
            <input type="email" id="loginEmail" class="auth-input" placeholder="Email" required>
            <input type="password" id="loginPassword" class="auth-input" placeholder="Пароль" required>
            <button type="submit" class="btn btn-primary btn-block">Войти</button>
        </form>
        <p class="auth-toggle">Нет аккаунта? <a href="#" onclick="showRegisterForm(); return false;">Регистрация</a></p>
    `;
    
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        loginUser(email, password);
    });
}

// Обновление UI в зависимости от статуса авторизации
function updateAuthUI() {
    const currentUser = getCurrentUser();
    const authButton = document.getElementById('authButton');
    
    if (!authButton) return;
    
    // Полностью переделываем кнопку авторизации
    if (currentUser) {
        authButton.textContent = '👤 ' + currentUser.split('@')[0];
        authButton.onclick = function() {
            window.location.href = 'profile.html';
        };
    } else {
        authButton.textContent = '🔐 Вход';
        authButton.onclick = function() {
            openAuthModal();
        };
    }
}
