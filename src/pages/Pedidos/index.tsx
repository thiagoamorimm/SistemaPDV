import { useState } from "react";
import { Container } from "./styles";
import { mockOrders } from "./mockData";

interface Order {
  id: number;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered";
  createdAt: Date;
}

export function Pedidos() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<Order["status"] | "all">("all");

  const getStatusColor = (status: Order["status"]): string => {
    const colors = {
      pending: "#f1c40f",
      preparing: "#3498db",
      ready: "#2ecc71",
      delivered: "#95a5a6"
    };
    return colors[status];
  };

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <Container>
      <div className="header">
        <h2>Gerenciamento de Pedidos</h2>
        <div className="status-filter">
          <button 
            className={`filter-button all ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Todos
          </button>
          <button 
            className={`filter-button pending ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Aguardando
          </button>
          <button 
            className={`filter-button preparing ${filter === "preparing" ? "active" : ""}`}
            onClick={() => setFilter("preparing")}
          >
            Em Preparo
          </button>
          <button 
            className={`filter-button ready ${filter === "ready" ? "active" : ""}`}
            onClick={() => setFilter("ready")}
          >
            Pronto
          </button>
          <button 
            className={`filter-button delivered ${filter === "delivered" ? "active" : ""}`}
            onClick={() => setFilter("delivered")}
          >
            Entregue
          </button>
        </div>
      </div>

      <div className="orders-list">
        {filteredOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">Pedido #{order.id}</span>
              <span className="order-time">
                {new Date(order.createdAt).toLocaleTimeString('pt-BR')}
              </span>
            </div>
            <div className="order-customer">Cliente: {order.customerName}</div>
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.quantity}x {item.name}</span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-footer">
              <span className="order-total">Total: R$ {order.total.toFixed(2)}</span>
              <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                {order.status === 'pending' && 'Aguardando'}
                {order.status === 'preparing' && 'Em Preparo'}
                {order.status === 'ready' && 'Pronto'}
                {order.status === 'delivered' && 'Entregue'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}