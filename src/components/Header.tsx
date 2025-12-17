import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cartStore";
import CartSheet from "@/components/CartSheet";
import { BUSINESS_INFO } from "@/lib/constants";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCart((state) => state.getTotalItems());

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Icon name="Coffee" size={28} className="text-primary" />
              <span className="text-2xl font-bold text-foreground">{BUSINESS_INFO.name}</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Главная
              </Link>
              <Link to="/menu" className="text-foreground hover:text-primary transition-colors">
                Меню
              </Link>
              <Link to="/delivery" className="text-foreground hover:text-primary transition-colors">
                Доставка
              </Link>
              <Link to="/contacts" className="text-foreground hover:text-primary transition-colors">
                Контакты
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                className="relative"
                onClick={() => setCartOpen(true)}
              >
                <Icon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden flex flex-col gap-4 pt-6 pb-2">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/menu" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Меню
              </Link>
              <Link 
                to="/delivery" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Доставка
              </Link>
              <Link 
                to="/contacts" 
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Контакты
              </Link>
            </nav>
          )}
        </div>
      </header>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
};

export default Header;
