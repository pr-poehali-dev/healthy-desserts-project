import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { BUSINESS_INFO } from "@/lib/constants";

const OrderSuccess = () => {
  const orderNumber = `ПП-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center space-y-6">
            <div className="bg-green-100 dark:bg-green-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Check" size={48} className="text-green-600 dark:text-green-400" />
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-bold">Заказ успешно оформлен!</h1>
              <p className="text-xl text-muted-foreground">
                Номер заказа: <span className="font-semibold text-primary">{orderNumber}</span>
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-4 text-left">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5 shrink-0" />
                <div className="space-y-2 text-sm">
                  <p className="font-semibold">Что дальше?</p>
                  <p className="text-muted-foreground">
                    Мы отправим подтверждение на указанный номер телефона
                  </p>
                  <p className="text-muted-foreground">
                    Ваш заказ будет готов в течение 30-90 минут
                  </p>
                  <p className="text-muted-foreground">
                    При возникновении вопросов звоните: {BUSINESS_INFO.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link to="/menu">
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Продолжить покупки
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">
                  <Icon name="Home" size={20} className="mr-2" />
                  На главную
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
