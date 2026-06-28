// The story — tapped through one scene at a time.
// `bloom` (0..1) drives how open the rose is.
// `sky`   (0..1) drives the world behind it: 0 = deep night, 1 = vibrant day.
// Bulgarian, child → mother. A 19-year-old leaving for university.

export const scenes = [
  { id: 0, text: 'Здравей, мамо.', bloom: 0.03, sky: 0.0, hint: true },
  {
    id: 1,
    text: 'Такъв подарък\nникога не си получавала.',
    bloom: 0.06,
    sky: 0.05,
    hint: true,
  },
  {
    id: 2,
    text: 'Затова го създадох\nсъс собствените си ръце —\nи с цялото си сърце.',
    bloom: 0.1,
    sky: 0.11,
  },
  {
    id: 3,
    text: 'Преди 51 години,\nна този ден,\nсветът получи теб.',
    bloom: 0.15,
    sky: 0.19,
  },
  {
    id: 4,
    text: 'И оттогава\nе малко по-светъл.',
    bloom: 0.21,
    sky: 0.28,
  },
  {
    id: 5,
    text: 'Ти ми подари живот.\nА след това —\nвсичко останало.',
    bloom: 0.28,
    sky: 0.36,
  },
  {
    id: 6,
    text: 'Безсънните нощи.\nПремълчаните тревоги.',
    bloom: 0.35,
    sky: 0.44,
  },
  {
    id: 7,
    text: 'Хилядите жертви,\nза които никога\nне поиска благодарност.',
    bloom: 0.43,
    sky: 0.52,
  },
  {
    id: 8,
    text: 'Помниш ли малкото дете,\nкоето носеше на ръце?',
    bloom: 0.51,
    sky: 0.59,
  },
  {
    id: 9,
    text: 'То порасна, мамо.',
    bloom: 0.59,
    sky: 0.65,
  },
  {
    id: 10,
    text: 'Заминавам\nза университета.',
    bloom: 0.67,
    sky: 0.71,
  },
  {
    id: 11,
    text: 'Най-голямата стъпка\nв живота ми досега.',
    bloom: 0.74,
    sky: 0.77,
  },
  {
    id: 12,
    text: 'Страх ме е.\nНо знам, че ще успея —\nзащото ти ме научи как.',
    bloom: 0.81,
    sky: 0.83,
  },
  {
    id: 13,
    text: 'Без теб и без татко\nнямаше да съм никой.',
    bloom: 0.88,
    sky: 0.89,
  },
  {
    id: 14,
    text: 'Вие сте корените.\nАз съм цветето,\nразцъфтяло от вашата обич.',
    bloom: 0.95,
    sky: 0.95,
  },
  {
    id: 15,
    text: 'Честит 51-ви\nрожден ден, мамо!',
    subtitle: 'Обичам те безкрайно 🌹',
    bloom: 1,
    sky: 1,
    final: true,
  },
]
