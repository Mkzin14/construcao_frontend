'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ClientesPage() {

  const [clientes, setClientes] = useState([])

  // Carrega a lista de clientes do localStorage ao acessar a página
  useEffect(() => {
    const clientesLocalStorage = JSON.parse(localStorage.getItem('clientes')) || []
    setClientes(clientesLocalStorage)
    console.log(clientesLocalStorage)
  }, [])

  // Função para excluir um cliente
  function excluir(cliente) {
    if (window.confirm(`Deseja realmente excluir o cliente ${cliente.nome} ${cliente.sobrenome}?`)) {
      const novaLista = clientes.filter(item => item.id !== cliente.id)
      localStorage.setItem('clientes', JSON.stringify(novaLista))
      setClientes(novaLista)
      alert("Cliente excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo="Lista de Clientes">
      <div className='text-end mb-3'>
        <Button href='/clientes/form'><FaPlusCircle /> Novo Cliente</Button>
      </div>

      {/* Tabela com os Clientes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Telefone</th>
            <th>Data de Nascimento</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.cpf}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.sobrenome}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.dataNascimento}</td>
              <td>{cliente.email}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.cidade}</td>
              <td className='text-center'>
                <Button className='me-2' href={`/clientes/form?id=${cliente.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(cliente)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
