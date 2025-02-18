import { ThemeProvider } from '@mui/material';
import { CaixaPage } from './pages/Caixa/CaixaPage';
import { PedidosPage } from './pages/Pedidos/PedidosPage';
import { RelatoriosPage } from './pages/Relatorios/RelatoriosPage';
import { ProdutosPage } from './pages/Produtos/ProdutosPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/caixa" element={<CaixaPage />} />
            <Route path="/pedidos" element={<PedidosPage />} />
            <Route path="/relatorios" element={<RelatoriosPage />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/" element={<div>Página Inicial</div>} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App
