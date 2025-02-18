export const mockOrders = [
  {
    id: 1,
    customerName: "João Silva",
    items: [
      { name: "X-Burger", quantity: 2, price: 15.90 },
      { name: "Refrigerante", quantity: 2, price: 5.90 }
    ],
    total: 43.60,
    status: "pending",
    createdAt: new Date()
  },
  {
    id: 2,
    customerName: "Maria Santos",
    items: [
      { name: "X-Bacon", quantity: 1, price: 18.90 },
      { name: "Batata Frita", quantity: 1, price: 8.90 },
      { name: "Milk Shake", quantity: 1, price: 12.90 }
    ],
    total: 40.70,
    status: "preparing",
    createdAt: new Date()
  },
  {
    id: 3,
    customerName: "Pedro Oliveira",
    items: [
      { name: "Hot Dog", quantity: 3, price: 10.90 },
      { name: "Refrigerante", quantity: 3, price: 5.90 }
    ],
    total: 50.40,
    status: "ready",
    createdAt: new Date()
  }
];