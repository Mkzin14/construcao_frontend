'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function PedidosPage() {

  const [pedidos, setPedidos] = useState([])
  const [produtos, setProdutos] = useState([])
  const [clientes, setClientes] = useState([])
  const [vendedores, setVendedores] = useState([])

  useEffect(() => {
    const pedidosLocalStorage = JSON.parse(localStorage.getItem('pedidos')) || []
    const produtosLocalStorage = JSON.parse(localStorage.getItem('produtos')) || []
    const clientesLocalStorage = JSON.parse(localStorage.getItem('clientes')) || []
    const vendedoresLocalStorage = JSON.parse(localStorage.getItem('vendedores')) || []

    setPedidos(pedidosLocalStorage)
    setProdutos(produtosLocalStorage)
    setClientes(clientesLocalStorage)
    setVendedores(vendedoresLocalStorage)
  }, [])

  function excluir(pedido) {
    if (window.confirm(`Deseja realmente excluir o pedido do cliente ${getClienteNome(pedido.comprador)}?`)) {
      const novaLista = pedidos.filter(item => item.id !== pedido.id)
      localStorage.setItem('pedidos', JSON.stringify(novaLista))
      setPedidos(novaLista)
      alert("Pedido excluído com sucesso!")
    }
  }

  function getProdutoNome(produtoId) {
    const produto = produtos.find(produto => produto.id === produtoId)
    return produto ? produto.nome : "Produto não encontrado"
  }

  function getProdutoTamanho(produtoId) {
    const produto = produtos.find(produto => produto.id === produtoId)
    return produto ? produto.tamanho : "Tamanho não encontrado"
  }

  function getClienteNome(clienteId) {
    const cliente = clientes.find(cliente => cliente.id === clienteId)
    return cliente ? `${cliente.nome} ${cliente.sobrenome}` : "Cliente não encontrado"
  }

  function getVendedorNome(vendedorId) {
    const vendedor = vendedores.find(vendedor => vendedor.id === vendedorId)
    return vendedor ? `${vendedor.nome} ${vendedor.sobrenome}` : "Vendedor não encontrado"
  }

  return (
    <Pagina titulo="Lista de Pedidos">
      <div className='text-end mb-2'>
        <Button href='/pedidos/form'><FaPlusCircle /> Novo Pedido</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Tamanho</th>
            <th>Vendedor</th>
            <th>Comprador</th>
            <th>Data de Venda</th>
            <th>Status da Entrega</th>
            <th>Data de Entrega</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td>{getProdutoNome(pedido.produto)}</td>
              <td>{getProdutoTamanho(pedido.produto)}</td>
              <td>{getVendedorNome(pedido.vendedor)}</td>
              <td>{getClienteNome(pedido.comprador)}</td>
              <td>{new Date(pedido.dataVenda).toLocaleDateString('pt-BR')}</td>
              <td>{pedido.statusEntrega}</td>
              <td>{new Date(pedido.dataEntrega).toLocaleDateString('pt-BR')}</td>
              <td className='text-center'>
                <Button className='me-2' href={`/pedidos/form?id=${pedido.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(pedido)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
