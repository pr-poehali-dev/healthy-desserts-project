import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { BUSINESS_INFO } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const popularProducts = SAMPLE_PRODUCTS.filter(p => p.isPopular).slice(0, 4);

  const benefits = [
    {
      icon: "Leaf",
      title: "Натуральные ингредиенты",
      description: "Только проверенные продукты без искусственных добавок"
    },
    {
      icon: "Activity",
      title: "КБЖУ на каждый десерт",
      description: "Полная информация о калориях, белках, жирах и углеводах"
    },
    {
      icon: "Clock",
      title: "Быстрая доставка",
      description: "30-90 минут в пределах МКАД"
    },
    {
      icon: "Award",
      title: "Только в наличии",
      description: "Показываем только доступные позиции"
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
      text: "Отличная кофейня. Беру брауни каждый день — вкусно и не вредит тренировкам.",
      rating: 5
    },
    {
      name: "Елена С.",
      text: "Заказывала доставку для офиса. Коллеги в восторге! Десерты красивые и действительно полезные.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="w-fit">Здоровое питание в Москве</Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Вкусные ПП‑десерты и кофе — с понятным составом и КБЖУ
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Берите после тренировки или к кофе: в каждой позиции — ингредиенты, подсластитель и КБЖУ
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg" asChild>
                  <Link to="/menu">
                    <Icon name="ShoppingBag" size={20} className="mr-2" />
                    Заказать
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <Link to="/menu">
                    <Icon name="Coffee" size={20} className="mr-2" />
                    Меню
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <Link to="/delivery">
                    <Icon name="Truck" size={20} className="mr-2" />
                    Доставка и оплата
                  </Link>
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

      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <Badge className="mb-2">Категории</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Выберите категорию</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Торты, пирожные, наборы и напитки — всё с понятным составом
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Торты", icon: "Cake", gradient: "from-rose-400/20 to-pink-500/20", iconColor: "text-rose-500" },
              { name: "Пирожные", icon: "Cookie", gradient: "from-amber-400/20 to-orange-500/20", iconColor: "text-amber-600" },
              { name: "Наборы", icon: "Gift", gradient: "from-purple-400/20 to-violet-500/20", iconColor: "text-purple-500" },
              { name: "Кофе и напитки", icon: "Coffee", gradient: "from-yellow-400/20 to-amber-500/20", iconColor: "text-yellow-700" }
            ].map((category, index) => (
              <Link 
                key={category.name} 
                to="/menu"
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className={`h-full overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${category.gradient}`}>
                  <CardContent className="p-8 flex flex-col items-center justify-center space-y-6 h-64">
                    <div className={`bg-background/80 backdrop-blur-sm p-6 rounded-3xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon name={category.icon as any} size={56} className={`${category.iconColor} group-hover:scale-110 transition-transform duration-500`} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <Badge className="mb-2">Хиты продаж</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Популярные позиции</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Самые любимые десерты и напитки наших клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product, index) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <Badge variant="secondary" className="shrink-0">
                        {product.nutrition.calories} ккал
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      <Button size="sm">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/menu">
                Смотреть всё меню
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <Badge>О нас</Badge>
              <h2 className="text-4xl md:text-5xl font-bold">Наша миссия</h2>
            </div>
            
            <Card>
              <CardContent className="p-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Делаем кофе и ПП‑десерты так, чтобы было реально вкусно.</strong>
                </p>
                <p>
                  Всегда показываем состав, КБЖУ и подсластитель. Десерты продаём из наличия — поэтому собираем заказ быстро.
                </p>
                <p>
                  Наша команда кондитеров работает только с натуральными ингредиентами — цельнозерновая мука, греческий йогурт, свежие фрукты и ягоды. Никаких искусственных добавок, только польза и вкус.
                </p>
              </CardContent>
            </Card>
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

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <Badge>Режим работы</Badge>
              <h2 className="text-4xl md:text-5xl font-bold">Мы работаем для вас</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Режим работы</h3>
                  <p className="text-3xl font-bold text-primary">{BUSINESS_INFO.workingHours}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Icon name="MapPin" size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Адрес кофейни</h3>
                  <p className="text-lg text-muted-foreground">{BUSINESS_INFO.address}</p>
                  <Button variant="outline" asChild>
                    <Link to="/contacts">
                      <Icon name="Navigation" size={18} className="mr-2" />
                      Показать на карте
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;