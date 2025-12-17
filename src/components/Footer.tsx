import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { BUSINESS_INFO } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-foreground/5 py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon name="Coffee" size={28} className="text-primary" />
              <span className="text-xl font-bold">{BUSINESS_INFO.name}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Вкусные и полезные десерты для вашего здоровья и хорошего настроения
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Главная</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">Меню</Link></li>
              <li><Link to="/delivery" className="hover:text-primary transition-colors">Доставка</Link></li>
              <li><Link to="/contacts" className="hover:text-primary transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Пользовательское соглашение</Link></li>
              <li><Link to="/consent" className="hover:text-primary transition-colors">Согласие на обработку ПДн</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
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

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 {BUSINESS_INFO.name}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
