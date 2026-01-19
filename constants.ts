
import { Product, Language } from './types';

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/vogueaura_official',
  tiktok: 'https://tiktok.com/@vogueaura',
  pinterest: 'https://pinterest.com/vogueaura'
};

// Define audio assets for background atmosphere and UI sounds.
export const AUDIO_ASSETS = {
  background: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  announcementChime: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
};

export const TRANSLATIONS: Record<Language, any> = {
  EN: {
    nav: { new: 'NEW ARRIVALS', dresses: 'DRESSES', jackets: 'JACKETS', collections: 'COLLECTIONS', virtual: 'VIRTUAL ROOM', production: 'ATELIER' },
    hero: { tag: 'Spring 2024 Collection', title: 'Elegance Redefined.', sub: 'Discover the perfect harmony of luxury dresses and sophisticated jackets.', shopDresses: 'Shop Dresses', viewJackets: 'View Jackets' },
    promo: { title: 'Special Offers', flash: 'Flash Sale', flashTitle: 'Floral Weekend', bundle: 'The Perfect Duo', bundleTitle: 'Jacket + Dress', gift: 'New Members', giftTitle: 'First Purchase', claim: 'Shop Now', save: 'Save', giftSub: 'Botanical Scarf Gift' },
    shop: { title: 'The Essentials', sub: 'Curated selection of floral prints, luxury silk, and timeless silhouettes.' },
    virtual: { title: 'Virtual Advertising.', sub: 'Experience our collection in any environment.', day: 'Daylight', night: 'Midnight', fit: 'AI Fit: 98% Correct', texture: 'Pure Silk Texture', enter: 'Enter Virtual Fitting Room' },
    production: { title: 'Artisan Craftsmanship', sub: 'The journey of every garment starts in our private atelier in Europe.', stages: ['Design & Sketching', 'Fabric Sourcing', 'Master Tailoring'], materials: 'Finest Italian Silk & Wool', ethical: '100% Ethical Production' },
    social: { title: 'Follow Our Journey', sub: 'Join our community for daily inspiration and behind-the-scenes looks.', follow: 'Follow @vogueaura' },
    assistant: { welcome: 'Welcome to Vogue Aura. I am Elena, your personal stylist. How can I help you today?', input: 'Ask Elena for styling advice...' },
    audio: { radio: 'Vogue Aura Radio', playing: 'Now Playing', announcement: 'Special Atelier Update' }
  },
  RU: {
    nav: { new: 'НОВИНКИ', dresses: 'ПЛАТЬЯ', jackets: 'КУРТКИ', collections: 'КОЛЛЕКЦИИ', virtual: 'ВИРТУАЛЬНАЯ', production: 'АТЕЛЬЕ' },
    hero: { tag: 'Коллекция Весна 2024', title: 'Истинное изящество.', sub: 'Откройте гармонию роскошных платьев и изысканных курток для современной женщины.', shopDresses: 'Купить платья', viewJackets: 'Смотреть куртки' },
    promo: { title: 'Акции и предложения', flash: 'Флэш-распродажа', flashTitle: 'Цветочный уикенд', bundle: 'Идеальный дуэт', bundleTitle: 'Куртка + Платье', gift: 'Для новых клиентов', giftTitle: 'Первая покупка', claim: 'Участвовать', save: 'Скидка', giftSub: 'Шелковый шарф в подарок' },
    shop: { title: 'Основа гардероба', sub: 'Кураторская подборка цветочных принтов, роскошного шелка и вечных силуэтов.' },
    virtual: { title: 'Виртуальная реклама.', sub: 'Примерьте нашу коллекцию в любой обстановке.', day: 'Дневной свет', night: 'Полночь', fit: 'AI Посадка: 98%', texture: 'Натуральный шелк', enter: 'Войти в примерочную' },
    production: { title: 'Наше производство', sub: 'Путь каждого изделия начинается в нашем закрытом ателье в Европе.', stages: ['Дизайн и эскизы', 'Подбор тканей', 'Мастерство пошива'], materials: 'Лучший итальянский шелк и шерсть', ethical: '100% этичное производство' },
    social: { title: 'Следите за нами', sub: 'Присоединяйтесь к нашему сообществу для вдохновения и эксклюзивных кадров.', follow: 'Подписаться @vogueaura' },
    assistant: { welcome: 'Добро пожаловать в Vogue Aura. Я Елена, ваш стилист. Как я могу помочь вам сегодня?', input: 'Спросите Елену о стиле...' },
    audio: { radio: 'Радио Vogue Aura', playing: 'Сейчас в эфире', announcement: 'Обновление ателье' }
  },
  ZH: {
    nav: { new: '新品上市', dresses: '连衣裙', jackets: '外套', collections: '系列', virtual: '虚拟展厅', production: '制作工艺' },
    hero: { tag: '2024 春季系列', title: '优雅，重新定义。', sub: '为现代女性发现奢华连衣裙与精致外套的完美和谐。', shopDresses: '选购连衣裙', viewJackets: '查看外套' },
    promo: { title: '特别优惠', flash: '限时抢购', flashTitle: '花卉周末', bundle: '完美搭配', bundleTitle: '外套 + 连衣裙', gift: '新会员', giftTitle: '首次购买', claim: '立即选购', save: '节省', giftSub: '赠送植物印花丝巾' },
    shop: { title: '精选必备', sub: '精心挑选的花卉印花、奢华真丝和永恒廓形。' },
    virtual: { title: '虚拟广告', sub: '在任何环境下体验我们的系列。', day: '日光', night: '午夜', fit: 'AI 契合度：98%', texture: '纯丝质感', enter: '进入虚拟试衣间' },
    production: { title: '匠心工艺', sub: '每一件成衣的旅程都始于我们在欧洲的私人工作室。', stages: ['设计与草图', '面料采购', '大师裁剪'], materials: '顶尖意大利真丝与羊毛', ethical: '100% 环保伦理生产' },
    social: { title: '关注我们', sub: '加入我们的社区，获取每日灵感 and 幕后花絮。', follow: '关注 @vogueaura' },
    assistant: { welcome: '欢迎来到 Vogue Aura。我是您的私人造型师 Elena。今天有什么可以帮您的吗？', input: '向 Elena 咨询造型建议...' },
    audio: { radio: 'Vogue Aura 电台', playing: '正在播放', announcement: '工坊特别更新' }
  }
};

