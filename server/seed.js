const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// SVG templates for default product images
const SVG = {
  playstation_console: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%2307080d"/><text x="200" y="200" fill="%230043e0" font-size="60" text-anchor="middle" dominant-baseline="middle">PS5</text></svg>`,
  playstation_game: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%2307080d"/><text x="200" y="200" fill="%230043e0" font-size="40" text-anchor="middle" dominant-baseline="middle">PS GAME</text></svg>`,
  xbox_console: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%2307080d"/><text x="200" y="200" fill="%2339ff14" font-size="50" text-anchor="middle" dominant-baseline="middle">XBOX</text></svg>`,
  xbox_game: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%2307080d"/><text x="200" y="200" fill="%2339ff14" font-size="40" text-anchor="middle" dominant-baseline="middle">XBOX GAME</text></svg>`,
  nintendo_console: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%2307080d"/><text x="200" y="200" fill="%23e60012" font-size="40" text-anchor="middle" dominant-baseline="middle">SWITCH</text></svg>`,
  nintendo_game: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%2307080d"/><text x="200" y="200" fill="%23e60012" font-size="35" text-anchor="middle" dominant-baseline="middle">SW GAME</text></svg>`,
};

const seedProducts = [
  {
    title: 'Sony PlayStation 5 Slim Edition',
    title_ar: 'سوني بلايستيشن 5 سليم',
    price: 84000,
    category: 'playstation',
    type: 'console',
    image: SVG.playstation_console,
    description: 'استمتع بتحميل فائق السرعة مع وسيط تخزين ذو حالة ثابتة (SSD) فائق السرعة.',
    inStock: true,
    stock: 10,
  },
  {
    title: 'Xbox Series X 1TB Console',
    title_ar: 'إكس بوكس سيريس إكس 1 تيرابايت',
    price: 79000,
    category: 'xbox',
    type: 'console',
    image: SVG.xbox_console,
    description: 'أسرع وأقوى جهاز Xbox على الإطلاق. العب آلاف العناوين من أربعة أجيال.',
    inStock: true,
    stock: 8,
  },
  {
    title: 'Nintendo Switch OLED Model',
    title_ar: 'نينتندو سويتش نموذج أوليد',
    price: 58000,
    category: 'nintendo',
    type: 'console',
    image: SVG.nintendo_console,
    description: 'يتميز بشاشة OLED نابضة بالحياة مقاس 7 بوصات وحامل عريض قابل للتعديل.',
    inStock: true,
    stock: 15,
  },
  {
    title: 'Spider-Man 2 - PS5',
    title_ar: 'سبايدر مان 2 - بلايستيشن 5',
    price: 6500,
    category: 'playstation',
    type: 'game',
    image: SVG.playstation_game,
    description: 'مغامرة ملحمية مع بيتر باركر ومايلز موراليس في مدينة نيويورك.',
    inStock: true,
    stock: 25,
  },
  {
    title: 'Forza Horizon 5 - Xbox',
    title_ar: 'فورزا هورايزون 5 - إكس بوكس',
    price: 5800,
    category: 'xbox',
    type: 'game',
    image: SVG.xbox_game,
    description: 'تجربة سباق مفتوحة العالم في المكسيك بأجمل المناظر الطبيعية.',
    inStock: true,
    stock: 20,
  },
  {
    title: 'The Legend of Zelda: Tears of the Kingdom',
    title_ar: 'زيلدا: دموع المملكة - سويتش',
    price: 6200,
    category: 'nintendo',
    type: 'game',
    image: SVG.nintendo_game,
    description: 'مغامرة ملحمية في عالم هايرول الشاسع مع إمكانيات بناء لا حدود لها.',
    inStock: true,
    stock: 18,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gaming_store');
    console.log('✅ MongoDB Connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert seed data
    const inserted = await Product.insertMany(seedProducts);
    console.log(`🌱 Seeded ${inserted.length} products successfully`);

    console.log('\n📦 Products in database:');
    inserted.forEach((p) => {
      console.log(`  - [${p.category.toUpperCase()}] ${p.title} — ${p.price} DZD`);
    });

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seed();
