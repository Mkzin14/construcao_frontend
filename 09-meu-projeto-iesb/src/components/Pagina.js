'use client'

import { Container, Nav, Navbar } from "react-bootstrap"
import { FaTshirt, FaListAlt, FaUserFriends, FaUserTie, FaShoppingCart, FaTachometerAlt, FaStore } from "react-icons/fa"

export default function Pagina({ children }) {

  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="danger" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/"><FaTshirt className="me-2" /> MK STORE</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav"/>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/produtos"><FaListAlt className="me-2" /> Produtos</Nav.Link>
              <Nav.Link href="/produtos/form"><FaTshirt className="me-2" /> Novos Produtos</Nav.Link>
              <Nav.Link href="/clientes"><FaUserTie className="me-2" /> Clientes</Nav.Link>
              <Nav.Link href="/vendedores"><FaStore className="me-2" /> Vendedores</Nav.Link>
              <Nav.Link href="/pedidos"><FaShoppingCart className="me-2" /> Pedidos</Nav.Link>
              <Nav.Link href="/dashboard"><FaTachometerAlt className="me-2" /> Dashboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Barra de Título */}
      <div className="bg-danger text-center text-white py-2">
        <h1>{"MK STORE"}</h1>
      </div>

      {/* Conteúdo da Página */}
      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}
