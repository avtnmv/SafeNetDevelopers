export const chatMessages = [
  {
    at: 1400,
    side: 'incoming',
    text: 'Привіт! Хочу зробити сайт для свого бізнесу. Скільки це буде коштувати?',
  },
  {
    at: 3800,
    side: 'outgoing',
    text: 'Такий сайт — $300, готовий за 3 дні. Хочете, за 15 хвилин складу структуру і назву точну ціну?',
  },
  { at: 5600, side: 'incoming', text: 'Так, потрібен лендінг для моїх послуг.' },
  { at: 6700, side: 'incoming', text: 'Щоб заявки надходили в Telegram.' },
  {
    at: 9400,
    side: 'outgoing',
    text: 'Домовились: структура, тексти, дизайн, заявки в Telegram і перевірка безпеки. Фіксуємо $300 у договорі.',
  },
  { at: 11400, side: 'incoming', text: 'О, супер! Давайте робити)' },
  { at: 13300, side: 'outgoing', text: 'Домовились, беремо в роботу 👍' },
  { at: 15000, side: 'divider', text: 'Через 3 дні' },
  { at: 17300, side: 'outgoing', text: 'Олександре, сайт готовий! Можете подивитись 👇' },
  { at: 18400, side: 'outgoing', text: 'Переглянути сайт', domain: 'yourwebsite.com', card: true },
  { at: 20900, side: 'incoming', text: 'Вау, дуже круто вийшло! Саме те, що хотів 🔥' },
  { at: 23000, side: 'incoming', text: 'Все супер, залишок скинув)' },
] as const;
export const chatProfile = { name: 'Олександр', initial: 'О', avatar: '' };
export const chatTimeline = chatMessages.flatMap((message, index) => [
  ...(message.side === 'divider'
    ? []
    : [{ at: Math.max(0, message.at - 850), index, typing: true }]),
  { at: message.at, index, typing: false },
]);
