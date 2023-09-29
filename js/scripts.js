"use strict";

const myElement = document.getElementById('myElement');

// Задаем высоту элементу

myElement.style.width = `${document.body.clientWidth}px`;
myElement.style.height = `${document.body.clientHeight}px`;

function getRandomVelocity() {
  // return 3; // Случайное значение скорости движения элемента (-3 до 3)
  return (Math.random() - 2) * 3; // Случайное значение скорости движения элемента (-3 до 3)
}

function moveElement(element) {
  // Получаем текущие координаты элемента
  let x = parseFloat(element.style.left) || Math.random() * (document.body.clientWidth - 425);
  let y = parseFloat(element.style.top) || Math.random() * (document.body.clientHeight - 425);

  // Получаем размеры окна браузера
  const maxX = document.body.clientWidth - 425; // Максимальная координата по X (ширина окна минус ширина элемента)
  const maxY = document.body.clientHeight - 425; // Максимальная координата по Y (высота окна минус высота элемента)

  // Получаем текущую скорость элемента
  let velocityX = parseFloat(element.getAttribute('data-velocity-x')) || getRandomVelocity();
  let velocityY = parseFloat(element.getAttribute('data-velocity-y')) || getRandomVelocity();

  // Изменяем координаты элемента на текущую скорость
  x += velocityX;
  y += velocityY;

  // Отталкиваем элемент от стен с учетом ограничений (-50px)
  if (x <= -200 || x >= maxX + 200) {
    velocityX = -velocityX; // Изменяем скорость в противоположную сторону при столкновении со стеной
  }

  if (y <= -200 || y >= maxY + 200) {
    velocityY = -velocityY; // Изменяем скорость в противоположную сторону при столкновении со стеной
  }

  // Обновляем скорость и координаты элемента
  element.setAttribute('data-velocity-x', velocityX);
  element.setAttribute('data-velocity-y', velocityY);
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;

  requestAnimationFrame(() => moveElement(element));
}

const elements = document.querySelectorAll('.moving-element');

// Запуск анимации для каждого элемента
elements.forEach(moveElement);


// Получаем ссылки на элементы абзаца и кнопки
const styleButton = document.getElementById("navbar-toggler");
const paragraph = document.getElementById("navbar-collapse");
const elements2 = document.querySelector(".fa");
const body = document.querySelector(".body");

// Добавляем обработчик события для кнопки
styleButton.addEventListener("click", function () {
  // console.log('asdasd');
  if (elements2.classList.contains('fa-bars')) {
    elements2.classList.remove('fa-bars');
    elements2.classList.add('fa-times');
    paragraph.style.display = "block";
    body.style.overflow = "hidden";
  } else {
    elements2.classList.remove('fa-times');
    elements2.classList.add('fa-bars');
    paragraph.style.display = "none";
    body.style.overflow = "";
  }
});

let cart = document.querySelectorAll('.scrollDown');

for(let i=0; i < cart.length; i++) {
  cart[i].addEventListener("click", function () {
    // console.log('asdasd');
    if (elements2.classList.contains('fa-bars')) {
      elements2.classList.remove('fa-bars');
      elements2.classList.add('fa-times');
      paragraph.style.display = "block";
      body.style.overflow = "hidden";
    } else {
      elements2.classList.remove('fa-times');
      elements2.classList.add('fa-bars');
      paragraph.style.display = "none";
      body.style.overflow = "";
    }
  });
}

let dteNow = new Date();
let intYear = dteNow.getFullYear();

// Получаем ссылку на элемент с идентификатором "copyright"
let copyrightElement = document.getElementById('copyright');

if (copyrightElement) {
  // Получаем текстовое содержимое элемента
  let text = copyrightElement.textContent;

  // Заменяем "CurrentCopyrightYear" на значение переменной intYear
  text = text.replace('CurrentCopyrightYear', intYear);

  // Устанавливаем обновленный текст обратно в элемент
  copyrightElement.textContent = text;
}

document.querySelectorAll('form').forEach(function(form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Отмена стандартной отправки формы
    // Получение ID формы
    var formID = form.getAttribute('id');
    // Добавление решётки к имени ID
    var formNm = document.getElementById(formID);
    var formData = new FormData(formNm);

    // Создание объекта XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Настройка запроса
    xhr.open('POST', 'telegram.php', true);

    // Обработка успешного ответа
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Вывод текста результата отправки
        formNm.innerHTML = xhr.responseText;
      } else {
        // Вывод текста ошибки отправки
        formNm.innerHTML = 'Ошибка: ' + xhr.status;
      }
    };

    // Обработка ошибки запроса
    xhr.onerror = function() {
      formNm.innerHTML = 'Произошла ошибка при отправке запроса.';
    };

    // Отправка данных формы
    xhr.send(formData);
  });
});