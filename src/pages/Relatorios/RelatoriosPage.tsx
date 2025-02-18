import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import {
  FileDownload as FileDownloadIcon,
  PictureAsPdf as PdfIcon,
  TableChart as ExcelIcon,
} from '@mui/icons-material';

interface FiltrosRelatorio {
  dataInicial: Date | null;
  dataFinal: Date | null;
  tipoRelatorio: string;
  produto: string;
  garcom: string;
}

interface DadosVenda {
  data: string;
  produto: string;
  quantidade: number;
  valorTotal: number;
  garcom: string;
  mesa: string;
}

export const RelatoriosPage: React.FC = () => {
  const [filtros, setFiltros] = useState<FiltrosRelatorio>({
    dataInicial: new Date(),
    dataFinal: new Date(),
    tipoRelatorio: 'vendas',
    produto: '',
    garcom: '',
  });

  // Dados mockados para exemplo
  const dadosVendas: DadosVenda[] = [
    { data: '2024-01-15', produto: 'Refrigerante Cola', quantidade: 10, valorTotal: 50.00, garcom: 'João', mesa: '01' },
    { data: '2024-01-15', produto: 'Água Mineral', quantidade: 15, valorTotal: 45.00, garcom: 'Maria', mesa: '02' },
    { data: '2024-01-16', produto: 'Cerveja', quantidade: 20, valorTotal: 200.00, garcom: 'João', mesa: '03' },
    { data: '2024-01-16', produto: 'Pizza', quantidade: 8, valorTotal: 240.00, garcom: 'Pedro', mesa: '04' },
    { data: '2024-01-17', produto: 'Hambúrguer', quantidade: 12, valorTotal: 180.00, garcom: 'Maria', mesa: '05' },
  ];

  const dadosVendasPorDia = [
    { data: '15/01', vendas: 95.00 },
    { data: '16/01', vendas: 440.00 },
    { data: '17/01', vendas: 180.00 },
  ];

  const dadosVendasPorProduto = [
    { nome: 'Refrigerante', valor: 50.00 },
    { nome: 'Água', valor: 45.00 },
    { nome: 'Cerveja', valor: 200.00 },
    { nome: 'Pizza', valor: 240.00 },
    { nome: 'Hambúrguer', valor: 180.00 },
  ];

  const dadosVendasPorGarcom = [
    { nome: 'João', valor: 250.00 },
    { nome: 'Maria', valor: 225.00 },
    { nome: 'Pedro', valor: 240.00 },
  ];

  const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const theme = useTheme();

  const handleFiltroChange = (campo: keyof FiltrosRelatorio, valor: any) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const handleExportar = (formato: 'pdf' | 'excel') => {
    // TODO: Implementar exportação
    console.log(`Exportando relatório em formato ${formato}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Resumo em Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Vendas Totais</Typography>
                <Typography variant="h4" component="div" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  R$ {dadosVendas.reduce((acc, curr) => acc + curr.valorTotal, 0).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Produtos Vendidos</Typography>
                <Typography variant="h4" component="div" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  {dadosVendas.reduce((acc, curr) => acc + curr.quantidade, 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Ticket Médio</Typography>
                <Typography variant="h4" component="div" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  R$ {(dadosVendas.reduce((acc, curr) => acc + curr.valorTotal, 0) / dadosVendas.length).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Total de Pedidos</Typography>
                <Typography variant="h4" component="div" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  {dadosVendas.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Relatórios
        </Typography>

        {/* Filtros */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Data Inicial"
                value={filtros.dataInicial}
                onChange={(newValue) => handleFiltroChange('dataInicial', newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Data Final"
                value={filtros.dataFinal}
                onChange={(newValue) => handleFiltroChange('dataFinal', newValue)}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Relatório</InputLabel>
                <Select
                  value={filtros.tipoRelatorio}
                  label="Tipo de Relatório"
                  onChange={(e) => handleFiltroChange('tipoRelatorio', e.target.value)}
                >
                  <MenuItem value="vendas">Vendas</MenuItem>
                  <MenuItem value="estoque">Estoque</MenuItem>
                  <MenuItem value="fluxoCaixa">Fluxo de Caixa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Produto</InputLabel>
                <Select
                  value={filtros.produto}
                  label="Produto"
                  onChange={(e) => handleFiltroChange('produto', e.target.value)}
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="refrigerante">Refrigerante</MenuItem>
                  <MenuItem value="agua">Água</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Garçom</InputLabel>
                <Select
                  value={filtros.garcom}
                  label="Garçom"
                  onChange={(e) => handleFiltroChange('garcom', e.target.value)}
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="joao">João</MenuItem>
                  <MenuItem value="maria">Maria</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabela de Dados */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Resultados
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<PdfIcon />}
                onClick={() => handleExportar('pdf')}
                sx={{ borderRadius: 2 }}
              >
                PDF
              </Button>
              <Button
                variant="outlined"
                startIcon={<ExcelIcon />}
                onClick={() => handleExportar('excel')}
                sx={{ borderRadius: 2 }}
              >
                Excel
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {/* Gráfico de Vendas por Dia */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>Vendas por Dia</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosVendasPorDia}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="vendas" stroke={theme.palette.primary.main} name="Vendas (R$)" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Gráfico de Vendas por Produto */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>Vendas por Produto</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosVendasPorProduto}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="valor" fill={theme.palette.primary.main} name="Valor (R$)" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Gráfico de Vendas por Garçom */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>Vendas por Garçom</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dadosVendasPorGarcom}
                      dataKey="valor"
                      nameKey="nome"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {dadosVendasPorGarcom.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Tabela de Vendas */}
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'primary.main' }}>
                      <TableCell sx={{ color: 'white' }}>Data</TableCell>
                      <TableCell sx={{ color: 'white' }}>Produto</TableCell>
                      <TableCell align="center" sx={{ color: 'white' }}>Quantidade</TableCell>
                      <TableCell align="right" sx={{ color: 'white' }}>Valor Total</TableCell>
                      <TableCell sx={{ color: 'white' }}>Garçom</TableCell>
                      <TableCell sx={{ color: 'white' }}>Mesa</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dadosVendas.map((venda, index) => (
                      <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                        <TableCell>{venda.data}</TableCell>
                        <TableCell>{venda.produto}</TableCell>
                        <TableCell align="center">{venda.quantidade}</TableCell>
                        <TableCell align="right">R$ {venda.valorTotal.toFixed(2)}</TableCell>
                        <TableCell>{venda.garcom}</TableCell>
                        <TableCell>{venda.mesa}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};