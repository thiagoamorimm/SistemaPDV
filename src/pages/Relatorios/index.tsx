import { useState } from "react";
import { Container } from "./styles";
import { mockSalesReport, mockTopProducts } from "./mockData";

interface SalesReport {
  period: string;
  totalSales: number;
  totalOrders: number;
  averageTicket: number;
}

interface ProductReport {
  productId: number;
  name: string;
  quantitySold: number;
  revenue: number;
}

export function Relatorios() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Hoje");
  const [salesReport, setSalesReport] = useState<SalesReport[]>(mockSalesReport);
  const [topProducts, setTopProducts] = useState<ProductReport[]>(mockTopProducts);

  const currentReport = salesReport.find(report => report.period === selectedPeriod) || salesReport[0];

  return (
    <Container>
      <div className="header">
        <h2>Relatórios</h2>
        <div className="period-filter">
          {salesReport.map(report => (
            <button
              key={report.period}
              className={`filter-button ${selectedPeriod === report.period ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(report.period)}
            >
              {report.period}
            </button>
          ))}
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-card sales">
          <h3>Vendas</h3>
          <div className="metrics">
            <div className="metric">
              <span className="label">Total de Vendas</span>
              <span className="value">R$ {currentReport.totalSales.toFixed(2)}</span>
            </div>
            <div className="metric">
              <span className="label">Número de Pedidos</span>
              <span className="value">{currentReport.totalOrders}</span>
            </div>
            <div className="metric">
              <span className="label">Ticket Médio</span>
              <span className="value">R$ {currentReport.averageTicket.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="report-card products">
          <h3>Produtos Mais Vendidos</h3>
          <div className="top-products">
            {topProducts.map((product) => (
              <div key={product.productId} className="product-row">
                <span className="product-name">{product.name}</span>
                <span className="product-quantity">{product.quantitySold} un.</span>
                <span className="product-revenue">R$ {product.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}