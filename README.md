# Car SPA

## Single Page Application на React + TypeScript с функционалом просмотра, сортировки, фильтрации, редактирования и удаления автомобилей, а также отображением их на интерактивной карте.

### Стек технологий

React + TypeScript

React Leaflet + Leaflet для карты

Sass (SCSS) + CSS Modules для стилизации компонентов

react-toastify для уведомлений

Webpack + ts-loader + sass-loader для сборки

### Реализовано

1) Просмотр списка автомобилей

2) Вывод в табличном виде (CarList)

Сортировка и фильтрация (SortControls)

Поиск по названию и модели

Редактирование автомобиля (CarEditor)

Модальное окно с формой

Валидация: имя не пустое, цена > 0

Автофокус на поле Name

Закрытие по Escape

ARIA-доступность (role, aria-*)

Удаление автомобиля

Кнопка Delete с подтверждением

Карта (MapView)

Отображение всех автомобилей маркерами

Фокусировка и открытие popup при клике на модель в таблице

Уведомления

react-toastify для успеха/ошибки запросов

### Запуск

1) Клонировать репозиторий:
```bash
git clone https://github.com/japusta/car-spa.git
cd car-spa
```

2) Установить зависимости
```bash
npm install
```

3) ЗАпуск локально
```bash
npm run start
``
