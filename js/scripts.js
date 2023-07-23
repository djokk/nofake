"use strict";

const myElement = document.getElementById('myElement');

// Задаем высоту элементу

myElement.style.width = `${document.body.clientWidth}px`;
myElement.style.height = `${document.body.clientHeight}px`;

function getRandomVelocity() {
  return (Math.random() - 0.5) * 3; // Случайное значение скорости движения элемента (-3 до 3)
}

function getRandomDirection() {
  return Math.random() < 0.5 ? -1 : 1; // Случайное направление движения элемента (влево или вправо)
}

function moveElement(element) {
  // Получаем текущие координаты элемента
  let x = parseFloat(element.style.left) || Math.random() * (window.innerWidth - 30);
  let y = parseFloat(element.style.top) || Math.random() * (window.innerHeight - 30);

  // Получаем размеры окна браузера
  const maxX = window.innerWidth - 30; // Максимальная координата по X (ширина окна минус ширина элемента)
  const maxY = window.innerHeight - 30; // Максимальная координата по Y (высота окна минус высота элемента)

  // Получаем текущую скорость и направление движения элемента
  let velocityX = parseFloat(element.getAttribute('data-velocity-x')) || getRandomVelocity();
  let velocityY = parseFloat(element.getAttribute('data-velocity-y')) || getRandomVelocity();
  let directionX = parseFloat(element.getAttribute('data-direction-x')) || getRandomDirection();
  let directionY = parseFloat(element.getAttribute('data-direction-y')) || getRandomDirection();

  // Изменяем координаты элемента на текущую скорость и направление
  x += velocityX * directionX;
  y += velocityY * directionY;

  // Отталкиваем элемент от стен с учетом ограничений (-200px)
  if (x <= -15 || x >= maxX + 15) {
    directionX = -directionX; // Изменяем направление движения в противоположную сторону при столкновении со стеной
  }

  if (y <= -15 || y >= maxY + 15) {
    directionY = -directionY; // Изменяем направление движения в противоположную сторону при столкновении со стеной
  }

  // Обновляем скорость и направление движения элемента
  element.setAttribute('data-velocity-x', velocityX);
  element.setAttribute('data-velocity-y', velocityY);
  element.setAttribute('data-direction-x', directionX);
  element.setAttribute('data-direction-y', directionY);
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;

  requestAnimationFrame(() => moveElement(element));
}

const elements = document.querySelectorAll('.moving-element');

// Запуск анимации для каждого элемента
elements.forEach(moveElement);

