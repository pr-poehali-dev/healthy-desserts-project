import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DELIVERY_CONFIG, BUSINESS_INFO } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Delivery = () => {
  const deliveryZones = [
    { zone: "В пределах МКАД", price: "300₽", free: "Бесплатно от 1500₽", time: "30-90 мин" },
    { zone: "За МКАД", price: "300₽ + 50₽/км", free: "От 2000₽", time: "60-120 мин" },
  ];

  const faqs = [
    {
      question: "Можно ли заказать доставку ко времени?",
      answer: "Да, при оформлении заказа укажите желаемое время доставки с 9:00 до 22:00. Мы постараемся доставить точно ко времени."
    },
    {
      question: "Сколько стоит доставка за МКАД?",
      answer: "Базовая стоимость 300₽ + 50₽ за каждый километр от МКАД. Бесплатная доставка при заказе от 2000₽."
    },
    {
      question: "Как быстро готовится заказ при самовывозе?",
      answer: "Заказ будет готов через 15-20 минут после оформления и оплаты. Вы получите SMS с номером заказа."
    },
    {
      question: "Какие способы оплаты доступны?",
      answer: "Оплата картой онлайн (Сбербанк, Тинькофф, Visa/Mastercard), наличными курьеру или картой при самовывозе."
    },
    {
      question: "Можно ли отменить заказ?",
      answer: "Да, вы можете отменить заказ до начала его приготовления. Свяжитесь с нами по телефону или в чате."
    },
    {
      question: "Десерты всегда есть в наличии?",
      answer: "На сайте показываем только позиции в наличии. Десерты продаём из наличия — поэтому собираем заказ быстро."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="mb-2">Информация</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Доставка и оплата</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Доставляем свежие ПП-десерты в течение 30-90 минут. Самовывоз готов за 15 минут.
            </p>
          </div>

          <Card className="mb-12 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-background p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">🚚</div>
                  <h2 className="text-3xl font-bold">Условия доставки</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {deliveryZones.map((zone, index) => (
                    <Card key={index} className="border-none shadow-md">
                      <CardContent className="p-6 space-y-3">
                        <h3 className="text-xl font-semibold">{zone.zone}</h3>
                        <div className="space-y-2 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Icon name="DollarSign" size={18} className="text-primary" />
                            <span>{zone.price}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Gift" size={18} className="text-green-500" />
                            <span>{zone.free}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Clock" size={18} className="text-amber-500" />
                            <span>{zone.time}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <Icon name="Clock" size={20} className="text-primary" />
                      <span>Доставка ко времени</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Возможна доставка с 9:00 до 22:00 — укажите время при оформлении</p>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <Icon name="Zap" size={20} className="text-amber-500" />
                      <span>Минимальная сумма</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Доставка от {DELIVERY_CONFIG.minOrderAmount} ₽, самовывоз — без минимума</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-background p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">🏠</div>
                  <h2 className="text-3xl font-bold">Самовывоз</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="MapPin" size={28} className="text-primary" />
                      </div>
                      <h3 className="font-semibold">Адрес</h3>
                      <p className="text-sm text-muted-foreground">Москва, самовывоз и доставка по городу</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="bg-green-500/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="Clock" size={28} className="text-green-600" />
                      </div>
                      <h3 className="font-semibold">Режим работы</h3>
                      <p className="text-sm text-muted-foreground">Ежедневно<br/>08:00–22:00</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="bg-amber-500/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="Timer" size={28} className="text-amber-600" />
                      </div>
                      <h3 className="font-semibold">Готовность</h3>
                      <p className="text-sm text-muted-foreground">15–20 минут<br/>после оформления</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-5 mt-6">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      При оформлении выберите "Самовывоз". После оплаты вы получите SMS с номером заказа и точным временем готовности.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-background p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">💳</div>
                  <h2 className="text-3xl font-bold">Способы оплаты</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="bg-blue-500/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="CreditCard" size={28} className="text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-lg">Картой онлайн</h3>
                      <p className="text-sm text-muted-foreground">Сбербанк, Тинькофф, Visa/Mastercard</p>
                      <Badge variant="secondary" className="w-fit mx-auto">Рекомендуем</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="bg-green-500/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="Banknote" size={28} className="text-green-600" />
                      </div>
                      <h3 className="font-semibold text-lg">Наличными</h3>
                      <p className="text-sm text-muted-foreground">Оплата курьеру при получении</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="bg-purple-500/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="Smartphone" size={28} className="text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-lg">При самовывозе</h3>
                      <p className="text-sm text-muted-foreground">Картой или наличными в кофейне</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-5 mt-6">
                  <div className="flex items-start gap-3">
                    <Icon name="ShieldCheck" size={20} className="text-green-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Все платежи защищены. Данные карт обрабатываются по стандарту PCI DSS. Мы не храним данные вашей карты.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Часто задаваемые вопросы</h2>
              <p className="text-muted-foreground">Ответы на популярные вопросы о заказе и доставке</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Delivery;