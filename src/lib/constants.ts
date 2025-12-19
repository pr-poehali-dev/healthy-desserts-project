export const BUSINESS_INFO = {
  name: 'Clean Cake',
  address: 'Москва, самовывоз и доставка по городу',
  phone: '+7 (495) 123-45-67',
  email: 'info@pp-coffee.ru',
  workingHours: 'Ежедневно 08:00–22:00',
  workingHoursStart: '08:00',
  workingHoursEnd: '22:00',
};

export const DELIVERY_CONFIG = {
  minOrderAmount: 1000,
  deliveryFee: 350,
  estimatedTime: '30–90 минут',
};

export const CATEGORY_NAMES: Record<string, string> = {
  drinks: 'Напитки',
  desserts: 'Десерты',
  combo: 'Комбо',
  seasonal: 'Сезонное',
};

export const SWEETENER_NAMES: Record<string, string> = {
  none: 'Без подсластителя',
  stevia: 'Стевия',
  erythritol: 'Эритрит',
  'stevia-erythritol': 'Стевия + Эритрит',
};

export const TAG_NAMES: Record<string, string> = {
  'high-protein': 'Высокобелковое',
  'lactose-free': 'Без лактозы',
  vegan: 'Веган',
  'no-added-sugar': 'Без добавленного сахара',
};

export const STATUS_NAMES: Record<string, string> = {
  paid: 'Оплачен',
  preparing: 'Готовится',
  ready: 'Готов',
  completed: 'Выдан',
  'in-transit': 'В пути',
};