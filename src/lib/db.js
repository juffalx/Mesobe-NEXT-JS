/**
 * In-memory mock database and helper utilities for Addis Eats.
 * Provides data access functions for dishes, orders, and session management.
 */

// Mock dish records
const mockDishes = [
  {
    id: 'dish_1',
    name: 'Doro Wat',
    description:
      'Traditional spicy chicken stew served with injera and boiled egg.',
    price: 350,
    currency: 'ETB',
    category: 'Main',
    available: true,
  },
  {
    id: 'dish_2',
    name: 'Beyaynetu',
    description: 'Assorted vegan fasting dishes served on injera.',
    price: 220,
    currency: 'ETB',
    category: 'Vegetarian',
    available: true,
  },
  {
    id: 'dish_3',
    name: 'Kitfo',
    description: 'Minced beef seasoned with mitmita and niter kibbeh.',
    price: 400,
    currency: 'ETB',
    category: 'Main',
    available: true,
  },
  {
    id: 'dish_4',
    name: 'Shiro Tegabeno',
    description: 'Rich chickpea flour stew served bubbling hot in a clay pot.',
    price: 180,
    currency: 'ETB',
    category: 'Vegetarian',
    available: true,
  },
];

// In-memory orders store
const mockOrders = [
  {
    orderId: 'ORD-101',
    area: 'Bole',
    total: 1270,
    items: [
      { id: 'menu-1', name: 'Classic Doro Wat', price: 650, qty: 1 },
      { id: 'menu-6', name: 'Crisp Siga Derek Tibs', price: 620, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-102',
    area: 'Kazanchis',
    total: 1070,
    items: [
      { id: 'menu-2', name: 'Prime Siga Wat', price: 580, qty: 1 },
      { id: 'menu-5', name: 'Shiro Bozena', price: 490, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-103',
    area: 'Megenagna',
    total: 1360,
    items: [{ id: 'menu-7', name: 'Awaze Lamb Tibs', price: 680, qty: 2 }],
  },
  {
    orderId: 'ORD-104',
    area: 'Piassa',
    total: 1200,
    items: [
      { id: 'menu-10', name: 'Prime Beef Kitfo', price: 720, qty: 1 },
      {
        id: 'menu-13',
        name: 'Full Vegan Beyaynetu Platter',
        price: 480,
        qty: 1,
      },
    ],
  },
  {
    orderId: 'ORD-105',
    area: 'Sarbet',
    total: 750,
    items: [
      { id: 'menu-11', name: 'Highland Gored Gored', price: 750, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-106',
    area: 'CMC',
    total: 790,
    items: [
      { id: 'menu-18', name: 'House Fermented Tej', price: 350, qty: 1 },
      { id: 'menu-14', name: 'Highland Red Misir Wat', price: 360, qty: 1 },
      { id: 'menu-19', name: 'Jebena Coffee', price: 80, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-108',
    area: 'Kazanchis',
    total: 980,
    items: [
      { id: 'menu-4', name: 'Clay-Pot Shiro Tegamino', price: 420, qty: 1 },
      { id: 'menu-12', name: 'Addis Style Dulet', price: 560, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-109',
    area: 'Megenagna',
    total: 1440,
    items: [
      { id: 'menu-1', name: 'Classic Doro Wat', price: 650, qty: 2 },
      { id: 'menu-20', name: 'Highland Spiced Shai', price: 70, qty: 2 },
    ],
  },
  {
    orderId: 'ORD-110',
    area: 'Piassa',
    total: 840,
    items: [
      { id: 'menu-9', name: 'Lake Tana Crispy Fish Tibs', price: 560, qty: 1 },
      { id: 'menu-15', name: 'Golden Kik Alicha', price: 280, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-111',
    area: 'Sarbet',
    total: 1240,
    items: [
      { id: 'menu-6', name: 'Crisp Siga Derek Tibs', price: 620, qty: 2 },
    ],
  },
  {
    orderId: 'ORD-112',
    area: 'CMC',
    total: 600,
    items: [
      { id: 'menu-16', name: "Braised Ye'abesha Gomen", price: 320, qty: 1 },
      { id: 'menu-17', name: 'Fresh Timatim Fitfit', price: 280, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-114',
    area: 'Kazanchis',
    total: 680,
    items: [{ id: 'menu-7', name: 'Awaze Lamb Tibs', price: 680, qty: 1 }],
  },
  {
    orderId: 'ORD-115',
    area: 'Megenagna',
    total: 960,
    items: [
      { id: 'menu-2', name: 'Prime Siga Wat', price: 580, qty: 1 },
      { id: 'menu-8', name: 'Spicy Quanta Firfir', price: 380, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-116',
    area: 'Piassa',
    total: 1140,
    items: [
      { id: 'menu-3', name: 'Beg Alicha Wat', price: 620, qty: 1 },
      { id: 'menu-5', name: 'Shiro Bozena', price: 520, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-117',
    area: 'Sarbet',
    total: 1060,
    items: [
      {
        id: 'menu-13',
        name: 'Full Vegan Beyaynetu Platter',
        price: 480,
        qty: 2,
      },
      { id: 'menu-20', name: 'Highland Spiced Shai', price: 100, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-118',
    area: 'CMC',
    total: 700,
    items: [{ id: 'menu-18', name: 'House Fermented Tej', price: 350, qty: 2 }],
  },
  {
    orderId: 'ORD-119',
    area: 'Bole',
    total: 1340,
    items: [
      { id: 'menu-11', name: 'Highland Gored Gored', price: 750, qty: 1 },
      { id: 'menu-4', name: 'Clay-Pot Shiro Tegamino', price: 590, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-121',
    area: 'Megenagna',
    total: 1200,
    items: [
      { id: 'menu-6', name: 'Crisp Siga Derek Tibs', price: 620, qty: 1 },
      { id: 'menu-12', name: 'Addis Style Dulet', price: 580, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-122',
    area: 'Piassa',
    total: 760,
    items: [
      { id: 'menu-15', name: 'Golden Kik Alicha', price: 340, qty: 1 },
      { id: 'menu-16', name: "Braised Ye'abesha Gomen", price: 420, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-123',
    area: 'Sarbet',
    total: 1300,
    items: [{ id: 'menu-1', name: 'Classic Doro Wat', price: 650, qty: 2 }],
  },
  {
    orderId: 'ORD-124',
    area: 'CMC',
    total: 900,
    items: [
      { id: 'menu-10', name: 'Prime Beef Kitfo', price: 720, qty: 1 },
      { id: 'menu-19', name: 'Jebena Coffee', price: 180, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-125',
    area: 'Bole',
    total: 1560,
    items: [
      { id: 'menu-7', name: 'Awaze Lamb Tibs', price: 680, qty: 2 },
      { id: 'menu-20', name: 'Highland Spiced Shai', price: 200, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-126',
    area: 'Kazanchis',
    total: 1160,
    items: [{ id: 'menu-2', name: 'Prime Siga Wat', price: 580, qty: 2 }],
  },
  {
    orderId: 'ORD-127',
    area: 'Megenagna',
    total: 840,
    items: [
      { id: 'menu-4', name: 'Clay-Pot Shiro Tegamino', price: 420, qty: 2 },
    ],
  },
  {
    orderId: 'ORD-128',
    area: 'Piassa',
    total: 1380,
    items: [
      { id: 'menu-11', name: 'Highland Gored Gored', price: 750, qty: 1 },
      { id: 'menu-6', name: 'Crisp Siga Derek Tibs', price: 630, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-129',
    area: 'Sarbet',
    total: 920,
    items: [
      { id: 'menu-5', name: 'Shiro Bozena', price: 490, qty: 1 },
      {
        id: 'menu-13',
        name: 'Full Vegan Beyaynetu Platter',
        price: 430,
        qty: 1,
      },
    ],
  },
  {
    orderId: 'ORD-130',
    area: 'CMC',
    total: 640,
    items: [
      { id: 'menu-17', name: 'Fresh Timatim Fitfit', price: 280, qty: 1 },
      { id: 'menu-14', name: 'Highland Red Misir Wat', price: 360, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-131',
    area: 'Bole',
    total: 1040,
    items: [
      { id: 'menu-8', name: 'Spicy Quanta Firfir', price: 540, qty: 1 },
      { id: 'menu-9', name: 'Lake Tana Crispy Fish Tibs', price: 500, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-132',
    area: 'Kazanchis',
    total: 700,
    items: [{ id: 'menu-18', name: 'House Fermented Tej', price: 350, qty: 2 }],
  },
  {
    orderId: 'ORD-133',
    area: 'Megenagna',
    total: 1240,
    items: [{ id: 'menu-3', name: 'Beg Alicha Wat', price: 620, qty: 2 }],
  },
  {
    orderId: 'ORD-134',
    area: 'Piassa',
    total: 800,
    items: [
      { id: 'menu-12', name: 'Addis Style Dulet', price: 580, qty: 1 },
      { id: 'menu-15', name: 'Golden Kik Alicha', price: 220, qty: 1 },
    ],
  },
  {
    orderId: 'ORD-135',
    area: 'Sarbet',
    total: 1440,
    items: [{ id: 'menu-10', name: 'Prime Beef Kitfo', price: 720, qty: 2 }],
  },
];

// Mock authenticated user session
const mockSessionUser = {
  id: 'user_addis_101',
  name: 'Abebe Bikila',
  email: 'abebe@example.com',
};

/**
 * ORM-style database query interface
 */
export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((dish) => dish.id === where.id) || null,
  },
  order: {
    findMany: async () => getOrders(),
  },
};

/**
 * Fetch all dishes
 */
export async function getDishes() {
  return [...mockDishes];
}

/**
 * Fetch a single dish by ID
 */
export async function getDish(id) {
  return mockDishes.find((dish) => dish.id === id) || null;
}

/**
 * Retrieve orders with deterministic sample dates for older mock records.
 * Existing createdAt values are preserved.
 *
 * Dates generated for records without dates are synthetic demo data,
 * not real historical order timestamps.
 */
export async function getOrders() {
  return mockOrders.map((order, index) => ({
    ...order,
    createdAt:
      order.createdAt ??
      new Date(Date.UTC(2026, 9, 1 + (index % 14), 9)).toISOString(),
  }));
}

/**
 * Retrieve a single order by orderId or legacy id.
 */
export async function getOrder(id) {
  return (
    mockOrders.find((order) => order.orderId === id || order.id === id) || null
  );
}

/**
 * Create a new order in memory.
 */
export async function createOrder(data) {
  const newOrder = {
    ...data,
    orderId: `ORD-${Date.now()}`,
    status: 'PENDING',
    userId: mockSessionUser.id,
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);
  return newOrder;
}

/**
 * Mark an order as cancelled.
 */
export async function markCancelled(id) {
  const order = mockOrders.find(
    (item) => item.orderId === id || item.id === id
  );

  if (!order) {
    throw new Error('Order not found');
  }

  order.status = 'CANCELLED';
  order.updatedAt = new Date().toISOString();

  return order;
}

/**
 * Read current authenticated user session.
 */
export async function getSession() {
  return mockSessionUser;
}
