'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {

  const produtos = JSON.parse(localStorage.getItem("produtos")) || []
  const clientes = JSON.parse(localStorage.getItem("clientes")) || []
  const vendedores = JSON.parse(localStorage.getItem("vendedores")) || []
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || []
  
  const lista = [
    {
      nome: "Produtos",
      imagem: "https://www.digitaletextil.com.br/blog/wp-content/uploads/2021/10/mix-de-produtos-de-moda-imagem-destacada.jpg", quantidade: produtos.length,
      link: "/produtos"
    },
    {
      nome: "Clientes",
      imagem: "https://toulousecomunicacao.com.br/wp-content/uploads/2020/12/2.-As-principais-formas-de-capta%C3%A7%C3%A3o-de-clientes-na-internet.jpg", quantidade: clientes.length,
      link: "/clientes"
    },
    {
      nome: "Vendedores",
      imagem: "https://www.gruposeres.com.br/wp-content/uploads/2018/07/como-manter-equipe-motivada-1.jpg", quantidade: vendedores.length,
      link: "/vendedores"
    },
    {
      nome: "Pedidos",
      imagem: "https://cdn.goomer.com.br/website/base/242/1fc/b12/goomer-whatsapp-business-para-receber-pedidos-no-delivery.jpg", quantidade: pedidos.length,
      link: "/pedidos"
    },
    {
      nome: "Vendas",
      imagem: "https://www.kryzalis.com.br/blog/wp-content/uploads/2016/08/vendas-pela-internet.jpg", quantidade: pedidos.length,
      link: "/pedidos"
    },
  ]

  return (
    <Pagina>
      <Row md={5}>
        {lista.map((item, index) => (
          <Col className='py-2' key={item.id || index}>
            <Card className="bg-danger text-white" style={{ height: '100%' }}>
              <Card.Img src={item.imagem} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={item.link} variant="light">Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  )
}
