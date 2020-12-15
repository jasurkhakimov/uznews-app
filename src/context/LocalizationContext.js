import React from 'react';
import * as Localization from 'expo-localization'; // or whatever library you want
import i18n from 'i18n-js';


const ru = {
    news: 'Новости',
    settings: 'Настройки',
    profile: 'Профиль',
    font_size: 'Размер шрифта',
    lang: 'Язык',
    help: 'Помощь',
    callback: 'Обратная связь',
    share: 'Поделиться',
    small: 'маленький',
    medium: 'средний',
    large: 'большой',
    write_us: 'Напишите нам',
    minds: 'Мнения',
    for_you: 'Для вас',
    show_more_news: 'Показать больше новостей',
    other_minds: 'Другие мнения',
    categories: 'Категории',
    about_project: 'О проекте',
    contacts: 'Контакты',
    search: 'Поиск',
    use_of_meterials: 'Использование материалов',
    terms_of_use: 'Условия использования',
    private_policy: 'Политика конфиденциальности',
    adv: 'Реклама',
    find: 'Найти',
    clear: 'Очистить',
    internal_error: 'Произошла внутренняя ошибка, повторите позже',
    please_enter_text: 'Пожайлуста введите текст поиска',
    send_news: 'Присласть новость',
    history: 'История',
    bookmark: 'Закладки',
    january: 'Января',
    february: 'Февраля',
    march: 'Марта',
    april: 'Апреля',
    may: 'Мая',
    june: 'Июня',
    july: 'Июля',
    august: 'Августа',
    september: 'Сентября',
    october: 'Октября',
    novermber: 'Ноября',
    december: 'Декабря',
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    satturday: 'Суббота',
    sunday: 'Воскресенье',
}

const uz = {
    news: 'Янгиликлар',
    settings: 'Созламалар',
    profile: 'Профил',
    font_size: 'Шрифт хажми',
    lang: 'Тил',
    help: 'Ёрдам',
    callback: 'Кайта алока',
    share: 'Баҳам кўринг',
    small: 'кичик',
    medium: 'орта',
    large: 'катта',
    write_us: 'Бизга езинг',
    minds: 'Фикирлар',
    for_you: 'Сиз учун',
    show_more_news: 'Копрок янгиликлар курсатиш',
    other_minds: 'Бошка фикирлар',
    categories: 'Категориялар',
    about_project: 'Проект тугрисида',
    contacts: 'Контактлар',
    search: 'Кидирув',
    use_of_meterials: 'МАТЕРИАЛЛАРДАН ФОЙДАЛАНИШ',
    terms_of_use: 'Условия использования',
    private_policy: 'МАХФИЙЛИК СИЁСАТИ',
    adv: 'Реклама',
    find: 'Топиш',
    clear: 'Тозалаш',
    internal_error: 'Произошла внутренняя ошибка, повторите позже',
    please_enter_text: 'Пожайлуста введите текст поиска',
    send_news: 'Янгилик ювориш',
    history: 'История',
    bookmark: 'Закладки',
    january: 'Января',
    february: 'Февраля',
    march: 'Марта',
    april: 'Апреля',
    may: 'Мая',
    june: 'Июня',
    july: 'Июля',
    august: 'Августа',
    september: 'Сентября',
    october: 'Октября',
    novermber: 'Ноября',
    december: 'Декабря',
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    satturday: 'Суббота',
    sunday: 'Воскресенье',


}



i18n.translations = {
    ru,
    uz
};
// Set the locale once at the beginning of your app.
i18n.locale = 'ru';
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;


export default LocalizationContext = React.createContext();

