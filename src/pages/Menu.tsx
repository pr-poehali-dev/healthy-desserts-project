import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { CATEGORY_NAMES } from "@/lib/constants";
import { ProductCategory } from "@/types/product";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const categories: Array<ProductCategory | 'all'> = ['all', 'drinks', 'desserts', 'combo', 'seasonal'];

  const filteredProducts = selectedCategory === 'all'
    ? SAMPLE_PRODUCTS.filter(p => p.inStock)
    : SAMPLE_PRODUCTS.filter(p => p.category === selectedCategory && p.inStock);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <Badge className="mb-2">Наше меню</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Выберите то, что вам понравится</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Все позиции с указанием КБЖУ, состава и подсластителя
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="min-w-[120px]"
            >
              {category === 'all' ? 'Все' : CATEGORY_NAMES[category]}
            </Button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-12 text-center space-y-4">
              <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Coffee" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Нет товаров в этой категории</h3>
              <p className="text-muted-foreground">Попробуйте выбрать другую категорию</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    {product.isPopular && (
                      <Badge className="absolute top-3 right-3">
                        <Icon name="TrendingUp" size={14} className="mr-1" />
                        Хит
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <Badge variant="secondary" className="shrink-0">
                        {product.nutrition.calories} ккал
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag === 'high-protein' && '💪'}
                          {tag === 'lactose-free' && '🥛'}
                          {tag === 'vegan' && '🌱'}
                          {tag === 'no-added-sugar' && '🍯'}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      <Button size="sm">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Menu;