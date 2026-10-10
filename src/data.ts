export interface MenuItem {
  id?: string;
  name: string;
  price: number;
  description: string;
  unavailable?: boolean;
  badge?: 'Bestseller' | "Chef's Special" | 'Must Try' | 'High Protein' | 'Popular';
  isSpicy?: boolean;
  calories?: string;
  prepTime?: string;
  rating?: number;
  reviewsCount?: number;
  pairings?: string[];
  tags?: string[];
}

export interface Category {
  id: string;
  title: string;
  tagline: string;
  image: string;
  unavailable?: boolean;
  items: MenuItem[];
}

export const categories: Category[] = [
  {
    id: "burgers",
    title: "Burgers",
    tagline: "JUICY & FRESH",
    image: "/veg_burger.jpg",
    items: [
      { 
        id: "spicy-burger",
        name: "Spicy Burger", 
        price: 80,
        description: "Crispy spiced veg patty layered with fresh lettuce, onions, and our signature fiery house sauce.",
        badge: "Bestseller",
        isSpicy: true,
        calories: "380 kcal",
        prepTime: "8-10 mins",
        rating: 4.9,
        reviewsCount: 142,
        pairings: ["Virgin Mojito", "Piri Piri Fries"],
        tags: ["burger", "spicy", "bestseller", "under100"]
      },
      { 
        id: "jumbo-burger",
        name: "Jumbo Burger", 
        price: 90,
        description: "Double seasoned veg patties loaded with melted cheese, crunchy veggies, and tangy secret mayo.",
        badge: "Must Try",
        calories: "490 kcal",
        prepTime: "10-12 mins",
        rating: 4.8,
        reviewsCount: 96,
        pairings: ["Classic Cold Coffee", "Loaded Fries"],
        tags: ["burger", "cheese", "under100"]
      },
      { 
        id: "paneer-burger",
        name: "Paneer Burger", 
        price: 110,
        description: "Thick slab of golden grilled cottage cheese tossed in tandoori seasoning with mint herb mayo in a butter-toasted bun.",
        badge: "Chef's Special",
        calories: "440 kcal",
        prepTime: "10-12 mins",
        rating: 4.9,
        reviewsCount: 118,
        pairings: ["Peach Iced Tea", "Salted Fries"],
        tags: ["burger", "paneer", "protein"]
      }
    ]
  },
  {
    id: "momos",
    title: "Momos",
    tagline: "HOT & STEAMY",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=800",
    unavailable: true,
    items: [
      { 
        id: "veg-momos",
        name: "Veg Momos", 
        price: 80,
        unavailable: true,
        description: "Handcrafted steamed dumplings stuffed with finely minced vegetables, garlic, and mountain herbs.",
        calories: "210 kcal",
        prepTime: "10 mins",
        rating: 4.7,
        reviewsCount: 52,
        tags: ["momos", "steamed", "under100"]
      },
      { 
        id: "paneer-momos",
        name: "Paneer Momos", 
        price: 100,
        unavailable: true,
        description: "Steamed Himalayan-style dumplings packed with fresh spiced paneer and coriander.",
        calories: "280 kcal",
        prepTime: "10 mins",
        rating: 4.8,
        reviewsCount: 64,
        tags: ["momos", "paneer"]
      },
      { 
        id: "cheese-corn-momos",
        name: "Cheese & Corn Momos", 
        price: 140,
        unavailable: true,
        description: "Mouthwatering steamed dumplings overflowing with creamy mozzarella cheese and sweet corn.",
        calories: "340 kcal",
        prepTime: "10 mins",
        rating: 4.9,
        reviewsCount: 71,
        tags: ["momos", "cheese"]
      }
    ]
  },
  {
    id: "shakes",
    title: "Shakes",
    tagline: "THICK & CREAMY",
    image: "/vibrant_shake.jpg",
    items: [
      { 
        id: "oreo-shake",
        name: "Oreo Shake", 
        price: 80,
        description: "Velvety thick milkshake churned with crumbled Oreo biscuits and vanilla bean ice cream.",
        badge: "Bestseller",
        calories: "360 kcal",
        prepTime: "5 mins",
        rating: 4.9,
        reviewsCount: 184,
        pairings: ["Spicy Burger", "Salted Fries"],
        tags: ["shake", "sweet", "bestseller", "under100"]
      },
      { 
        id: "kitkat-shake",
        name: "KitKat Shake", 
        price: 80,
        description: "Thick creamy shake blended with real crispy KitKat bars, chocolate drizzle, and malt.",
        badge: "Popular",
        calories: "375 kcal",
        prepTime: "5 mins",
        rating: 4.8,
        reviewsCount: 120,
        pairings: ["High on Masala", "Piri Piri Fries"],
        tags: ["shake", "sweet", "under100"]
      },
      { 
        id: "nutella-shake",
        name: "Nutella Shake", 
        price: 130,
        description: "Rich Italian hazelnut cocoa thick shake generously loaded with authentic Nutella and whipped swirl.",
        badge: "Chef's Special",
        calories: "450 kcal",
        prepTime: "5-6 mins",
        rating: 5.0,
        reviewsCount: 165,
        pairings: ["Cheese & Corn Waffle", "Loaded Fries"],
        tags: ["shake", "sweet", "nutella"]
      },
      { 
        id: "peanut-butter-shake",
        name: "Peanut Butter Shake", 
        price: 130,
        description: "Creamy roasted peanut butter blended with farm-fresh milk and caramel for the ultimate nutty treat.",
        calories: "480 kcal",
        prepTime: "5 mins",
        rating: 4.7,
        reviewsCount: 88,
        tags: ["shake", "nutty", "protein"]
      },
      { 
        id: "chocolate-protein",
        name: "Chocolate Protein", 
        price: 160,
        description: "Energizing fitness shake packed with 24g pure whey protein and rich Dutch chocolate.",
        badge: "High Protein",
        calories: "260 kcal",
        prepTime: "5 mins",
        rating: 4.9,
        reviewsCount: 104,
        pairings: ["Butter Toast", "Paneer Burger"],
        tags: ["shake", "protein", "healthy"]
      },
      { 
        id: "vanilla-protein",
        name: "Vanilla Protein", 
        price: 160,
        description: "Clean, silky protein smoothie crafted with genuine Madagascar vanilla beans and whey protein isolate.",
        badge: "High Protein",
        calories: "250 kcal",
        prepTime: "5 mins",
        rating: 4.8,
        reviewsCount: 78,
        tags: ["shake", "protein", "healthy"]
      }
    ]
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    tagline: "GRILLED TO PERFECTION",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800",
    items: [
      { 
        id: "butter-toast",
        name: "Butter Toast", 
        price: 50,
        description: "Artisan bread golden toasted over a flat griddle and smothered in melted salted Amul butter.",
        calories: "180 kcal",
        prepTime: "4-5 mins",
        rating: 4.6,
        reviewsCount: 62,
        tags: ["sandwich", "breakfast", "under100"]
      },
      { 
        id: "high-on-cheese",
        name: "High on Cheese", 
        price: 70,
        description: "Warm, crusty grilled bread oozing with generous layers of melted mozzarella and cheddar.",
        badge: "Popular",
        calories: "320 kcal",
        prepTime: "6-8 mins",
        rating: 4.8,
        reviewsCount: 145,
        pairings: ["Virgin Mojito", "Piri Piri Fries"],
        tags: ["sandwich", "cheese", "under100"]
      },
      { 
        id: "cheese-corn",
        name: "Cheese & Corn", 
        price: 90,
        description: "Crispy grilled sandwich loaded with juicy sweet golden corn kernels and rich herbs-infused melted cheese.",
        badge: "Bestseller",
        calories: "340 kcal",
        prepTime: "6-8 mins",
        rating: 4.9,
        reviewsCount: 160,
        pairings: ["Lemon Iced Tea", "Loaded Fries"],
        tags: ["sandwich", "cheese", "bestseller", "under100"]
      },
      { 
        id: "jumbo-sandwich",
        name: "Jumbo Sandwich", 
        price: 110,
        description: "Massive triple-decker grilled club sandwich stuffed with seasonal veggies, potatoes, cheese, and spicy chutney.",
        badge: "Chef's Special",
        isSpicy: true,
        calories: "490 kcal",
        prepTime: "10-12 mins",
        rating: 4.9,
        reviewsCount: 122,
        pairings: ["Classic Cold Coffee"],
        tags: ["sandwich", "spicy", "heavy"]
      },
      { 
        id: "high-on-masala",
        name: "High on Masala", 
        price: 110,
        description: "Fiery street-style Bombay masala toastie bursting with zesty potato bhaji, bell peppers, cheese, and sev.",
        badge: "Must Try",
        isSpicy: true,
        calories: "410 kcal",
        prepTime: "8-10 mins",
        rating: 4.9,
        reviewsCount: 138,
        pairings: ["Peach Iced Tea"],
        tags: ["sandwich", "spicy"]
      }
    ]
  },
  {
    id: "beverages",
    title: "Mocktails & Coffee",
    tagline: "CHILL OUT",
    image: "/colorful_mocktails.jpg",
    items: [
      { 
        id: "virgin-mojito",
        name: "Virgin Mojito", 
        price: 60,
        description: "Ultra-crisp muddled fresh garden mint, tangy Persian limes, crushed ice, and effervescent sparkling soda.",
        badge: "Bestseller",
        calories: "90 kcal",
        prepTime: "4 mins",
        rating: 5.0,
        reviewsCount: 210,
        pairings: ["Spicy Burger", "Piri Piri Fries"],
        tags: ["beverages", "cold", "bestseller", "under100"]
      },
      { 
        id: "peach-iced-tea",
        name: "Peach Iced Tea", 
        price: 70,
        description: "Slow-brewed Ceylon black tea delicately sweetened with sunny Georgia peach nectar and mint.",
        badge: "Popular",
        calories: "85 kcal",
        prepTime: "4 mins",
        rating: 4.8,
        reviewsCount: 95,
        pairings: ["Paneer Burger", "Cheese & Corn"],
        tags: ["beverages", "tea", "under100"]
      },
      { 
        id: "lemon-iced-tea",
        name: "Lemon Iced Tea", 
        price: 70,
        description: "Refreshing citrus burst with cold-brewed tea, fresh lemon slices, and a dash of raw sugar.",
        calories: "75 kcal",
        prepTime: "4 mins",
        rating: 4.7,
        reviewsCount: 84,
        tags: ["beverages", "tea", "under100"]
      },
      { 
        id: "classic-cold-coffee",
        name: "Classic Cold Coffee", 
        price: 70,
        description: "Bold dark roast espresso blended with chilled milk and ice cream until frothy and velvety smooth.",
        badge: "Bestseller",
        calories: "210 kcal",
        prepTime: "5 mins",
        rating: 4.9,
        reviewsCount: 230,
        pairings: ["Jumbo Burger", "Nutella Waffle"],
        tags: ["beverages", "coffee", "bestseller", "under100"]
      },
      { 
        id: "hazelnut-cold-coffee",
        name: "Hazelnut Cold Coffee", 
        price: 80,
        description: "Fragrant roasted hazelnuts paired with rich creamy cold brew and milk froth.",
        badge: "Chef's Special",
        calories: "240 kcal",
        prepTime: "5 mins",
        rating: 4.9,
        reviewsCount: 140,
        pairings: ["KitKat Waffle"],
        tags: ["beverages", "coffee", "under100"]
      },
      { 
        id: "caramel-cold-coffee",
        name: "Caramel Cold Coffee", 
        price: 80,
        description: "Silky iced espresso laced with buttery salted caramel syrup and topped with caramel drizzle.",
        calories: "250 kcal",
        prepTime: "5 mins",
        rating: 4.8,
        reviewsCount: 112,
        tags: ["beverages", "coffee", "under100"]
      }
    ]
  },
  {
    id: "fries",
    title: "Fries",
    tagline: "CRISPY & SALTY",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=800",
    items: [
      { 
        id: "salted-fries",
        name: "Salted Fries", 
        price: 70,
        description: "Crispy double-cooked potato batons with a fluffy interior, lightly tossed in sea salt.",
        calories: "280 kcal",
        prepTime: "5-6 mins",
        rating: 4.7,
        reviewsCount: 89,
        tags: ["fries", "snack", "under100"]
      },
      { 
        id: "piri-piri-fries",
        name: "Piri Piri Fries", 
        price: 80,
        description: "Golden crispy fries shaken vigorously in our house peri-peri spice blend with smoked paprika.",
        badge: "Bestseller",
        isSpicy: true,
        calories: "295 kcal",
        prepTime: "5-6 mins",
        rating: 4.9,
        reviewsCount: 220,
        pairings: ["Spicy Burger", "Virgin Mojito"],
        tags: ["fries", "spicy", "bestseller", "under100"]
      },
      { 
        id: "loaded-fries",
        name: "Loaded Fries", 
        price: 110,
        description: "Piping hot crunchy fries drenched in warm liquid cheddar cheese, jalapeños, and tangy BBQ sauce.",
        badge: "Must Try",
        calories: "430 kcal",
        prepTime: "7-8 mins",
        rating: 4.9,
        reviewsCount: 178,
        pairings: ["Classic Cold Coffee", "Virgin Mojito"],
        tags: ["fries", "cheese", "snack"]
      }
    ]
  },
  {
    id: "waffles",
    title: "Waffles & Pancakes",
    tagline: "SWEET DELIGHT",
    image: "/waffle_stack.jpg",
    items: [
      { 
        id: "mini-pancakes-6",
        name: "Mini Pancakes (6 Pcs)", 
        price: 60,
        description: "Six warm, fluffy silver-dollar pancakes crowned with butter and golden maple syrup.",
        calories: "220 kcal",
        prepTime: "6-8 mins",
        rating: 4.8,
        reviewsCount: 86,
        tags: ["waffle", "sweet", "pancakes", "under100"]
      },
      { 
        id: "mini-pancakes-10",
        name: "Mini Pancakes (10 Pcs)", 
        price: 90,
        description: "Ten bite-sized golden hotcakes drenched in Belgian chocolate syrup and colorful sprinkles.",
        badge: "Popular",
        calories: "360 kcal",
        prepTime: "8 mins",
        rating: 4.9,
        reviewsCount: 115,
        tags: ["waffle", "sweet", "pancakes", "under100"]
      },
      { 
        id: "strawberry-waffle",
        name: "Strawberry Waffle", 
        price: 70,
        description: "Crispy golden Belgian waffle glazed with tangy strawberry preserve (Zero chocolate, perfect fruity indulgence).",
        calories: "280 kcal",
        prepTime: "7-9 mins",
        rating: 4.7,
        reviewsCount: 68,
        tags: ["waffle", "sweet", "fruity", "under100"]
      },
      { 
        id: "choco-delight-waffle",
        name: "Choco Delight Waffle", 
        price: 80,
        description: "Freshly pressed crispy waffle coated with rich warm dark chocolate sauce and chocolate curls.",
        calories: "340 kcal",
        prepTime: "7-9 mins",
        rating: 4.8,
        reviewsCount: 94,
        tags: ["waffle", "sweet", "chocolate", "under100"]
      },
      { 
        id: "kitkat-waffle",
        name: "KitKat Waffle", 
        price: 100,
        description: "Golden crispy grid waffle packed with crushed crunchy KitKat pieces and hot chocolate fudge.",
        badge: "Must Try",
        calories: "410 kcal",
        prepTime: "8 mins",
        rating: 4.9,
        reviewsCount: 142,
        tags: ["waffle", "sweet", "chocolate"]
      },
      { 
        id: "oreo-waffle",
        name: "Oreo Waffle", 
        price: 100,
        description: "Freshly baked waffle topped with crushed Oreo cookie crust and a double chocolate drizzle.",
        badge: "Popular",
        calories: "415 kcal",
        prepTime: "8 mins",
        rating: 4.8,
        reviewsCount: 130,
        tags: ["waffle", "sweet", "chocolate"]
      },
      { 
        id: "nutella-waffle",
        name: "Nutella Waffle", 
        price: 130,
        description: "Fresh Belgian waffle slathered generously with warm authentic Nutella hazelnut spread.",
        badge: "Bestseller",
        calories: "460 kcal",
        prepTime: "8 mins",
        rating: 5.0,
        reviewsCount: 240,
        pairings: ["Classic Cold Coffee"],
        tags: ["waffle", "sweet", "bestseller", "nutella"]
      },
      { 
        id: "biscoff-waffle",
        name: "Biscoff Waffle", 
        price: 130,
        description: "Artisanal waffle smothered in melted Lotus Biscoff caramelized speculoos spread and spiced biscuit crumbles.",
        badge: "Chef's Special",
        calories: "475 kcal",
        prepTime: "8 mins",
        rating: 5.0,
        reviewsCount: 195,
        pairings: ["Hazelnut Cold Coffee"],
        tags: ["waffle", "sweet", "biscoff"]
      }
    ]
  }
];

// Curated Specials & Combos
export const chefCombos = [
  {
    id: "combo-classic",
    title: "The Ghaziabad Hero",
    tagline: "Spicy Burger + Piri Piri Fries + Virgin Mojito",
    price: 200,
    originalPrice: 220,
    savings: 20,
    badge: "Most Ordered",
    image: "/veg_burger.jpg",
    items: ["Spicy Burger", "Piri Piri Fries", "Virgin Mojito"]
  },
  {
    id: "combo-sweet",
    title: "Sweet Cravings Duo",
    tagline: "Nutella Waffle + Classic Cold Coffee",
    price: 185,
    originalPrice: 200,
    savings: 15,
    badge: "Dessert Fix",
    image: "/waffle_stack.jpg",
    items: ["Nutella Waffle", "Classic Cold Coffee"]
  },
  {
    id: "combo-cheese",
    title: "Cheese Overload Platter",
    tagline: "Cheese & Corn Sandwich + Loaded Fries + Peach Iced Tea",
    price: 250,
    originalPrice: 270,
    savings: 20,
    badge: "Chef's Pick",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800",
    items: ["Cheese & Corn", "Loaded Fries", "Peach Iced Tea"]
  }
];
