import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BUSINESS_INFO } from "@/lib/constants";

const Consent = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <Badge className="mb-2">Юридическая информация</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Согласие на обработку персональных данных</h1>
            <p className="text-muted-foreground">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6 prose prose-slate dark:prose-invert max-w-none">
              <section>
                <h2 className="text-2xl font-semibold mb-3">Субъект персональных данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Настоящим я, действуя по собственной воле и в своем интересе, даю согласие {BUSINESS_INFO.name} (далее — Оператор) на обработку моих персональных данных.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Персональные данные</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Согласие распространяется на следующие персональные данные:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Фамилия, имя, отчество</li>
                  <li>Номер телефона</li>
                  <li>Адрес электронной почты (при указании)</li>
                  <li>Адрес доставки (при выборе доставки)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Цели обработки</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оператор обрабатывает персональные данные в следующих целях:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Идентификация Покупателя при оформлении заказа</li>
                  <li>Связь с Покупателем для подтверждения и уточнения деталей заказа</li>
                  <li>Доставка товаров по указанному адресу</li>
                  <li>Информирование о статусе заказа</li>
                  <li>Улучшение качества обслуживания</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Действия с персональными данными</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Согласие дается на совершение следующих действий с персональными данными:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Сбор</li>
                  <li>Запись</li>
                  <li>Систематизация</li>
                  <li>Накопление</li>
                  <li>Хранение</li>
                  <li>Уточнение (обновление, изменение)</li>
                  <li>Извлечение</li>
                  <li>Использование</li>
                  <li>Удаление</li>
                  <li>Уничтожение</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Обработка персональных данных может осуществляться как с использованием средств автоматизации, так и без использования таких средств.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Срок действия согласия</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Настоящее согласие действует с момента предоставления персональных данных и до момента его отзыва субъектом персональных данных.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Согласие может быть отозвано субъектом персональных данных путем направления письменного заявления Оператору.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Передача данных третьим лицам</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оператор вправе передавать персональные данные третьим лицам в следующих случаях:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Субъект персональных данных выразил согласие на такие действия</li>
                  <li>Передача необходима для выполнения заказа (например, службе доставки)</li>
                  <li>Передача предусмотрена российским или иным применимым законодательством</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Права субъекта персональных данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Субъект персональных данных имеет право:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Получать информацию, касающуюся обработки его персональных данных</li>
                  <li>Требовать уточнения своих персональных данных, их блокирования или уничтожения</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>Обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Меры по защите персональных данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Контактная информация Оператора</h2>
                <ul className="list-none space-y-2 text-muted-foreground">
                  <li><strong>Название:</strong> {BUSINESS_INFO.name}</li>
                  <li><strong>Адрес:</strong> {BUSINESS_INFO.address}</li>
                  <li><strong>Телефон:</strong> {BUSINESS_INFO.phone}</li>
                  <li><strong>Email:</strong> {BUSINESS_INFO.email}</li>
                </ul>
              </section>

              <section>
                <p className="text-muted-foreground leading-relaxed">
                  Оформляя заказ на сайте и отмечая соответствующий чекбокс, я подтверждаю, что ознакомлен(а) с условиями обработки персональных данных и даю согласие на их обработку в соответствии с настоящим документом.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Consent;