export const PRODUCTS: Product[] = [
  {
    id: 'd1',
    name: 'Silk Evening Gown',
    price: 249.99,
    category: 'Dresses',
    description: 'A luxurious silk gown for special occasions with delicate hand-stitched floral embroidery.',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
    tag: 'Trending',
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'd5',
    name: 'Peony Bloom Maxi',
    price: 129.00,
    category: 'Dresses',
    description: 'Flowing maxi dress featuring a vibrant peony print, perfect for garden parties.',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop',
    tag: 'Floral Choice',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'j1',
    name: 'Quilted Winter Puffer',
    price: 189.50,
    category: 'Jackets',
    description: 'Ultra-warm quilted jacket with thermal lining and subtle floral inner print.',
    imageUrl: 'https://images.unsplash.com/photo-1544022613-e87ce74565ad?q=80&w=600&auto=format&fit=crop',
    tag: 'New',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'd2',
    name: 'Floral Summer Wrap',
    price: 89.00,
    category: 'Dresses',
    description: 'Lightweight and breathable floral wrap dress with a romantic daisy pattern.',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M']
  },
  {
    id: 'j2',
    name: 'Classic Leather Moto',
    price: 299.00,
    category: 'Jackets',
    description: 'Genuine leather jacket with asymmetric zip and embossed floral details on the back.',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop',
    tag: 'Best Seller',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'd6',
    name: 'Wild Rose Cocktail',
    price: 145.00,
    category: 'Dresses',
    description: 'A structural cocktail dress with 3D rose appliqués along the neckline.',
    imageUrl: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=600&auto=format&fit=crop',
    tag: 'Exclusive',
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'd3',
    name: 'Velvet Cocktail Dress',
    price: 159.99,
    category: 'Dresses',
    description: 'Sophisticated velvet mini dress in deep emerald with a floral lace trim.',
    imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600&auto=format&fit=crop',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'j3',
    name: 'Wool Blend Trench',
    price: 320.00,
    category: 'Jackets',
    description: 'Elegant wool-blend trench coat for professional style, featuring a bouquet brooch.',
    imageUrl: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=600&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL']
  }
];
