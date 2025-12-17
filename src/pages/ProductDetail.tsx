import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { SWEETENER_NAMES, TAG_NAMES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cartStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const addItem = useCart((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const product = SAMPLE_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-12 text-center space-y-4">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Icon name="AlertCircle" size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold">Товар не найден</h2>
            <p className="text-muted-foreground">Этот товар недоступен или был удален</p>
            <Button asChild>
              <Link to="/menu">Вернуться в меню</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} (${quantity} шт.)`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-4xl font-bold">{product.name}</h1>
                {product.isPopular && (
                  <Badge className="shrink-0">
                    <Icon name="TrendingUp" size={14} className="mr-1" />
                    Хит
                  </Badge>
                )}
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-primary">{product.price} ₽</span>
                <Badge variant="secondary" className="text-base">
                  {product.nutrition.calories} ккал
                </Badge>
              </div>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Icon name="Activity" size={20} />
                  Пищевая ценность
                </h3>
                <div className="text-sm text-muted-foreground mb-2">
                  Порция: {product.nutrition.portionSize}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Калории</div>
                    <div className="text-2xl font-bold">{product.nutrition.calories} ккал</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Белки</div>
                    <div className="text-2xl font-bold">{product.nutrition.protein} г</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Жиры</div>
                    <div className="text-2xl font-bold">{product.nutrition.fats} г</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Углеводы</div>
                    <div className="text-2xl font-bold">{product.nutrition.carbs} г</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Icon name="List" size={20} />
                  Состав
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.ingredients}
                </p>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Подсластитель</div>
                  <Badge variant="outline">{SWEETENER_NAMES[product.sweetener]}</Badge>
                </div>
                {product.allergens.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <Icon name="AlertTriangle" size={16} />
                        Аллергены
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.allergens.map((allergen) => (
                          <Badge key={allergen} variant="destructive">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {product.tags.length > 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Icon name="Tag" size={20} />
                    Особенности
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} className="text-sm">
                        {TAG_NAMES[tag]}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-primary">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Количество</span>
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Icon name="Minus" size={18} />
                    </Button>
                    <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Icon name="Plus" size={18} />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-2xl font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{product.price * quantity} ₽</span>
                </div>
                <Button size="lg" className="w-full text-lg" onClick={handleAddToCart}>
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Вам также может понравиться</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_PRODUCTS
              .filter(p => p.category === product.category && p.id !== product.id && p.inStock)
              .slice(0, 4)
              .map((similarProduct) => (
                <Card key={similarProduct.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <Link to={`/product/${similarProduct.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={similarProduct.image}
                        alt={similarProduct.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-5 space-y-3">
                      <h3 className="text-lg font-semibold line-clamp-1">{similarProduct.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{similarProduct.price} ₽</span>
                        <Badge variant="secondary" className="text-xs">
                          {similarProduct.nutrition.calories} ккал
                        </Badge>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;