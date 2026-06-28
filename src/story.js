// The story — tapped through one scene at a time.
// `bloom` (0..1) drives how open the rose is.
// `sky`   (0..1) drives the world behind it: 0 = deep night, 1 = vibrant day.
// Bulgarian, written child → mother. Keep it tender; let it breathe.

export const scenes = [
  {
    id: 0,
    text: 'Здравей, мамо.',
    bloom: 0.04,
    sky: 0.0,
    hint: true,
  },
  {
    id: 1,
    text: 'Такъв подарък\nникога не си получавала.',
    bloom: 0.08,
    sky: 0.07,
    hint: true,
  },
  {
    id: 2,
    text: 'Преди 51 години,\nна този ден,',
    bloom: 0.16,
    sky: 0.2,
  },
  {
    id: 3,
    text: 'светът стана\nмалко по-светъл.',
    bloom: 0.27,
    sky: 0.37,
  },
  {
    id: 4,
    text: 'Защото се роди ти.',
    bloom: 0.4,
    sky: 0.5,
  },
  {
    id: 5,
    text: 'Жената, която дава всичко\nи не иска нищо в замяна.',
    bloom: 0.52,
    sky: 0.62,
  },
  {
    id: 6,
    text: 'Която ме топлеше,\nкогато светът беше студен.',
    bloom: 0.64,
    sky: 0.72,
  },
  {
    id: 7,
    text: 'Която превръщаше\nсълзите ми в усмивки.',
    bloom: 0.76,
    sky: 0.82,
  },
  {
    id: 8,
    text: 'Мамо, ти си розата,\nкоято ме научи да цъфтя.',
    bloom: 0.88,
    sky: 0.9,
  },
  {
    id: 9,
    text: 'Обичам те.\nБезкрайно и завинаги.',
    bloom: 0.96,
    sky: 0.96,
  },
  {
    id: 10,
    text: 'Честит 51-ви\nрожден ден, мамо!',
    subtitle: 'С цялата ми любов 🌹',
    bloom: 1,
    sky: 1,
    final: true,
  },
]
