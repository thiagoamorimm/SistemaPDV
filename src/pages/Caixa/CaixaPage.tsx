import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  QrCode as QrCodeIcon,
  Person as PersonIcon,
  Receipt as ReceiptIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';

interface ProdutoCarrinho {
  id: number;
  nome: string;
  quantidade: number;
  precoUnitario: number;
  total: number;
  desconto?: number;
}

interface Cliente {
  nome: string;
  cpf: string;
}

export const CaixaPage: React.FC = () => {
  const [produtos, setProdutos] = useState<ProdutoCarrinho[]>([]);
  const [metodoPagamento, setMetodoPagamento] = useState<string>('dinheiro');
  const [cliente, setCliente] = useState<Cliente>({ nome: '', cpf: '' });
  const [showClienteDialog, setShowClienteDialog] = useState(false);
  const [quantidade, setQuantidade] = useState<string>('1');
  const [desconto, setDesconto] = useState<string>('0');
  
  const handleMetodoPagamentoChange = (event: React.MouseEvent<HTMLElement>, novoMetodo: string) => {
    if (novoMetodo !== null) {
      setMetodoPagamento(novoMetodo);
    }
  };

  const calcularTotal = () => {
    return produtos.reduce((acc, produto) => {
      const valorComDesconto = produto.total - (produto.desconto || 0);
      return acc + valorComDesconto;
    }, 0);
  };

  const handleQuantidadeChange = (valor: string) => {
    if (valor === '' || /^\d+$/.test(valor)) {
      setQuantidade(valor);
    }
  };

  const handleDescontoChange = (valor: string) => {
    if (valor === '' || /^\d*\.?\d*$/.test(valor)) {
      setDesconto(valor);
    }
  };

  const handleClienteSubmit = () => {
    setShowClienteDialog(false);
  };

  const adicionarProduto = () => {
    // Simulando a adição de um produto
    const novoProduto: ProdutoCarrinho = {
      id: produtos.length + 1,
      nome: 'Produto Teste',
      quantidade: parseInt(quantidade) || 1,
      precoUnitario: 10.00,
      total: (parseInt(quantidade) || 1) * 10.00,
      desconto: parseFloat(desconto) || 0
    };
    setProdutos([...produtos, novoProduto]);
    setQuantidade('1');
    setDesconto('0');
  };

  const removerProduto = (index: number) => {
    setProdutos(produtos.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 }, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ alignItems: 'flex-start' }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 1, sm: 2, md: 3 }, borderRadius: 2, boxShadow: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', mb: 3, gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Buscar produto..."
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
                <Button
                  variant="contained"
                  startIcon={<QrCodeIcon />}
                  sx={{ 
                    whiteSpace: 'nowrap',
                    borderRadius: 2,
                    py: 1.5,
                    px: { xs: 2, sm: 4 },
                    minWidth: 'fit-content',
                    textTransform: 'none',
                    fontWeight: 600,
                    flex: { xs: 1, sm: 'none' }
                  }}
                >
                  Código de Barras
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PersonIcon />}
                  onClick={() => setShowClienteDialog(true)}
                  sx={{ 
                    borderRadius: 2,
                    py: 1.5,
                    px: { xs: 2, sm: 3 },
                    textTransform: 'none',
                    fontWeight: 600,
                    flex: { xs: 1, sm: 'none' }
                  }}
                >
                  Cliente
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
              <TextField
                label="Quantidade"
                value={quantidade}
                onChange={(e) => handleQuantidadeChange(e.target.value)}
                sx={{ 
                  width: { xs: '100%', sm: '150px' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => handleQuantidadeChange((parseInt(quantidade) + 1).toString())} sx={{ bgcolor: 'action.hover' }}>
                        <AddIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleQuantidadeChange(Math.max(1, parseInt(quantidade) - 1).toString())} sx={{ bgcolor: 'action.hover' }}>
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Desconto (R$)"
                value={desconto}
                onChange={(e) => handleDescontoChange(e.target.value)}
                sx={{ 
                  width: { xs: '100%', sm: '150px' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              <Button
                variant="contained"
                color="success"
                onClick={adicionarProduto}
                sx={{ 
                  borderRadius: 2,
                  py: 1,
                  px: 4,
                  textTransform: 'none',
                  fontWeight: 600,
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Adicionar
              </Button>
            </Box>

            <TableContainer sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: '100%' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'primary.main' }}>
                    <TableCell sx={{ color: 'primary.contrastText', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '1rem' }, whiteSpace: 'nowrap' }}>Produto</TableCell>
                    <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '1rem' }, whiteSpace: 'nowrap', p: { xs: 1, sm: 2 } }}>Qtd</TableCell>
                    <TableCell align="right" sx={{ color: 'primary.contrastText', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '1rem' }, whiteSpace: 'nowrap', p: { xs: 1, sm: 2 } }}>Preço</TableCell>
                    <TableCell align="right" sx={{ color: 'primary.contrastText', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '1rem' }, whiteSpace: 'nowrap', p: { xs: 1, sm: 2 } }}>Total</TableCell>
                    <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '1rem' }, whiteSpace: 'nowrap', p: { xs: 1, sm: 2 } }}>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {produtos.map((produto, index) => (
                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                      <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, p: { xs: 1, sm: 2 } }}>{produto.nome}</TableCell>
                      <TableCell align="center" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, p: { xs: 1, sm: 2 } }}>{produto.quantidade}</TableCell>
                      <TableCell align="right" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, p: { xs: 1, sm: 2 } }}>
                        R$ {produto.precoUnitario.toFixed(2)}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, p: { xs: 1, sm: 2 } }}>
                        R$ {produto.total.toFixed(2)}
                      </TableCell>
                      <TableCell align="center" sx={{ p: { xs: 1, sm: 2 } }}>
                        <IconButton
                          color="error"
                          onClick={() => removerProduto(index)}
                          size="small"
                          sx={{ 
                            bgcolor: 'error.light', 
                            color: 'error.contrastText', 
                            '&:hover': { bgcolor: 'error.main' },
                            padding: { xs: '4px', sm: '8px' }
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                Total da Venda
              </Typography>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: 'primary.main' }}>
                R$ {calcularTotal().toFixed(2)}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                Forma de Pagamento
              </Typography>
              <ToggleButtonGroup
                value={metodoPagamento}
                exclusive
                onChange={handleMetodoPagamentoChange}
                aria-label="forma de pagamento"
                sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1, width: '100%' }}
              >
                <ToggleButton 
                  value="dinheiro" 
                  aria-label="dinheiro"
                  sx={{ 
                    flex: 1,
                    borderRadius: 2,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Dinheiro
                </ToggleButton>
                <ToggleButton 
                  value="cartao" 
                  aria-label="cartão"
                  sx={{ 
                    flex: 1,
                    borderRadius: 2,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Cartão
                </ToggleButton>
                <ToggleButton 
                  value="pix" 
                  aria-label="pix"
                  sx={{ 
                    flex: 1,
                    borderRadius: 2,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  PIX
                </ToggleButton>
                <ToggleButton 
                  value="vale" 
                  aria-label="vale"
                  sx={{ 
                    flex: 1,
                    borderRadius: 2,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Vale
                </ToggleButton>
              </ToggleButtonGroup>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Finalizar Venda
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                size="large"
                sx={{ 
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Cancelar Venda
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={showClienteDialog} onClose={() => setShowClienteDialog(false)}>
        <DialogTitle>Informações do Cliente</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nome"
              value={cliente.nome}
              onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
              fullWidth
            />
            <TextField
              label="CPF"
              value={cliente.cpf}
              onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowClienteDialog(false)}>Cancelar</Button>
          <Button onClick={handleClienteSubmit} variant="contained">Confirmar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};