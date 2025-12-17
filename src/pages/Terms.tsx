import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BUSINESS_INFO, DELIVERY_CONFIG } from "@/lib/constants";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <Badge className="mb-2">Юридическая информация</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Пользовательское соглашение (Оферта)</h1>
            <p className="text-muted-foreground">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6 prose prose-slate dark:prose-invert max-w-none">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Общие положения</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между {BUSINESS_INFO.name} (далее — Продавец) и пользователем сайта (далее — Покупатель).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Оформление заказа на сайте означает полное и безоговорочное принятие Покупателем условий настоящего Соглашения.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">2. Предмет соглашения</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Продавец обязуется передать Покупателю товар (десерты и напитки), а Покупатель обязуется принять и оплатить товар в соответствии с условиями настоящего Соглашения.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">3. Оформление заказа</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Покупатель оформляет заказ через корзину на сайте</li>
                  <li>Покупатель указывает контактные данные и адрес доставки (при необходимости)</li>
                  <li>Покупатель выбирает способ получения: самовывоз или доставка</li>
                  <li>Покупатель производит онлайн-оплату заказа</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">4. Оплата</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Оплата производится онлайн картой на сайте</li>
                  <li>Заказ считается принятым только после успешной оплаты</li>
                  <li>При ошибке оплаты Покупатель может повторить попытку</li>
                  <li>Все цены на сайте указаны в рублях РФ</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Доставка</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Доставка осуществляется в пределах МКАД</li>
                  <li>Стоимость доставки: от {DELIVERY_CONFIG.deliveryFee} ₽</li>
                  <li>Минимальная сумма заказа для доставки: {DELIVERY_CONFIG.minOrderAmount} ₽</li>
                  <li>Время доставки: {DELIVERY_CONFIG.estimatedTime}</li>
                  <li>Продавец не несет ответственности за задержки доставки по независящим от него причинам</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Самовывоз</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Адрес самовывоза: {BUSINESS_INFO.address}</li>
                  <li>Режим работы: {BUSINESS_INFO.workingHours}</li>
                  <li>Самовывоз осуществляется бесплатно</li>
                  <li>При получении необходимо назвать номер заказа</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">7. Возврат и обмен</h2>
                <p className="text-muted-foreground leading-relaxed">
                  В соответствии с законодательством РФ, продукты питания надлежащего качества не подлежат возврату и обмену.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  В случае получения товара ненадлежащего качества, Покупатель вправе потребовать:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Замены товара</li>
                  <li>Возврата денежных средств</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Претензии принимаются в день получения заказа по телефону {BUSINESS_INFO.phone} или email {BUSINESS_INFO.email}.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">8. Ответственность сторон</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Продавец не несет ответственности за недостоверные данные, предоставленные Покупателем</li>
                  <li>Покупатель несет ответственность за достоверность предоставленной информации</li>
                  <li>Продавец обязуется соблюдать конфиденциальность персональных данных Покупателя</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">9. Изменение условий</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Продавец оставляет за собой право вносить изменения в настоящее Соглашение. Актуальная версия всегда доступна на данной странице.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">10. Контактная информация</h2>
                <ul className="list-none space-y-2 text-muted-foreground">
                  <li><strong>Название:</strong> {BUSINESS_INFO.name}</li>
                  <li><strong>Адрес:</strong> {BUSINESS_INFO.address}</li>
                  <li><strong>Телефон:</strong> {BUSINESS_INFO.phone}</li>
                  <li><strong>Email:</strong> {BUSINESS_INFO.email}</li>
                  <li><strong>Режим работы:</strong> {BUSINESS_INFO.workingHours}</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
