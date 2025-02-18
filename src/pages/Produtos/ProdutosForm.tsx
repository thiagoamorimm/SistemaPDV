import React, { useState, useCallback } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    SelectChangeEvent,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

interface ProdutoFormData {
    id?: number;
    nome: string;
    descricao: string;
    precoCusto: number;
    precoVenda: number;
    unidadeMedida: string;
    fornecedor: string;
    imagens: string[];
}

interface ProdutosFormProps {
    produto?: ProdutoFormData;
    onSubmit: (data: ProdutoFormData) => void;
    onCancel: () => void;
}

const unidadesMedida = [
    'Unidade',
    'Kg',
    'g',
    'L',
    'ml',
    'Caixa',
    'Pacote',
];

export const ProdutosForm: React.FC<ProdutosFormProps> = ({
    produto,
    onSubmit,
    onCancel,
}) => {
    const [formData, setFormData] = useState<ProdutoFormData>(produto || {
        nome: '',
        descricao: '',
        precoCusto: 0,
        precoVenda: 0,
        unidadeMedida: '',
        fornecedor: '',
        imagens: [],
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Convert files to base64 strings
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    imagens: [...prev.imagens, reader.result as string],
                }));
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        multiple: true,
    });

    const handleChange = (field: keyof ProdutoFormData) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const value = event.target.value;
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleRemoveImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            imagens: prev.imagens.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                    {produto ? 'Editar Produto' : 'Novo Produto'}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                label="Nome do Produto"
                                value={formData.nome}
                                onChange={handleChange('nome')}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Unidade de Medida</InputLabel>
                                <Select
                                    value={formData.unidadeMedida}
                                    label="Unidade de Medida"
                                    onChange={handleChange('unidadeMedida')}
                                >
                                    {unidadesMedida.map((unidade) => (
                                        <MenuItem key={unidade} value={unidade}>
                                            {unidade}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                type="number"
                                label="Preço de Custo"
                                value={formData.precoCusto}
                                onChange={handleChange('precoCusto')}
                                InputProps={{
                                    startAdornment: 'R$',
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                type="number"
                                label="Preço de Venda"
                                value={formData.precoVenda}
                                onChange={handleChange('precoVenda')}
                                InputProps={{
                                    startAdornment: 'R$',
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Fornecedor"
                                value={formData.fornecedor}
                                onChange={handleChange('fornecedor')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Descrição"
                                value={formData.descricao}
                                onChange={handleChange('descricao')}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                {...getRootProps()}
                                sx={{
                                    border: '2px dashed',
                                    borderColor: isDragActive ? 'primary.main' : 'grey.300',
                                    borderRadius: 2,
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                    },
                                }}
                            >
                                <input {...getInputProps()} />
                                <AddIcon sx={{ fontSize: 40, color: 'grey.500', mb: 1 }} />
                                <Typography>
                                    {isDragActive
                                        ? 'Solte as imagens aqui...'
                                        : 'Arraste e solte imagens aqui, ou clique para selecionar'}
                                </Typography>
                            </Box>
                        </Grid>

                        {formData.imagens.length > 0 && (
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    {formData.imagens.map((imagem, index) => (
                                        <Grid item key={index} xs={6} sm={4} md={3}>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    paddingTop: '100%',
                                                    borderRadius: 1,
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <img
                                                    src={imagem}
                                                    alt={`Produto ${index + 1}`}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemoveImage(index)}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        right: 8,
                                                        bgcolor: 'background.paper',
                                                        '&:hover': {
                                                            bgcolor: 'error.light',
                                                            color: 'white',
                                                        },
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    onClick={onCancel}
                                    sx={{ minWidth: 120 }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ minWidth: 120 }}
                                >
                                    Salvar
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};