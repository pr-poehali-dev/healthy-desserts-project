import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";
import { useCart } from "@/lib/cartStore";
import { DELIVERY_CONFIG } from "@/lib/constants";
import { Link } from "react-router-dom";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartSheet = ({ open, onOpenChange }: CartSheetProps) => {
  const { items, removeItem, updateQuantity, getTotal, getTotalItems } = useCart();

  const subtotal = getTotal();
  const totalItems = getTotalItems();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={24} />
            Корзина
            {totalItems > 0 && (
              <Badge variant="secondary">{totalItems}</Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Проверьте ваш заказ перед оформлением
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12">
            <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center">
              <Icon name="ShoppingBag" size={32} className="text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Корзина пуста</h3>
              <p className="text-muted-foreground">
                Добавьте товары из меню, чтобы оформить заказ
              </p>
            </div>
            <Button asChild onClick={() => onOpenChange(false)}>
              <Link to="/menu">
                Перейти в меню
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold line-clamp-1">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.price} ₽ × {item.quantity}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() => removeItem(item.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                        <span className="ml-auto font-semibold">
                          {item.price * item.quantity} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Сумма заказа</span>
                  <span className="font-semibold">{subtotal} ₽</span>
                </div>
                
                {subtotal < DELIVERY_CONFIG.minOrderAmount && (
                  <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Icon name="AlertCircle" size={16} className="text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                      <div className="text-sm text-yellow-800 dark:text-yellow-200">
                        <p className="font-semibold">Минимальная сумма для доставки: {DELIVERY_CONFIG.minOrderAmount} ₽</p>
                        <p className="text-xs mt-1">
                          Добавьте ещё товаров на {DELIVERY_CONFIG.minOrderAmount - subtotal} ₽ или выберите самовывоз
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between text-lg font-bold">
                <span>Итого:</span>
                <span className="text-primary">{subtotal} ₽</span>
              </div>

              <Button
                size="lg"
                className="w-full"
                asChild
                onClick={() => onOpenChange(false)}
              >
                <Link to="/checkout">
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оформить заказ
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => onOpenChange(false)}
                asChild
              >
                <Link to="/menu">
                  Продолжить покупки
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
