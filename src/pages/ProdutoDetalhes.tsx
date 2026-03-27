import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

export function ProdutoDetalhes() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const { signed, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/produtos/${id}`)
            .then(res => setProduct(res.data))
            .catch(() => alert("Produto não encontrado"));
    }, [id]);

    async function handleAddToCart() {
        if (!signed) {
            alert("Faça login para adicionar ao carrinho!");
            navigate('/login');
            return;
        }

        try {
            await api.post(`/users/cart?userId=${user?.sub}&productId=${id}`);
            alert("Adicionado com sucesso!");
        } catch (err: any) {
            if (err.response?.status === 400) {
                alert("Estoque esgotado!");
            }
        }
    }

    if (!product) return <div style={{ padding: '20px' }}>Carregando produto...</div>;

    const isOutOfStock = product.quantidade <= 0;

    return (
        <div style={containerStyle}>
            <div style={imageSection}>
                <img src={product.foto || 'https://via.placeholder.com/400'} alt={product.nome} style={mainImgStyle} />
            </div>

            <div style={infoSection}>
                <h1 style={titleStyle}>{product.nome}</h1>
                <p style={priceStyle}>R$ {product.preco.toFixed(2)}</p>
                
                <div style={stockStatusStyle(isOutOfStock)}>
                    {isOutOfStock ? '● Indisponível no momento' : `● Em estoque (${product.quantidade} unidades)`}
                </div>

                <div style={descBox}>
                    <h3>Descrição</h3>
                    <p>{product.descricao}</p>
                </div>
            </div>

            <div style={buyBox}>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>R$ {product.preco.toFixed(2)}</p>
                
                <button 
                    style={isOutOfStock ? disabledBtn : addBtn} 
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                >
                    {isOutOfStock ? 'Produto Indisponível' : 'Adicionar ao Carrinho'}
                </button>
                
                <button style={backBtn} onClick={() => navigate(-1)}>
                    Voltar para a loja
                </button>
            </div>
        </div>
    );
}

const containerStyle: React.CSSProperties = { 
    display: 'flex', 
    gap: '40px', 
    padding: '40px', 
    maxWidth: '1200px', 
    margin: '0 auto', 
    background: '#fff', 
    color: '#111' 
};

const imageSection: React.CSSProperties = { flex: 1, textAlign: 'center' };
const mainImgStyle: React.CSSProperties = { maxWidth: '100%', borderRadius: '8px' };
const infoSection: React.CSSProperties = { flex: 1.2 };
const titleStyle: React.CSSProperties = { fontSize: '2.2rem', marginBottom: '10px' };
const priceStyle: React.CSSProperties = { fontSize: '1.8rem', color: '#B12704', fontWeight: 'bold' };

const stockStatusStyle = (out: boolean): React.CSSProperties => ({
    fontSize: '1rem',
    color: out ? '#c40000' : '#007600',
    fontWeight: 'bold',
    margin: '15px 0'
});

const descBox: React.CSSProperties = { marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' };

const buyBox: React.CSSProperties = { 
    flex: 0.7, 
    border: '1px solid #ddd', 
    padding: '20px', 
    borderRadius: '10px', 
    height: 'fit-content',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};

const addBtn: React.CSSProperties = { 
    width: '100%', padding: '12px', background: '#ffd814', border: '1px solid #fcd200', 
    borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', margin: '15px 0' 
};

const disabledBtn: React.CSSProperties = { 
    ...addBtn,
    background: '#e7e9ec', 
    border: '1px solid #d5d9d9', 
    color: '#565959',
    cursor: 'not-allowed'
};

const backBtn: React.CSSProperties = { 
    width: '100%', padding: '10px', background: '#fff', border: '1px solid #adb1b8', 
    borderRadius: '25px', cursor: 'pointer' 
};