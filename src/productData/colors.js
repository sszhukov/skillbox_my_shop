const colors = [
  {
    id: 1,
    title: 'Чёрный',
    code: '#000000',
  },
  {
    id: 2,
    title: 'Серый',
    code: '#939393',
  },
  {
    id: 3,
    title: 'Белый',
    code: '#FFFFFF',
  },
  {
    id: 4,
    title: 'Голубой',
    code: '#73B6EA',
  },
  {
    id: 5,
    title: 'Синий',
    code: '#004A9C',
  },
  {
    id: 6,
    title: 'Зелёный',
    code: '#8BE000',
  },
  {
    id: 7,
    title: 'Красный',
    code: '#F9301E',
  },
  {
    id: 8,
    title: 'Жёлтый',
    code: '#FFBE15',
  },
  {
    id: 9,
    title: 'Красно-синий',
    codes: ['#004A9C', '#F9301E'],
  },
];

export default function (colorIds) {
  if (colorIds && colorIds.length > 0) {
    return colors.filter((color) => colorIds.find((id) => id === color.id));
  }
  return colors;
}
