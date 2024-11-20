'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ProdutosPage() {

  const [produtos, setProdutos] = useState([])

  // Carrega a lista de produtos do localStorage quando a tela é acessada
  useEffect(() => {
    const produtosLocalStorage = JSON.parse(localStorage.getItem('produtos')) || []
    setProdutos(produtosLocalStorage)
    console.log(produtosLocalStorage)
  }, [])

  // Função para excluir um produto
  function excluir(produto) {
    if (window.confirm(`Deseja realmente excluir o produto ${produto.nome}?`)) {
      const novaLista = produtos.filter(item => item.id !== produto.id)
      localStorage.setItem('produtos', JSON.stringify(novaLista))
      setProdutos(novaLista)
      alert("Produto excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo="Lista de Produtos">

      {/* Botão para adicionar novo produto */}
      <div className="mb-3 text-end">
        <Button href="/produtos/form" variant="success"><FaPlusCircle /> Novo Produto</Button>
      </div>

      {/* Tabela com os Produtos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Tamanho</th>
            <th>Cor</th>
            <th>Marca</th>
            <th>Material</th>
            <th>Status</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.tipo}</td>
              <td>{produto.tamanho}</td>
              <td>{produto.cor}</td>
              <td>{produto.marca}</td>
              <td>{produto.material}</td>
              <td>{produto.status === 'disponivel' ? 'Disponível' : 'Esgotado'}</td>
              <td>R$ {parseFloat(produto.preco).toFixed(2)}</td>
              <td className='text-center'>
                <Button className='me-2' href={`/produtos/form?id=${produto.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(produto)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
