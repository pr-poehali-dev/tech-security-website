import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    clients: 0,
    years: 0
  });
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  // Анимация счетчиков
  useEffect(() => {
    const animateStats = () => {
      const targets = { projects: 150, clients: 50, years: 7 };
      const duration = 2000;
      const steps = 50;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setAnimatedStats({
          projects: Math.round(targets.projects * easeOut),
          clients: Math.round(targets.clients * easeOut),
          years: Math.round(targets.years * easeOut)
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedStats(targets);
        }
      }, interval);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        observer.disconnect();
      }
    });

    const statsElement = document.getElementById('stats-section');
    if (statsElement) observer.observe(statsElement);

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Форма отправлена:', formData);
    setIsFormOpen(false);
    setFormData({ name: '', company: '', email: '', phone: '', message: '' });
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-montserrat font-bold text-primary">
                Безопасность технологий и решений
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#services" className="text-sm font-open-sans hover:text-primary transition-colors">Услуги</a>
              <a href="#about" className="text-sm font-open-sans hover:text-primary transition-colors">О компании</a>
              <a href="#audit" className="text-sm font-open-sans hover:text-primary transition-colors">Аудит ИБ</a>
              <a href="#solutions" className="text-sm font-open-sans hover:text-primary transition-colors">Средства защиты</a>
              <a href="#contacts" className="text-sm font-open-sans hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Icon name="Lock" className="w-4 h-4 mr-2" />
                  Эксперты по информационной безопасности
                </Badge>
                <h2 className="text-4xl lg:text-6xl font-montserrat font-bold leading-tight">
                  Защита данных —
                  <span className="text-primary"> наша миссия</span>
                </h2>
                <p className="text-xl text-muted-foreground font-open-sans">
                  Комплексные решения для аудита информационной безопасности, 
                  поставки и настройки средств защиты информации для российских организаций.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-open-sans">
                      <Icon name="Shield" className="w-5 h-5 mr-2" />
                      Провести аудит
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="font-montserrat">Заявка на аудит ИБ</DialogTitle>
                      <DialogDescription className="font-open-sans">
                        Заполните форму и мы свяжемся с вами для обсуждения деталей аудита
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Компания *</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Дополнительная информация</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Опишите специфику вашей ИТ-инфраструктуры..."
                        />
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                        <Icon name="Send" className="w-4 h-4 mr-2" />
                        Отправить заявку
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="lg" className="font-open-sans">
                  <Icon name="Phone" className="w-5 h-5 mr-2" />
                  Консультация
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
              <img 
                src="/img/139fc726-1d39-4fa6-b2ee-eeeb9d682748.jpg" 
                alt="Cybersecurity Shield"
                className="relative z-10 w-full rounded-2xl shadow-2xl animate-pulse-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-montserrat font-bold mb-4">
              Наши услуги
            </h3>
            <p className="text-lg text-muted-foreground font-open-sans max-w-2xl mx-auto">
              Полный спектр решений для обеспечения информационной безопасности вашей организации
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "Search",
                title: "Аудит ИБ",
                description: "Комплексная оценка состояния информационной безопасности организации",
                features: ["Анализ уязвимостей", "Оценка рисков", "Отчет с рекомендациями"]
              },
              {
                icon: "Settings",
                title: "Поставка СЗИ",
                description: "Подбор и поставка сертифицированных средств защиты информации",
                features: ["Антивирусы", "Межсетевые экраны", "DLP системы"]
              },
              {
                icon: "Wrench",
                title: "Установка и настройка",
                description: "Профессиональная установка и конфигурирование систем защиты",
                features: ["Настройка под задачи", "Интеграция с ИТ", "Обучение персонала"]
              },
              {
                icon: "FileText",
                title: "Документооборот ИБ",
                description: "Разработка политик и процедур информационной безопасности",
                features: ["Политики ИБ", "Регламенты", "Инструкции"]
              },
              {
                icon: "Award",
                title: "Аттестация ИС",
                description: "Аттестация информационных систем на соответствие требованиям ИБ",
                features: ["Аттестация по требованиям ФСТЭК", "Получение аттестатов соответствия", "Сопровождение процедуры"]
              },
              {
                icon: "LifeBuoy",
                title: "Техподдержка",
                description: "Круглосуточная поддержка систем информационной безопасности",
                features: ["24/7 мониторинг", "Инцидент-менеджмент", "Обновления"]
              }
            ].map((service, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon name={service.icon as any} className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="font-montserrat text-xl">{service.title}</CardTitle>
                      <CardDescription className="font-open-sans">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm font-open-sans">
                            <Icon name="Check" className="w-4 h-4 text-accent mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex items-center text-sm text-primary font-open-sans">
                        <span>Подробнее</span>
                        <Icon name="ArrowRight" className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="font-montserrat flex items-center">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                        <Icon name={service.icon as any} className="w-5 h-5 text-primary" />
                      </div>
                      {service.title}
                    </DialogTitle>
                    <DialogDescription className="font-open-sans">
                      {service.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold font-montserrat mb-3">Что включает услуга:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm font-open-sans">
                            <Icon name="Check" className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {index === 0 && (
                      <div className="bg-card p-4 rounded-lg">
                        <h4 className="font-semibold font-montserrat mb-2">Этапы аудита:</h4>
                        <ol className="text-sm font-open-sans space-y-1 text-muted-foreground">
                          <li>1. Предварительный анализ инфраструктуры</li>
                          <li>2. Тестирование на проникновение</li>
                          <li>3. Анализ политик безопасности</li>
                          <li>4. Подготовка детального отчета</li>
                        </ol>
                      </div>
                    )}
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => setIsFormOpen(true)}>
                        <Icon name="MessageSquare" className="w-4 h-4 mr-2" />
                        Получить консультацию
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/img/ee18f6ef-b656-42d2-b4d7-fe2a743cb252.jpg" 
                alt="Digital Security Network"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-montserrat font-bold">
                О компании
              </h3>
              <div className="space-y-4">
                <p className="text-lg font-open-sans text-muted-foreground">
                  "Безопасность технологий и решений" — ведущая российская компания, 
                  специализирующаяся на комплексных решениях в области информационной безопасности.
                </p>
                <p className="text-lg font-open-sans text-muted-foreground">
                  Наша команда экспертов обладает многолетним опытом работы с российскими 
                  и зарубежными системами защиты информации.
                </p>
              </div>
              
              <div id="stats-section" className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-montserrat font-bold text-primary">{animatedStats.projects}+</div>
                  <div className="text-sm font-open-sans text-muted-foreground">Проектов реализовано</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-montserrat font-bold text-primary">{animatedStats.clients}+</div>
                  <div className="text-sm font-open-sans text-muted-foreground">Довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-montserrat font-bold text-primary">{animatedStats.years}</div>
                  <div className="text-sm font-open-sans text-muted-foreground">Лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-montserrat font-bold text-primary">24/7</div>
                  <div className="text-sm font-open-sans text-muted-foreground">Техподдержка</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Section */}
      <section id="audit" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-montserrat font-bold mb-4">
                Аудит информационной безопасности
              </h3>
              <p className="text-lg text-muted-foreground font-open-sans">
                Профессиональная оценка уровня защищенности вашей ИТ-инфраструктуры
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  step: "01",
                  title: "Анализ инфраструктуры",
                  description: "Изучение текущего состояния ИТ-систем и процессов"
                },
                {
                  step: "02", 
                  title: "Выявление уязвимостей",
                  description: "Поиск потенциальных угроз и слабых мест в защите"
                },
                {
                  step: "03",
                  title: "Рекомендации",
                  description: "Разработка плана мероприятий по повышению ИБ"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-montserrat font-bold text-primary">{item.step}</span>
                  </div>
                  <h4 className="text-xl font-montserrat font-semibold mb-2">{item.title}</h4>
                  <p className="font-open-sans text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="font-montserrat text-2xl text-center">
                  Получить предложение по аудиту
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-open-sans text-muted-foreground mb-6">
                  Оставьте заявку и получите индивидуальное предложение по аудиту ИБ для вашей организации
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setIsFormOpen(true)}>
                  <Icon name="Mail" className="w-5 h-5 mr-2" />
                  Запросить предложение
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-montserrat font-bold mb-4">
              Средства защиты информации
            </h3>
            <p className="text-lg text-muted-foreground font-open-sans max-w-2xl mx-auto">
              Сертифицированные решения от ведущих российских и зарубежных производителей
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "Shield", title: "Антивирусная защита", description: "Dr.Web, Kaspersky, ESET" },
              { icon: "Network", title: "Межсетевые экраны", description: "Континент, UserGate, Fortinet" },
              { icon: "Eye", title: "DLP-системы", description: "SearchInform, InfoWatch, Zecurion" },
              { icon: "Key", title: "Криптографические средства", description: "Крипто-Про, Рутокен, JaCarta" }
            ].map((solution, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={solution.icon as any} className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="font-montserrat text-lg">{solution.title}</CardTitle>
                  <CardDescription className="font-open-sans">{solution.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl lg:text-4xl font-montserrat font-bold mb-4">
                Контакты
              </h3>
              <p className="text-lg text-muted-foreground font-open-sans">
                Свяжитесь с нами для консультации по вопросам информационной безопасности
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Phone" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-2">Телефон</h4>
                    <p className="font-open-sans text-muted-foreground">+7 (495) 123-45-67</p>
                    <p className="font-open-sans text-muted-foreground">+7 (800) 123-45-67</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-2">Email</h4>
                    <p className="font-open-sans text-muted-foreground">info@security-tech.ru</p>
                    <p className="font-open-sans text-muted-foreground">audit@security-tech.ru</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold mb-2">Адрес</h4>
                    <p className="font-open-sans text-muted-foreground">
                      г. Москва, ул. Тверская, д. 123<br />
                      БЦ "Технопарк", офис 456
                    </p>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat">Быстрая связь</CardTitle>
                  <CardDescription className="font-open-sans">
                    Оставьте заявку и мы свяжемся с вами в течение рабочего дня
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    <Icon name="MessageSquare" className="w-5 h-5 mr-2" />
                    Написать в Telegram
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Icon name="Phone" className="w-5 h-5 mr-2" />
                    Заказать звонок
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icon name="Shield" className="h-6 w-6 text-primary" />
              <span className="font-montserrat font-bold">Безопасность технологий и решений</span>
            </div>
            <p className="text-sm font-open-sans text-muted-foreground">
              © 2024 Все права защищены. Лицензия на деятельность по технической защите информации.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;