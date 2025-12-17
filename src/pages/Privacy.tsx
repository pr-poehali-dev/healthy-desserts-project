import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BUSINESS_INFO } from "@/lib/constants";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <Badge className="mb-2">Юридическая информация</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Политика конфиденциальности</h1>
            <p className="text-muted-foreground">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6 prose prose-slate dark:prose-invert max-w-none">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Общие положения</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта {BUSINESS_INFO.name}.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Используя наш сайт, вы соглашаетесь с условиями данной Политики конфиденциальности.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">2. Какие данные мы собираем</h2>
                <p className="text-muted-foreground leading-relaxed">
                  При оформлении заказа мы можем запрашивать следующую информацию:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Имя и фамилия</li>
                  <li>Номер телефона</li>
                  <li>Адрес доставки (при выборе доставки)</li>
                  <li>Email адрес (опционально)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">3. Цели обработки данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы используем ваши персональные данные исключительно для:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Обработки и выполнения заказов</li>
                  <li>Связи с вами по вопросам заказа</li>
                  <li>Доставки товаров по указанному адресу</li>
                  <li>Улучшения качества обслуживания</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">4. Защита данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы применяем технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Доступ к персональным данным имеют только уполномоченные сотрудники, которые обязаны соблюдать конфиденциальность.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Передача данных третьим лицам</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Когда это необходимо для выполнения заказа (например, службе доставки)</li>
                  <li>При наличии вашего явного согласия</li>
                  <li>По требованию закона или государственных органов</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Ваши права</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Вы имеете право:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Получать информацию о ваших персональных данных</li>
                  <li>Требовать исправления неточных данных</li>
                  <li>Требовать удаления ваших данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">7. Хранение данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы храним ваши персональные данные не дольше, чем это необходимо для целей, указанных в данной Политике, или в соответствии с требованиями законодательства.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">8. Изменения в Политике</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на данной странице.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">9. Контактная информация</h2>
                <p className="text-muted-foreground leading-relaxed">
                  По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться к нам:
                </p>
                <ul className="list-none space-y-2 text-muted-foreground">
                  <li><strong>Телефон:</strong> {BUSINESS_INFO.phone}</li>
                  <li><strong>Email:</strong> {BUSINESS_INFO.email}</li>
                  <li><strong>Адрес:</strong> {BUSINESS_INFO.address}</li>
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

export default Privacy;
