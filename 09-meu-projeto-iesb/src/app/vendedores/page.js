'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function VendedoresPage() {

  const [vendedores, setVendedores] = useState([])

  // Carrega a lista de vendedores do localStorage ao acessar a página
  useEffect(() => {
    const vendedoresLocalStorage = JSON.parse(localStorage.getItem("vendedores")) || []
    setVendedores(vendedoresLocalStorage)
    console.log(vendedoresLocalStorage)
  }, [])

  // Função para excluir um vendedor
  function excluir(vendedor) {
    if (window.confirm(`Deseja realmente excluir o vendedor ${vendedor.nome} ${vendedor.sobrenome}?`)) {
      const novaLista = vendedores.filter(item => item.id !== vendedor.id)
      localStorage.setItem('vendedores', JSON.stringify(novaLista))
      setVendedores(novaLista)
      alert("Vendedor excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo="Lista de Vendedores">
      <div className='text-end mb-3'>
        <Button href='/vendedores/form'><FaPlusCircle /> Novo Vendedor</Button>
      </div>

      {/* Tabela com os Vendedores */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Data de Nascimento</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendedores.map(vendedor => (
            <tr key={vendedor.id}>
              <td>
                {vendedor.foto ? (
                  <img src={vendedor.foto} alt="Foto do vendedor" style={{ maxWidth: '120px' }} />
                ) : (
                  <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f0f0'}}></div>
                )}
              </td>
              <td>{vendedor.nome}</td>
              <td>{vendedor.sobrenome}</td>
              <td>{vendedor.cpf}</td>
              <td>{vendedor.telefone}</td>
              <td>{vendedor.dataNascimento}</td>
              <td>{vendedor.email}</td>
              <td>{vendedor.endereco}</td>
              <td className='text-center'>
                <Button className='me-2' href={`/vendedores/form?id=${vendedor.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(vendedor)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
