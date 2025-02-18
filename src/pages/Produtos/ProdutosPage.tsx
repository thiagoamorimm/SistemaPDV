import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { ProdutosForm } from './ProdutosForm';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  precoCusto: number;
  precoVenda: number;
  unidadeMedida: string;
  fornecedor: string;
  imagens: string[];
}

export const ProdutosPage: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: 1,
      nome: 'Refrigerante Cola',
      descricao: 'Refrigerante de cola 350ml',
      precoCusto: 3.50,
      precoVenda: 5.00,
      unidadeMedida: 'Unidade',
      fornecedor: 'Distribuidora XYZ',
      imagens: ['/src/assets/produtos/placeholder.png'],
    },
    {
      id: 2,
      nome: 'Água Mineral',
      descricao: 'Água mineral sem gás 500ml',
      precoCusto: 1.50,
      precoVenda: 3.00,
      unidadeMedida: 'Unidade',
      fornecedor: 'Distribuidora ABC',
      imagens: ['/src/assets/produtos/placeholder.png'],
    },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Produto | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState<Produto | null>(null);

  const handleAddClick = () => {
    setSelectedProduto(undefined);
    setFormOpen(true);
  };

  const handleEditClick = (produto: Produto) => {
    setSelectedProduto(produto);
    setFormOpen(true);
  };

  const handleDeleteClick = (produto: Produto) => {
    setProdutoToDelete(produto);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (produtoToDelete) {
      setProdutos(produtos.filter((p) => p.id !== produtoToDelete.id));
      setDeleteConfirmOpen(false);
      setProdutoToDelete(null);
    }
  };

  const handleFormSubmit = (data: Omit<Produto, 'id'> & { id?: number }) => {
    if (data.id) {
      // Editing existing product
      setProdutos(produtos.map((p) => (p.id === data.id ? { ...data, id: p.id } : p)));
    } else {
      // Adding new product
      const newId = Math.max(...produtos.map((p) => p.id), 0) + 1;
      setProdutos([...produtos, { ...data, id: newId }]);
    }
    setFormOpen(false);
  };

  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Produtos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{ borderRadius: 2 }}
        >
          Novo Produto
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <TextField
          fullWidth
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Grid container spacing={3}>
          {filteredProdutos.map((produto) => (
            <Grid item xs={12} sm={6} md={4} key={produto.id}>
              <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={produto.imagens[0]}
                  alt={produto.nome}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {produto.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {produto.descricao}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                    R$ {produto.precoVenda.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fornecedor: {produto.fornecedor}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <IconButton
                    onClick={() => handleEditClick(produto)}
                    sx={{ bgcolor: 'action.hover' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(produto)}
                    sx={{ bgcolor: 'action.hover', color: 'error.main' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Form Dialog */}
      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <ProdutosForm
            produto={selectedProduto}
            onSubmit={handleFormSubmit}
            onCancel={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir o produto "{produtoToDelete?.nome}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};