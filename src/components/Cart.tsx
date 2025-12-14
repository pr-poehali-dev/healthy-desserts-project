import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  calories: number;
}

interface CartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

const Cart = ({ open, onOpenChange, items, onUpdateQuantity, onRemoveItem, onClearCart }: CartProps) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    deliveryType: 'delivery' as 'delivery' | 'pickup'
  });

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee = formData.deliveryType === 'delivery' ? (totalPrice >= 1500 ? 0 : 250) : 0;
  const finalPrice = totalPrice + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      onClearCart();
      setOrderSuccess(false);
      setStep('cart');
      onOpenChange(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        comment: '',
        deliveryType: 'delivery'
      });
    }, 3000);
  };

  const handleCloseCart = () => {
    setStep('cart');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleCloseCart}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        {orderSuccess ? (
          <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center">
              <Icon name="Check" size={48} className="text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Заказ оформлен!</h3>
              <p className="text-muted-foreground">
                Спасибо за заказ! Мы свяжемся с вами в ближайшее время для подтверждения.
              </p>
            </div>
          </div>
        ) : step === 'cart' ? (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Icon name="ShoppingCart" size={24} />
                Корзина
                {totalItems > 0 && (
                  <Badge variant="secondary">{totalItems}</Badge>
                )}
              </SheetTitle>
              <SheetDescription>
                {items.length === 0 ? 'Ваша корзина пуста' : `${totalItems} товар(а/ов) в корзине`}
              </SheetDescription>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] space-y-4 text-center">
                <Icon name="ShoppingBag" size={64} className="text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  Добавьте десерты из каталога
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 py-6 space-y-4">
                  {items.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.calories} ккал</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onRemoveItem(item.id)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                              <span className="font-bold text-lg">{item.price * item.quantity} ₽</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <SheetFooter className="flex-col space-y-4">
                  <div className="space-y-2 w-full">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Товары ({totalItems})</span>
                      <span>{totalPrice} ₽</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Итого</span>
                      <span>{totalPrice} ₽</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setStep('checkout')}
                  >
                    Оформить заказ
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={onClearCart}
                  >
                    Очистить корзину
                  </Button>
                </SheetFooter>
              </>
            )}
          </>
        ) : (
          <>
            <SheetHeader>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setStep('cart')}
                >
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <SheetTitle>Оформление заказа</SheetTitle>
              </div>
            </SheetHeader>

            <form onSubmit={handleSubmitOrder} className="space-y-6 py-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Тип получения</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={formData.deliveryType === 'delivery' ? 'default' : 'outline'}
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setFormData({...formData, deliveryType: 'delivery'})}
                  >
                    <Icon name="Truck" size={24} />
                    <span>Доставка</span>
                  </Button>
                  <Button
                    type="button"
                    variant={formData.deliveryType === 'pickup' ? 'default' : 'outline'}
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setFormData({...formData, deliveryType: 'pickup'})}
                  >
                    <Icon name="Store" size={24} />
                    <span>Самовывоз</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Контактные данные</h3>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваше имя *</label>
                  <Input 
                    placeholder="Иван Иванов" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Телефон *</label>
                  <Input 
                    type="tel"
                    placeholder="+7 (999) 999-99-99" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input 
                    type="email"
                    placeholder="example@mail.ru"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {formData.deliveryType === 'delivery' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Адрес доставки</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Адрес *</label>
                    <Input 
                      placeholder="Улица, дом, квартира" 
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Комментарий к заказу</label>
                <Textarea 
                  placeholder="Пожелания, время доставки..."
                  rows={3}
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                />
              </div>

              <Card className="bg-muted/50">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold">Ваш заказ</h3>
                  <div className="space-y-2 text-sm">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {item.name} × {item.quantity}
                        </span>
                        <span>{item.price * item.quantity} ₽</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-muted-foreground">Товары</span>
                      <span>{totalPrice} ₽</span>
                    </div>
                    {formData.deliveryType === 'delivery' && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Доставка</span>
                        <span>{deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Итого</span>
                      <span>{finalPrice} ₽</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" size="lg">
                Подтвердить заказ
                <Icon name="Check" size={20} className="ml-2" />
              </Button>
            </form>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
