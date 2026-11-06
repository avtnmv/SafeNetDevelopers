export const chatMessages = [
  {
    at: 1400,
    side: 'incoming',
    text: 'Привіт! Хочу зробити сайт для свого бізнесу. Скільки це буде коштувати?',
  },
  {
    at: 3800,
    side: 'outgoing',
    text: 'Вітаємо! А можете скинути приклад сайту, який вам подобається?',
  },
  { at: 5600, side: 'incoming', text: 'Так, ось щось схоже хочу' },
  { at: 6700, side: 'incoming', text: 'example.com', card: true },
  {
    at: 9400,
    side: 'outgoing',
    text: 'Подивились приклад. Такий сайт зробимо за 3 дні, вартість — $300.',
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
