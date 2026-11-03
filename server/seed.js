const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const diverseProducts = [
  // --- ELECTRONICS & ACCESSORIES ---
  {
    title: "RGB Mechanical Gaming Keyboard",
    price: 2499,
    originalPrice: 4999,
    category: "Electronics",
    description: "Blue switches ke sath tactile feedback, full RGB backlit keys aur durable braided cable.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    rating: { rate: 4.6, count: 480 },
  },
  {
    title: "Ergonomic Optical Gaming Mouse",
    price: 899,
    originalPrice: 1799,
    category: "Electronics",
    description: "6400 DPI optical sensor, lightweight ergonomic design aur customizable dynamic lighting.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    rating: { rate: 4.4, count: 320 },
  },
  {
    title: "Fast Wireless Charging Pad 15W",
    price: 699,
    originalPrice: 1499,
    category: "Electronics",
    description: "Qi-certified universal fast wireless charger, anti-slip surface aur auto temperature control.",
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=500&q=80",
    rating: { rate: 4.2, count: 215 },
  },
  {
    title: "65W GaN Multi-Port Fast Charger",
    price: 1599,
    originalPrice: 2999,
    category: "Electronics",
    description: "Type-C PD fast charging laptop aur smartphones dono ke liye compact size me.",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80",
    rating: { rate: 4.7, count: 540 },
  },
  {
    title: "Full HD 1080P Streaming Webcam",
    price: 1899,
    originalPrice: 3499,
    category: "Electronics",
    description: "Built-in dual noise reduction microphones aur privacy shutter ke sath crisp streaming clarity.",
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&q=80",
    rating: { rate: 4.3, count: 180 },
  },

  // --- AUDIO & WEARABLES ---
  {
    title: "Active Noise Cancelling Over-Ear Headphones",
    price: 3499,
    originalPrice: 6999,
    category: "Wearables",
    description: "Deep bass sound drivers, 40-hour long playback battery life aur comfortable memory foam ear cushions.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    rating: { rate: 4.7, count: 850 },
  },
  {
    title: "True Wireless Stereo Earbuds with ENC",
    price: 1299,
    originalPrice: 2999,
    category: "Wearables",
    description: "Touch controls, ultra-low latency gaming mode aur clear calling microphone experience.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    rating: { rate: 4.5, count: 1240 },
  },
  {
    title: "Bluetooth Calling Smartwatch with AMOLED Display",
    price: 2799,
    originalPrice: 5999,
    category: "Wearables",
    description: "Always-on AMOLED screen, heart rate, SpO2 monitoring aur 100+ sports activity modes.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    rating: { rate: 4.5, count: 620 },
  },
  {
    title: "Fitness Tracker Smart Band",
    price: 999,
    originalPrice: 1999,
    category: "Wearables",
    description: "Step counter, sleep quality monitor aur 14-day standby battery life with water resistance.",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    rating: { rate: 4.1, count: 310 },
  },
  {
    title: "Waterproof Portable Bluetooth Speaker",
    price: 1499,
    originalPrice: 2999,
    category: "Wearables",
    description: "IPX7 waterproof rating, 360-degree punchy stereo sound aur travel-friendly hook strap.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    rating: { rate: 4.6, count: 910 },
  },

  // --- FOOTWEAR & SHOES ---
  {
    title: "Retro Canvas High-Top Sneakers",
    price: 1299,
    originalPrice: 2499,
    category: "Footwear",
    description: "Classic streetwear look, breathable cotton canvas aur durable vulcanized rubber sole.",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80",
    rating: { rate: 4.3, count: 410 },
  },
  {
    title: "Ultralight Breathable Running Shoes",
    price: 1899,
    originalPrice: 3799,
    category: "Footwear",
    description: "Shock-absorbing EVA sole, mesh upper ventilation aur marathon-grade support.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    rating: { rate: 4.8, count: 1450 },
  },
  {
    title: "Genuine Leather Formal Oxford Shoes",
    price: 2299,
    originalPrice: 4500,
    category: "Footwear",
    description: "Premium finish polished leather, comfortable cushioned footbed for office and business suits.",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&q=80",
    rating: { rate: 4.4, count: 280 },
  },
  {
    title: "Comfort Slip-On Casual Loafers",
    price: 1149,
    originalPrice: 2199,
    category: "Footwear",
    description: "Easy slip-on styling, soft lining aur everyday casual comfort wear.",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&q=80",
    rating: { rate: 4.2, count: 195 },
  },

  // --- FASHION & APPAREL ---
  {
    title: "Heavyweight 100% Cotton Oversized Tee",
    price: 599,
    originalPrice: 1299,
    category: "Fashion",
    description: "240 GSM dense cotton fabric, relaxed streetwear drop-shoulder fit.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
    rating: { rate: 4.5, count: 530 },
  },
  {
    title: "Classic Denim Slim Fit Jacket",
    price: 1799,
    originalPrice: 3499,
    category: "Fashion",
    description: "Sturdy indigo wash denim, metallic buttons aur timeless layered styling.",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80",
    rating: { rate: 4.6, count: 340 },
  },
  {
    title: "Polarized UV400 Wayfarer Sunglasses",
    price: 499,
    originalPrice: 1499,
    category: "Fashion",
    description: "Anti-glare polarized lenses with sturdy acetate frame aur protective hard travel case.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
    rating: { rate: 4.3, count: 410 },
  },
  {
    title: "Slim Minimalist RFID Blocking Leather Wallet",
    price: 399,
    originalPrice: 999,
    category: "Fashion",
    description: "Compact front-pocket design, card pop-up mechanism aur digital theft protection.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
    rating: { rate: 4.4, count: 680 },
  },

  // --- LIFESTYLE & HOME ESSENTIALS ---
  {
    title: "Vacuum Insulated Stainless Steel Flask (750ml)",
    price: 649,
    originalPrice: 1299,
    category: "Lifestyle",
    description: "Double-wall vacuum insulation keeps drinks cold for 24 hrs aur hot for 12 hrs.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    rating: { rate: 4.7, count: 720 },
  },
  {
    title: "Water-Resistant Laptop Backpack with USB Port",
    price: 1399,
    originalPrice: 2899,
    category: "Lifestyle",
    description: "Fits up to 15.6 inch laptops, dedicated anti-theft pocket aur ergonomic shoulder padding.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    rating: { rate: 4.6, count: 980 },
  },
  {
    title: "Ceramic Minimalist Pour-Over Coffee Mug Set",
    price: 449,
    originalPrice: 899,
    category: "Lifestyle",
    description: "Handcrafted matte ceramic mugs with heat-resistant wooden coaster pads.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80",
    rating: { rate: 4.2, count: 160 },
  },
  {
    title: "Adjustable Aluminum Laptop & Tablet Stand",
    price: 799,
    originalPrice: 1799,
    category: "Lifestyle",
    description: "6-level ergonomic height adjustment, foldable portable design with cooling ventilation.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    rating: { rate: 4.6, count: 830 },
  },
  {
    title: "Desk Ambient Smart RGB Light Bar",
    price: 1199,
    originalPrice: 2499,
    category: "Electronics",
    description: "Sound reactive rhythm lighting modes, USB powered, setup aesthetic booster.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
    rating: { rate: 4.5, count: 420 },
  },
  {
    title: "Compact Mechanical Cable Organiser Bag",
    price: 299,
    originalPrice: 799,
    category: "Lifestyle",
    description: "Multi-slot waterproof organizer for chargers, hard disks, earphones and flash drives.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    rating: { rate: 4.1, count: 190 },
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB Atlas for seeding...");

    // Purana catalog clear karke naya catalog seed karna
    await Product.deleteMany({});
    console.log("✓ Old products cleared.");

    await Product.insertMany(diverseProducts);
    console.log(`✓ Successfully seeded ${diverseProducts.length} diverse products into ByteCart!`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
}

seedDatabase();