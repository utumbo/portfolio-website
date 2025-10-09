// Навигация по командам
// Находим ВСЕ элементы с классом 'command-item' (все команды в навигации)
document.querySelectorAll('.command-item').forEach(item => {
    // Для КАЖДОЙ команды добавляем обработчик события клика
    item.addEventListener('click', function() {
        // Получаем значение атрибута 'data-target' (например: "about", "skills")
        const target = this.getAttribute('data-target');
        
        // Скрыть все секции контента
        // Находим ВСЕ элементы с классом 'content-box' (все секции)
        document.querySelectorAll('.content-box').forEach(section => {
            // Убираем класс 'active' у каждой секции (скрываем их)
            section.classList.remove('active');
        });
        
        // Показать выбранную секцию
        // Находим секцию с ID соответствующим target (например: id="about")
        const targetSection = document.getElementById(target);
        // Проверяем, что секция существует
        if (targetSection) {
            // Добавляем класс 'active' чтобы показать секцию
            targetSection.classList.add('active');
        }
        
        // Эффект активации команды (визуальная обратная связь)
        // Временно меняем фон команды на розовый
        this.style.background = 'rgba(255, 0, 255, 0.3)';
        // Временно меняем цвет рамки команды на неоново-розовый
        this.style.borderColor = 'var(--neon-pink)';
        
        // Через 500 миллисекунд (полсекунды) возвращаем исходные стили
        setTimeout(() => {
            // Возвращаем прозрачный фон (убираем нашу временную установку)
            this.style.background = '';
            // Возвращаем прозрачную рамку (убираем нашу временную установку)
            this.style.borderColor = '';
        }, 500);
    });
});

// Случайные глитч-эффекты (дрожание экрана)
// Запускаем функцию каждые 5000 миллисекунд (5 секунд)
setInterval(() => {
    // С вероятностью 30% (Math.random() > 0.7) запускаем глитч-эффект
    if (Math.random() > 0.7) {
        // Случайно сдвигаем всю страницу по X и Y на -2 до +2 пикселей
        document.body.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        
        // Через 100 миллисекунд возвращаем страницу на место
        setTimeout(() => {
            // Убираем трансформацию (возвращаем в исходное положение)
            document.body.style.transform = 'translate(0, 0)';
        }, 100);
    }
}, 5000);

// Эффект печатающего текста для нового контента
// Создаем "наблюдателя" за изменениями в DOM
const observer = new MutationObserver((mutations) => {
    // Для КАЖДОГО изменения в DOM
    mutations.forEach((mutation) => {
        // Если изменение - добавление/удаление дочерних элементов
        if (mutation.type === 'childList') {
            // Для КАЖДОГО нового добавленного элемента
            mutation.addedNodes.forEach((node) => {
                // Проверяем что это HTML-элемент (не текст) И у него есть класс 'active'
                if (node.nodeType === 1 && node.classList.contains('active')) {
                    // Добавляем анимацию появления для нового активного контента
                    node.style.animation = 'fadeIn 0.5s ease';
                }
            });
        }
    });
});

// Начинаем наблюдать за изменениями в блоке с классом 'content-section'
observer.observe(document.querySelector('.content-section'), {
    childList: true,    // Следим за добавлением/удалением дочерних элементов
    subtree: true       // Следим за изменениями во ВСЕХ вложенных элементах
});

// Инициализация - показать первую секцию при загрузке страницы
// Ждем когда весь HTML документ полностью загрузится и будет готов
document.addEventListener('DOMContentLoaded', function() {
    // Находим ПЕРВЫЙ элемент с классом 'content-box' и делаем его активным
    document.querySelector('.content-box').classList.add('active');
});