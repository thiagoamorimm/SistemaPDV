import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Drawer,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
  descricao: string;
}

interface ItemPedido {
  produto: Produto;
  quantidade: number;
  observacao: string;
}

interface Categoria {
  id: number;
  nome: string;
}

export const PedidosPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Estados
  const [categoriaAtual, setCategoriaAtual] = useState<number>(0);
  const [mesa, setMesa] = useState<string>('');
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([]);
  
  // Dados mockados (temporário)
  const categorias: Categoria[] = [
    { id: 1, nome: 'Bebidas' },
    { id: 2, nome: 'Pratos Principais' },
    { id: 3, nome: 'Sobremesas' },
  ];

  const produtos: Produto[] = [
    {
      id: 1,
      nome: 'Refrigerante Cola',
      preco: 5.00,
      categoria: 'Bebidas',
      imagem: '/src/assets/produtos/placeholder.png',
      descricao: 'Refrigerante de cola 350ml',
    },
    {
      id: 2,
      nome: 'Água Mineral',
      preco: 3.00,
      categoria: 'Bebidas',
      imagem: '/src/assets/produtos/placeholder.png',
      descricao: 'Água mineral sem gás 500ml',
    },
  ];

  // Handlers
  const handleAddItem = (produto: Produto) => {
    const itemExistente = itensPedido.find(item => item.produto.id === produto.id);
    
    if (itemExistente) {
      setItensPedido(itensPedido.map(item =>
        item.produto.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setItensPedido([...itensPedido, { produto, quantidade: 1, observacao: '' }]);
    }
  };

  const handleRemoveItem = (produtoId: number) => {
    setItensPedido(itensPedido.filter(item => item.produto.id !== produtoId));
  };

  const handleQuantidadeChange = (produtoId: number, delta: number) => {
    setItensPedido(itensPedido.map(item => {
      if (item.produto.id === produtoId) {
        const novaQuantidade = Math.max(0, item.quantidade + delta);
        return novaQuantidade === 0 ? null : { ...item, quantidade: novaQuantidade };
      }
      return item;
    }).filter(Boolean) as ItemPedido[]);
  };

  const handleObservacaoChange = (produtoId: number, observacao: string) => {
    setItensPedido(itensPedido.map(item =>
      item.produto.id === produtoId
        ? { ...item, observacao }
        : item
    ));
  };

  const handleEnviarPedido = () => {
    if (!mesa) {
      alert('Por favor, informe o número da mesa');
      return;
    }
    if (itensPedido.length === 0) {
      alert('Adicione itens ao pedido');
      return;
    }
    // TODO: Implementar envio do pedido
    console.log('Pedido enviado:', { mesa, itens: itensPedido });
    setItensPedido([]);
    setMesa('');
  };

  const calcularTotal = () => {
    return itensPedido.reduce((total, item) => 
      total + (item.produto.preco * item.quantidade), 0
    );
  };

  // Renderização do carrinho
  const CarrinhoContent = () => (
    <Box sx={{ width: isMobile ? '100%' : 350, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Carrinho de Pedidos
      </Typography>
      <TextField
        fullWidth
        label="Número da Mesa"
        value={mesa}
        onChange={(e) => setMesa(e.target.value)}
        margin="normal"
      />
      <List>
        {itensPedido.map((item) => (
          <ListItem key={item.produto.id} divider>
            <ListItemText
              primary={item.produto.nome}
              secondary={
                <>
                  <Typography component="span" variant="body2">
                    R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Observações"
                    value={item.observacao}
                    onChange={(e) => handleObservacaoChange(item.produto.id, e.target.value)}
                    margin="dense"
                  />
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                size="small"
                onClick={() => handleQuantidadeChange(item.produto.id, -1)}
              >
                <RemoveIcon />
              </IconButton>
              <Typography component="span" sx={{ mx: 1 }}>
                {item.quantidade}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleQuantidadeChange(item.produto.id, 1)}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => handleRemoveItem(item.produto.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Total: R$ {calcularTotal().toFixed(2)}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleEnviarPedido}
          disabled={itensPedido.length === 0 || !mesa}
        >
          Enviar Pedido
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Barra superior móvel */}
      {isMobile && (
        <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar>
            <TextField
              size="small"
              label="Mesa"
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              onClick={() => setCarrinhoAberto(true)}
              startIcon={<ShoppingCartIcon />}
            >
              Carrinho ({itensPedido.length})
            </Button>
          </Toolbar>
        </AppBar>
      )}

      <Grid container spacing={3}>
        {/* Categorias e Produtos */}
        <Grid item xs={12} md={isMobile ? 12 : 8}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Tabs
              value={categoriaAtual}
              onChange={(_, newValue) => setCategoriaAtual(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                mb: 3,
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px',
                },
                '& .MuiTab-root': {
                  minWidth: 120,
                  fontWeight: 600,
                  fontSize: '1rem',
                },
              }}
            >
              {categorias.map((categoria) => (
                <Tab key={categoria.id} label={categoria.nome} />
              ))}
            </Tabs>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {produtos
                .filter(produto => produto.categoria === categorias[categoriaAtual]?.nome)
                .map((produto) => (
                  <Grid item xs={6} sm={4} md={4} key={produto.id}>
                    <Card sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                      borderRadius: 2,
                    }}>
                      <CardMedia
                        component="img"
                        height="160"
                        image={produto.imagem}
                        alt={produto.nome}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                          {produto.nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {produto.descricao}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                          R$ {produto.preco.toFixed(2)}
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          onClick={() => handleAddItem(produto)}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1,
                          }}
                        >
                          Adicionar
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Carrinho Desktop */}
        {!isMobile && (
          <Grid item md={4}>
            <Paper sx={{
              position: 'sticky',
              top: 80,
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'hidden',
            }}>
              <Box sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                p: 2,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Carrinho de Pedidos
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <TextField
                  fullWidth
                  label="Número da Mesa"
                  value={mesa}
                  onChange={(e) => setMesa(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <List sx={{ mb: 3 }}>
                  {itensPedido.map((item) => (
                    <ListItem
                      key={item.produto.id}
                      divider
                      sx={{
                        py: 2,
                        px: 0,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            {item.produto.nome}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body1" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                              R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Observações"
                              value={item.observacao}
                              onChange={(e) => handleObservacaoChange(item.produto.id, e.target.value)}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 1,
                                },
                              }}
                            />
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantidadeChange(item.produto.id, -1)}
                            sx={{ bgcolor: 'action.hover' }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            component="span"
                            sx={{ mx: 2, fontWeight: 600, minWidth: '24px', textAlign: 'center' }}
                          >
                            {item.quantidade}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantidadeChange(item.produto.id, 1)}
                            sx={{ bgcolor: 'action.hover' }}
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleRemoveItem(item.produto.id)}
                            sx={{ ml: 1, color: 'error.main' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                    Total: R$ {calcularTotal().toFixed(2)}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleEnviarPedido}
                    disabled={itensPedido.length === 0 || !mesa}
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1.5,
                    }}
                  >
                    Enviar Pedido
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Carrinho Mobile (Drawer) */}
      <Drawer
        anchor="right"
        open={carrinhoAberto}
        onClose={() => setCarrinhoAberto(false)}
      >
        <CarrinhoContent />
      </Drawer>
    </Box>
  );
};