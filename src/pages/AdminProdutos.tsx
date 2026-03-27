import React, { useState } from 'react';
import api from '../api/api';

export function AdminProdutos() {
  const [product, setProduct] = useState({
    nome: '',
    descricao: '',
    preco: 0,
    quantidade: 0,
    foto: ''
  });
  const [mensagem, setMensagem] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (product.preco <= 0 || product.quantidade <= 0) {
      setMensagem('Erro: Preço e estoque não podem ser negativos!');
      return;
    }

    try {
      await api.post('/produtos', product);
      setMensagem('Produto cadastrado com sucesso!');
      setProduct({ nome: '', descricao: '', preco: 0, quantidade: 0, foto: '' });
    } catch (err) {
      setMensagem('Erro ao cadastrar. Verifique suas permissões de ADMIN.');
    }
  }

  return (
    <div style={styles.container}>
      <h2>Painel Administrativo: Novo Produto</h2>
      {mensagem && <p style={styles.alert}>{mensagem}</p>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input placeholder="Nome" value={product.nome} 
          onChange={e => setProduct({...product, nome: e.target.value})} required />
        
        <textarea placeholder="Descrição" value={product.descricao} 
          onChange={e => setProduct({...product, descricao: e.target.value})} required />
        
        <p>Preço:</p>

        <input type="number" placeholder="Preço" value={product.preco} min="0" step="0.01" 
          onChange={e => setProduct({...product, preco: Number(e.target.value)})} required />
        
        <p>Quantidade:</p>

        <input type="number" placeholder="Estoque inicial" value={product.quantidade}  min="0" 
          onChange={e => setProduct({...product, quantidade: Number(e.target.value)})} required />
        
        <input placeholder="URL da Foto (ex: https://...)" value={product.foto} 
          onChange={e => setProduct({...product, foto: e.target.value})} />

        <button type="submit" style={styles.btn}>Cadastrar Produto</button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { color: '#ffffff', maxWidth: '600px', margin: '2rem auto', background: '#b98500', padding: '1rem', border: '1px solid #ddd' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  alert: { color: 'green', fontWeight: 'bold' },
  btn: { background: '#febd69', border: 'none', padding: '10px', cursor: 'pointer', fontWeight: 'bold' }
};