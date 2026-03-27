import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

interface Product {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    foto: string;
}

export function Produtos() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const { user, signed } = useContext(AuthContext);

    const fetchProducts = () => {
        api.get('/produtos')
            .then(res => setProducts(res.data))
            .catch(err => console.error("Erro ao buscar produtos:", err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    async function handleAddToCart(e: React.MouseEvent, productId: string) {
        e.stopPropagation();

        if (!signed) {
            alert("Você precisa estar logado para adicionar itens ao carrinho!");
            return;
        }

        try {
            await api.post(`/users/cart?userId=${user?.sub}&productId=${productId}`);
            alert("Produto adicionado ao carrinho!");
        } catch (error: any) {
            if (error.response?.status === 400) {
                alert("Desculpe, não temos mais desse item em estoque.");
            } else {
                alert("Erro ao adicionar ao carrinho. Tente novamente.");
            }
        }
    }

    async function handleDeleteProduct(e: React.MouseEvent, productId: string) {
        e.stopPropagation();

        if (!window.confirm("Tem certeza que deseja excluir este produto permanentemente?")) {
            return;
        }

        try {
            await api.delete(`/produtos/${productId}`);
            alert("Produto removido com sucesso!");
            fetchProducts();
        } catch (error) {
            console.error("Erro ao deletar:", error);
            alert("Erro ao remover produto.");
        }
    }

    return (
        <div style={gridStyle}>
            {products.map(p => (
                <div 
                    key={p.id} 
                    style={cardStyle}
                    onClick={() => navigate(`/produto/${p.id}`)}
                >
                    {user?.role === 'ADMIN' && (
                        <button 
                            onClick={(e) => handleDeleteProduct(e, p.id)}
                            style={deleteBtnStyle}
                            title="Remover do Catálogo"
                        >
                            X
                        </button>
                    )}

                    <img 
                        src={p.foto || 'https://via.placeholder.com/150'} 
                        alt={p.nome} 
                        style={imgStyle} 
                    />
                    
                    <h3 style={{ color: '#fff' }}>{p.nome}</h3>
                    
                    <p style={descStyle}>
                        {p.descricao ? p.descricao.substring(0, 60) + '...' : 'Sem descrição disponível.'}
                    </p>
                    
                    <p style={priceStyle}>R$ {p.preco.toFixed(2)}</p>
                    
                    <p style={stockStyle}>
                        {p.quantidade > 0 ? `${p.quantidade} unidades em estoque` : 'Produto Esgotado'}
                    </p>

                    <button
                        style={buyBtn}
                        disabled={p.quantidade <= 0}
                        onClick={(e) => handleAddToCart(e, p.id)}
                    >
                        {p.quantidade > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
                    </button>
                </div>
            ))}
        </div>
    );
}

const gridStyle: React.CSSProperties = { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
    gap: '25px',
    padding: '20px'
};

const cardStyle: React.CSSProperties = { 
    position: 'relative',
    border: '2px solid #dd8500', 
    padding: '20px', 
    background: '#ffbd5954', 
    borderRadius: '12px', 
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
};

const imgStyle: React.CSSProperties = { 
    width: '100%', 
    height: '180px', 
    objectFit: 'cover', 
    borderRadius: '8px',
    marginBottom: '10px'
};

const descStyle: React.CSSProperties = { 
    fontSize: '0.85rem', 
    color: '#eee',
    minHeight: '40px'
};

const priceStyle: React.CSSProperties = { 
    fontSize: '1.4rem', 
    fontWeight: 'bold', 
    color: '#ffbd59',
    margin: '10px 0'
};

const stockStyle: React.CSSProperties = { 
    fontSize: '0.75rem', 
    color: '#ccc',
    marginBottom: '15px'
};

const buyBtn: React.CSSProperties = { 
    width: '100%', 
    padding: '12px', 
    background: '#ffd814', 
    border: 'none', 
    borderRadius: '25px', 
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#111'
};

const deleteBtnStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    zIndex: 10
};