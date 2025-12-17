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
  const faqs = [
    {
      question: "Есть ли заменители сахара?",
      answer: "В части десертов используем стевию/эритрит; конкретный вариант указан в карточке товара."
    },
    {
      question: "Где посмотреть КБЖУ?",
      answer: "В карточке каждой позиции: КБЖУ на порцию, состав и аллергены."
    },
    {
      question: "Можно быстрее доставить?",
      answer: "Да: выберите \"как можно быстрее\" при оформлении заказа."
    },
    {
      question: "Почему доставка от 1000 ₽?",
      answer: "Чтобы держать качество и скорость доставки в часы пик."
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
          <div className="text-center mb-12 space-y-4">
            <Badge className="mb-2">Информация</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Доставка и оплата</h1>
            <p className="text-xl text-muted-foreground">
              Доставка по МКАД: {DELIVERY_CONFIG.estimatedTime}, от {DELIVERY_CONFIG.deliveryFee} ₽, минимум {DELIVERY_CONFIG.minOrderAmount} ₽. Оплата онлайн картой. Самовывоз {BUSINESS_INFO.workingHours}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Icon name="Truck" size={24} className="text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Условия доставки</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                    <span>Доставка в пределах МКАД — {DELIVERY_CONFIG.deliveryFee} ₽</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                    <span>Минимальная сумма заказа на доставку: {DELIVERY_CONFIG.minOrderAmount} ₽</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                    <span>Среднее время доставки — {DELIVERY_CONFIG.estimatedTime}</span>
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
                <h2 className="text-2xl font-semibold">Способы оплаты</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                    <span>Онлайн-оплата картой на сайте</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                    <span>Заказ принимается только после успешной оплаты</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                    <span>Безопасность платежей гарантирована</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={20} className="text-primary shrink-0 mt-0.5" />
                    <span>При ошибке оплаты — возможность повторить</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="MapPin" size={24} className="text-primary" />
                <h2 className="text-2xl font-semibold">Самовывоз</h2>
              </div>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Адрес</div>
                    <div className="font-semibold">{BUSINESS_INFO.address}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Режим работы</div>
                    <div className="font-semibold">{BUSINESS_INFO.workingHours}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Телефон</div>
                    <div className="font-semibold">{BUSINESS_INFO.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <div className="font-semibold">{BUSINESS_INFO.email}</div>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    При оформлении заказа выберите "Самовывоз". После успешной оплаты вы получите номер заказа и время готовности.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12">
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
