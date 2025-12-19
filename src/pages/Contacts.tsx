import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BUSINESS_INFO } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const Contacts = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <Badge className="mb-2">Контакты</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Свяжитесь с нами</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Мы всегда рады ответить на ваши вопросы и помочь с выбором
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Доставка и самовывоз</h3>
                      <p className="text-muted-foreground">{BUSINESS_INFO.address}</p>
                      <p className="text-muted-foreground text-sm mt-2">{BUSINESS_INFO.workingHours}</p>
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
                      <p className="text-muted-foreground">{BUSINESS_INFO.phone}</p>
                      <p className="text-muted-foreground text-sm mt-2">
                        Звонки принимаем {BUSINESS_INFO.workingHoursStart}–{BUSINESS_INFO.workingHoursEnd}
                      </p>
                      <Button variant="outline" size="sm" className="mt-3" asChild>
                        <a href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, '')}`}>
                          <Icon name="Phone" size={16} className="mr-2" />
                          Позвонить
                        </a>
                      </Button>
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
                      <p className="text-muted-foreground">{BUSINESS_INFO.email}</p>
                      <p className="text-muted-foreground text-sm mt-2">Ответим в течение 24 часов</p>
                      <Button variant="outline" size="sm" className="mt-3" asChild>
                        <a href={`mailto:${BUSINESS_INFO.email}`}>
                          <Icon name="Mail" size={16} className="mr-2" />
                          Написать
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                      <Icon name="MessageCircle" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">Мы в соцсетях</h3>
                      <div className="flex gap-3">
                        <Button variant="outline" size="icon" asChild>
                          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <Icon name="Instagram" size={20} />
                          </a>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                            <Icon name="Send" size={20} />
                          </a>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                            <Icon name="MessageCircle" size={20} />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Напишите нам</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" placeholder="Иван Иванов" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="ivan@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      placeholder="Ваш вопрос или комментарий..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacts;