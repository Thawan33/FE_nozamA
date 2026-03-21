import { useEffect, useState, useContext } from 'react'; // Adicionado useContext
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext'; // Importar seu contexto

interface Product {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    foto: string;
}

export function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const { user } = useContext(AuthContext); // Pegar dados do usuário

    useEffect(() => {
        api.get('/produtos').then(res => setProducts(res.data));
    }, []);

    // FUNÇÃO PARA ADICIONAR AO CARRINHO
    async function handleAddToCart(productId: string) {
        try {
            await api.post(`/users/cart?userId=${user?.sub}&productId=${productId}`);
            alert("Adicionado!");
        } catch (error: any) {
            // Captura o erro 400 (Bad Request) que enviamos do Java
            if (error.response?.status === 400) {
                alert("Desculpe, não temos mais desse item em estoque.");
            }
        }
    }

    return (
        <div style={gridStyle}>
            {products.map(p => (
                <div key={p.id} style={cardStyle}>
                    <img src={p.foto || 'https://via.placeholder.com/150'} alt={p.nome} style={imgStyle} />
                    <h3>{p.nome}</h3>
                    <p style={descStyle}>
                        {p.descricao ? p.descricao.substring(0, 60) + '...' : 'Sem descrição'}
                    </p>
                    <p style={priceStyle}>R$ {p.preco.toFixed(2)}</p>
                    <p style={stockStyle}>{p.quantidade > 0 ? `${p.quantidade} em estoque` : 'Esgotado'}</p>

                    <button
                        style={buyBtn}
                        disabled={p.quantidade <= 0}
                        onClick={() => handleAddToCart(p.id)} // ADICIONADO O CLIQUE
                    >
                        {p.quantidade > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
                    </button>
                </div>
            ))}
        </div>
    );
}

// Mantenha seus estilos abaixo...

// Estilos rápidos para o Card
const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' };
const cardStyle: React.CSSProperties = { border: '1px solid #eee', padding: '15px', borderRadius: '8px', textAlign: 'center' };
const imgStyle: React.CSSProperties = { width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' };
const descStyle: React.CSSProperties = { fontSize: '0.85rem', color: '#666' };
const priceStyle: React.CSSProperties = { fontSize: '1.2rem', fontWeight: 'bold', color: '#B12704' };
const stockStyle: React.CSSProperties = { fontSize: '0.75rem', color: '#555' };
const buyBtn: React.CSSProperties = { width: '100%', padding: '8px', background: '#ffd814', border: '1px solid #fcd200', borderRadius: '20px', cursor: 'pointer' };