import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../api/api';

interface Product {
    id: string;
    nome: string;
    preco: number;
}

interface CartViewItem {
    productId: string;
    quantidade: number;
    productDetail?: Product;
}

export function Carrinho() {
    const [cartItems, setCartItems] = useState<CartViewItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const fetchCart = async () => {
        if (!user) return;
        try {
            setLoading(true);
            // Busca o usuário pelo username conforme sua nova rota no Java
            const res = await api.get(`/users/username/${user.sub}`);
            const userCart = res.data.carrinho || [];

            // Busca detalhes dos produtos em paralelo
            const detailedCart = await Promise.all(userCart.map(async (item: any) => {
                const prodRes = await api.get(`/produtos/${item.productId}`);
                return { ...item, productDetail: prodRes.data };
            }));

            setCartItems(detailedCart);
        } catch (err) {
            console.error("Erro ao carregar carrinho", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCart(); }, [user]);

    const handleRemove = async (productId: string) => {
        try {
            await api.post(`/users/cart/remove?userId=${user?.sub}&productId=${productId}`);
            fetchCart(); // Atualiza a lista após remover
        } catch (err) {
            alert("Erro ao remover item");
        }
    };

    const handleFinish = async () => {
        try {
            const res = await api.post(`/users/cart/finish?userId=${user?.sub}`);
            alert(`Compra finalizada! Total: R$ ${res.data.totalPrice.toFixed(2)}`);
            setCartItems([]); // Limpa o estado local
        } catch (err) {
            alert("Erro ao finalizar compra. Verifique se o carrinho não está vazio.");
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div style={styles.container}>
            <h1 style={{color: '#ffffff'}}>Seu Carrinho</h1>
            {cartItems.length === 0 ? (
                <p style={{color: '#ffffff'}}>
                    Vazio :(
                </p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item.productId} style={styles.item}>
                            <div style={{ color: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                                <strong>{item.productDetail?.nome}</strong>
                                <span>Quantidade: {item.quantidade}</span>
                            </div>

                            <div style={{ color: '#ffffff', textAlign: 'right' }}>
                                {/* Subtotal: preço * quantidade */}
                                <p>R$ {((item.productDetail?.preco || 0) * item.quantidade).toFixed(2)}</p>

                                <button
                                    onClick={() => handleRemove(item.productId)}
                                    style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}
                                >
                                    {item.quantidade > 1 ? "Remover uma unidade" : "Excluir item"}
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={styles.footer}>
                        <h3>Total: R$ {cartItems.reduce((acc, i) => acc + (i.productDetail?.preco || 0), 0).toFixed(2)}</h3>
                        <button onClick={handleFinish} style={styles.finishBtn}>Finalizar Pedido</button>
                    </div>
                </>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { maxWidth: '600px', margin: '0 auto' },
    item: { display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd' },
    removeBtn: { color: 'red', border: 'none', background: 'none', cursor: 'pointer' },
    footer: { color: '#ffffff', marginTop: '20px', textAlign: 'right' },
    finishBtn: { background: '#c78f00', padding: '10px 20px', border: '1px solid #a88734', cursor: 'pointer' }
};