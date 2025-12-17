import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cartStore";
import { DELIVERY_CONFIG, BUSINESS_INFO } from "@/lib/constants";
import { DeliveryType } from "@/types/product";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, getTotal, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('pickup');
  const [consentChecked, setConsentChecked] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    entrance: '',
    floor: '',
    apartment: '',
    comment: '',
    deliveryTime: 'asap',
  });

  const subtotal = getTotal();
  const deliveryFee = deliveryType === 'delivery' ? DELIVERY_CONFIG.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  const canProceed = deliveryType === 'pickup' || subtotal >= DELIVERY_CONFIG.minOrderAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consentChecked) {
      toast({
        title: "Требуется согласие",
        description: "Пожалуйста, дайте согласие на обработку персональных данных",
        variant: "destructive",
      });
      return;
    }

    if (!canProceed) {
      toast({
        title: "Минимальная сумма заказа",
        description: `Для доставки минимальная сумма заказа ${DELIVERY_CONFIG.minOrderAmount} ₽`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Заказ оформлен!",
      description: "Переход к оплате...",
    });

    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-12 text-center space-y-4">
              <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Icon name="ShoppingCart" size={32} className="text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold">Корзина пуста</h2>
              <p className="text-muted-foreground">
                Добавьте товары из меню, чтобы оформить заказ
              </p>
              <Button asChild>
                <Link to="/menu">Перейти в меню</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Оформление заказа</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Truck" size={20} />
                      Способ получения
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={deliveryType} onValueChange={(value) => setDeliveryType(value as DeliveryType)}>
                      <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                          <div className="font-semibold mb-1">Самовывоз</div>
                          <div className="text-sm text-muted-foreground">
                            {BUSINESS_INFO.address}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {BUSINESS_INFO.workingHours}
                          </div>
                          <div className="font-semibold text-primary mt-2">Бесплатно</div>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                          <div className="font-semibold mb-1">Доставка</div>
                          <div className="text-sm text-muted-foreground">
                            В пределах МКАД, {DELIVERY_CONFIG.estimatedTime}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Минимальная сумма заказа: {DELIVERY_CONFIG.minOrderAmount} ₽
                          </div>
                          <div className="font-semibold text-primary mt-2">{DELIVERY_CONFIG.deliveryFee} ₽</div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {deliveryType === 'delivery' && subtotal < DELIVERY_CONFIG.minOrderAmount && (
                      <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Icon name="AlertCircle" size={20} className="text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                          <div className="text-sm text-yellow-800 dark:text-yellow-200">
                            <p className="font-semibold">Минимальная сумма для доставки: {DELIVERY_CONFIG.minOrderAmount} ₽</p>
                            <p className="mt-1">
                              Добавьте ещё товаров на {DELIVERY_CONFIG.minOrderAmount - subtotal} ₽ или выберите самовывоз
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="User" size={20} />
                      Контактные данные
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя *</Label>
                      <Input
                        id="name"
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {deliveryType === 'delivery' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="MapPin" size={20} />
                        Адрес доставки
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Адрес *</Label>
                        <Input
                          id="address"
                          placeholder="Улица, дом"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="entrance">Подъезд</Label>
                          <Input
                            id="entrance"
                            placeholder="1"
                            value={formData.entrance}
                            onChange={(e) => setFormData({ ...formData, entrance: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="floor">Этаж</Label>
                          <Input
                            id="floor"
                            placeholder="5"
                            value={formData.floor}
                            onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apartment">Квартира</Label>
                          <Input
                            id="apartment"
                            placeholder="42"
                            value={formData.apartment}
                            onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Clock" size={20} />
                      Время {deliveryType === 'delivery' ? 'доставки' : 'самовывоза'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={formData.deliveryTime} onValueChange={(value) => setFormData({ ...formData, deliveryTime: value })}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="asap" id="asap" />
                        <Label htmlFor="asap" className="cursor-pointer">Как можно быстрее</Label>
                      </div>
                    </RadioGroup>
                    <div className="space-y-2">
                      <Label htmlFor="comment">Комментарий к заказу</Label>
                      <Textarea
                        id="comment"
                        placeholder="Дополнительные пожелания..."
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="consent"
                        checked={consentChecked}
                        onCheckedChange={(checked) => setConsentChecked(checked as boolean)}
                      />
                      <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                        Я даю согласие на обработку моих персональных данных для оформления заказа в соответствии с{' '}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Политикой конфиденциальности
                        </Link>
                        {' '}и{' '}
                        <Link to="/consent" className="text-primary hover:underline">
                          Согласием на обработку ПДн
                        </Link>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Ваш заказ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold">{item.price * item.quantity} ₽</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Сумма заказа</span>
                        <span className="font-semibold">{subtotal} ₽</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Доставка</span>
                        <span className="font-semibold">
                          {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Итого</span>
                      <span className="text-primary">{total} ₽</span>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={!canProceed || !consentChecked}
                    >
                      <Icon name="CreditCard" size={20} className="mr-2" />
                      Перейти к оплате
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Оплата производится онлайн картой. Заказ будет принят после успешной оплаты.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
