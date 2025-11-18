// Данные о продуктах
const products = [
    // Белые схемы
    {
        id: 1,
        title: "Схема Arduino Uno",
        category: "белые схемы",
        price: 199,
        emoji: "�",
        description: "Полная схема подключения и настройки Arduino Uno с примерами кода",
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
        description: "Детальная схема распиновки и подключения Raspberry Pi 4",
        rating: 4.8,
        reviews: 178,
        color: "white"
    },
    {
        id: 3,
        title: "Схема LED матрицы",
        category: "белые схемы",
        price: 149,
        emoji: "�",
        description: "Полная документация по подключению и программированию LED матриц",
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
        description: "Схема подключения и настройки Bluetooth модуля HC-05",
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
        description: "Инструкция по подключению LCD 16x2 дисплея к микроконтроллерам",
        rating: 4.7,
        reviews: 167,
        color: "gray"
    },
    {
        id: 6,
        title: "Схема датчика влажности DHT22",
        category: "серые схемы",
        price: 159,
        emoji: "�",
        description: "Полная документация по использованию датчика влажности и температуры",
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
        description: "Техническая документация и схема архитектуры NVIDIA RTX 4090",
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
        description: "Детальная схема и инструкция по разборке Intel Core i9",
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
        description: "Полная техническая документация и схема материнской платы ASUS ROG",
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

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleContactForm);
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
                <p class="product-details-description">${product.description}</p>
                <div class="product-quantity">
                    <label for="quantity">Количество:</label>
                    <input type="number" id="quantity" class="quantity-input" value="1" min="1">
                </div>
                <button class="btn btn-primary btn-block" onclick="addToCart(${product.id})">
                    Добавить в корзину
                </button>
            </div>
        </div>
    `;

    document.getElementById('productModal').classList.add('show');
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
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        renderCart();
    }
}

// Отрисовка содержимого корзины
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        document.getElementById('totalPrice').textContent = '0';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.title}</div>
                <div>Кол-во: <strong>${item.quantity}</strong></div>
                <div class="cart-item-price">${itemTotal} ₽</div>
            </div>
            <button class="cart-remove" onclick="removeFromCart(${item.id})">Удалить</button>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('totalPrice').textContent = total;
}

// Удаление товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    renderCart();
    showNotification('Товар удален из корзины');
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) {
        showNotification('Корзина пуста!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderSummary = cart.map(item => `${item.title} x${item.quantity}`).join(', ');

    alert(`Заказ оформлен!\n\nТовары: ${orderSummary}\n\nСумма: ${total} ₽\n\nСпасибо за покупку!`);
    
    cart = [];
    saveCartToStorage();
    updateCartCount();
    toggleCart();
    showNotification('Заказ успешно оформлен!');
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
