import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import Cart, { CartItem } from "@/components/Cart";
import { useState } from "react";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const desserts = [
    {
      id: 1,
      name: "Черничный чизкейк",
      description: "Нежный творожный десерт с черникой на овсяной основе",
      calories: 180,
      price: 350,
      image: "https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/f1055de5-4d98-4179-8918-07e452860055.jpg"
    },
    {
      id: 2,
      name: "Шоколадный брауни",
      description: "Влажный брауни из цельнозерновой муки с горьким шоколадом",
      calories: 220,
      price: 320,
      image: "https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/8348df95-6912-44bb-bc32-8baed1990336.jpg"
    },
    {
      id: 3,
      name: "Ягодный тарт",
      description: "Хрустящее тесто с кремом из греческого йогурта и свежими ягодами",
      calories: 195,
      price: 380,
      image: "https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/cbfb7939-978a-4ed4-8e6c-f1cfda53c5a6.jpg"
    },
    {
      id: 4,
      name: "Морковный кекс",
      description: "Ароматный кекс с морковью, орехами и корицей",
      calories: 210,
      price: 290,
      image: "https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/f1055de5-4d98-4179-8918-07e452860055.jpg"
    }
  ];

  const benefits = [
    {
      icon: "Leaf",
      title: "Натуральные ингредиенты",
      description: "Только проверенные продукты без искусственных добавок"
    },
    {
      icon: "Flame",
      title: "Низкая калорийность",
      description: "От 180 до 250 ккал — вкусно без вреда для фигуры"
    },
    {
      icon: "Clock",
      title: "Быстрая доставка",
      description: "Привезем заказ за 60 минут по Москве"
    },
    {
      icon: "Award",
      title: "Доступные цены",
      description: "ПП-десерты без переплаты за бренд"
    }
  ];

  const reviews = [
    {
      name: "Анна К.",
      text: "Наконец-то нашла место, где можно купить десерты без чувства вины! Чизкейк просто невероятный.",
      rating: 5
    },
    {
      name: "Дмитрий М.",
      text: "Отличная кофейня рядом с работой. Беру брауни каждый день — вкусно и не вредит тренировкам.",
      rating: 5
    },
    {
      name: "Елена С.",
      text: "Заказывала доставку для офиса. Коллеги в восторге! Десерты красивые и действительно полезные.",
      rating: 5
    }
  ];

  const addToCart = (dessert: typeof desserts[0]) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === dessert.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === dessert.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...dessert, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Coffee" size={28} className="text-primary" />
            <span className="text-2xl font-bold text-foreground">ПП-Кофейня</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">О нас</a>
            <a href="#delivery" className="text-foreground hover:text-primary transition-colors">Доставка</a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>

          <Button 
            variant="outline" 
            size="icon"
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <Icon name="ShoppingCart" size={20} />
            {totalCartItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {totalCartItems}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="w-fit">Здоровое питание в Москве</Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Вкусные десерты без вреда фигуре
              </h1>
              <p className="text-xl text-muted-foreground">
                Наши ПП-пирожные доказывают: полезное может быть по-настоящему вкусным. 
                От 180 ккал и только натуральные ингредиенты.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg" onClick={() => setCartOpen(true)}>
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Сделать заказ
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  <Icon name="MapPin" size={20} className="mr-2" />
                  Приехать в кофейню
                </Button>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/cbfb7939-978a-4ed4-8e6c-f1cfda53c5a6.jpg"
                  alt="ПП-десерты"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon name="Star" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">4.9 из 5</div>
                    <div className="text-sm text-muted-foreground">320+ отзывов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center space-y-3">
                  <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                    <Icon name={benefit.icon as any} size={28} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <Badge className="mb-2">Наши десерты</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Каталог ПП-пирожных</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Каждый десерт создан с заботой о вашем здоровье и вкусовых предпочтениях
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {desserts.map((dessert, index) => (
              <Card key={dessert.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={dessert.image}
                    alt={dessert.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold">{dessert.name}</h3>
                    <Badge variant="secondary" className="shrink-0">
                      {dessert.calories} ккал
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {dessert.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-primary">{dessert.price} ₽</span>
                    <Button onClick={() => addToCart(dessert)}>
                      <Icon name="Plus" size={16} className="mr-1" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge>О нас</Badge>
              <h2 className="text-4xl md:text-5xl font-bold">Миссия нашей кофейни</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Мы создали ПП-Кофейню, чтобы показать: полезные десерты могут быть 
                  по-настоящему вкусными и доступными каждому.
                </p>
                <p>
                  Наша команда кондитеров работает только с натуральными ингредиентами — 
                  цельнозерновая мука, греческий йогурт, свежие фрукты и ягоды. 
                  Никаких искусственных добавок, только польза и вкус.
                </p>
                <p>
                  Мы верим, что правильное питание — это не ограничения, а разумный выбор. 
                  Поэтому каждый наш десерт — это баланс калорий, белков и натуральных сахаров.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">года на рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">5000+</div>
                  <div className="text-sm text-muted-foreground">довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">30+</div>
                  <div className="text-sm text-muted-foreground">видов десертов</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/f1055de5-4d98-4179-8918-07e452860055.jpg"
                  alt="Интерьер кофейни"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img 
                  src="https://cdn.poehali.dev/projects/0a10f257-8540-43f3-9040-8eb08412cb99/files/8348df95-6912-44bb-bc32-8baed1990336.jpg"
                  alt="Процесс приготовления"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <Badge>Отзывы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Что говорят наши клиенты</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                  <div className="font-semibold">{review.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <Badge>Доставка</Badge>
              <h2 className="text-4xl md:text-5xl font-bold">Доставка и оплата</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Icon name="Truck" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Условия доставки</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                      <span>Доставка по Москве в пределах МКАД — 250 ₽</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                      <span>Бесплатная доставка при заказе от 1500 ₽</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                      <span>Среднее время доставки — 60 минут</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                      <span>Самовывоз из кофейни — бесплатно</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Icon name="CreditCard" size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Способы оплаты</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                      <span>Онлайн-оплата картой на сайте</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                      <span>Оплата при получении (наличные/карта)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                      <span>Оплата через СБП</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                      <span>Безопасность платежей гарантирована</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <Badge>Контакты</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Свяжитесь с нами</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Адрес кофейни</h3>
                      <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 10</p>
                      <p className="text-muted-foreground text-sm">Ежедневно с 8:00 до 22:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      <p className="text-muted-foreground text-sm">Звонки принимаем с 8:00 до 22:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-muted-foreground">info@pp-coffee.ru</p>
                      <p className="text-muted-foreground text-sm">Ответим в течение 24 часов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Напишите нам</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <Input placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <Input placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Сообщение</label>
                    <Textarea placeholder="Ваш вопрос или комментарий..." rows={4} />
                  </div>
                  <Button className="w-full" size="lg">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground/5 py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Icon name="Coffee" size={28} className="text-primary" />
                <span className="text-xl font-bold">ПП-Кофейня</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Вкусные и полезные десерты для вашего здоровья и хорошего настроения
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#catalog" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#delivery" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#contacts" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Условия доставки</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Программа лояльности</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="icon">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 ПП-Кофейня. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Cart 
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />
    </div>
  );
};

export default Index;
