'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function PedidosFormPage(props) {

  const router = useRouter()

  // Recupera os dados do localStorage
  const produtos = JSON.parse(localStorage.getItem('produtos')) || []
  const clientes = JSON.parse(localStorage.getItem('clientes')) || []
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || []
  const vendedores = JSON.parse(localStorage.getItem('vendedores')) || []

  // Recupera o id para edição (se houver)
  const searchParams = useSearchParams(props)
  const id = searchParams.get('id')
  const pedidoEditado = pedidos.find(item => item.id === id)

  // Função para salvar os dados do formulário
  function salvar(dados) {
    if (pedidoEditado) {
      Object.assign(pedidoEditado, dados)
      localStorage.setItem('pedidos', JSON.stringify(pedidos))
    } else {
      dados.id = v4()
      pedidos.push(dados)
      localStorage.setItem('pedidos', JSON.stringify(pedidos))
    }

    alert("Pedido registrado com sucesso!")
    router.push("/pedidos")
  }

  // Valores iniciais do formulário
  const initialValues = {
    produto: '',
    tamanho: '',
    vendedor: '',
    comprador: '',
    dataVenda: '',
    statusEntrega: '',
    dataEntrega: ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    produto: Yup.string().required("Campo obrigatório"),
    tamanho: Yup.string().required("Campo obrigatório"),
    vendedor: Yup.string().required("Campo obrigatório"),
    comprador: Yup.string().required("Campo obrigatório"),
    dataVenda: Yup.date().required("Campo obrigatório"),
    statusEntrega: Yup.string().required("Campo obrigatório"),
    dataEntrega: Yup.date().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Registro de Pedido"}>
      <Formik
        initialValues={pedidoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
          // Atualiza o tamanho automaticamente ao selecionar o produto
          const handleProdutoChange = (e) => {
            const produtoSelecionado = produtos.find(produto => produto.id === e.target.value)
            setFieldValue('produto', e.target.value)
            setFieldValue('tamanho', produtoSelecionado?.tamanho || '')
          }

          return (
            <Form onSubmit={handleSubmit}>
              
              {/* Produto */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>Produto:</Form.Label>
                <Form.Select
                  name='produto'
                  value={values.produto}
                  onChange={handleProdutoChange}
                  onBlur={handleBlur}
                  isValid={touched.produto && !errors.produto}
                  isInvalid={touched.produto && errors.produto}
                >
                  <option value=''>Selecione o Produto</option>
                  {produtos.map(produto => (
                    <option key={produto.id} value={produto.id}>{produto.nome}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.produto}</Form.Control.Feedback>
              </Form.Group>

              {/* Tamanho */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>Tamanho:</Form.Label>
                <Form.Control
                  name='tamanho'
                  type='text'
                  value={values.tamanho}
                  readOnly
                />
              </Form.Group>

              {/* Vendedor */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>Vendedor:</Form.Label>
                <Form.Select
                  name='vendedor'
                  value={values.vendedor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.vendedor && !errors.vendedor}
                  isInvalid={touched.vendedor && errors.vendedor}
                >
                  <option value=''>Selecione o Vendedor</option>
                  {vendedores.map(vendedor => (
                    <option key={vendedor.id} value={vendedor.id}>{vendedor.nome} {vendedor.sobrenome}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.vendedor}</Form.Control.Feedback>
              </Form.Group>

              {/* Comprador */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>Comprador:</Form.Label>
                <Form.Select
                  name='comprador'
                  value={values.comprador}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.comprador && !errors.comprador}
                  isInvalid={touched.comprador && errors.comprador}
                >
                  <option value=''>Selecione o Comprador</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>{cliente.nome} {cliente.sobrenome}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.comprador}</Form.Control.Feedback>
              </Form.Group>

              {/* Data de Venda */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>Data de Venda:</Form.Label>
                <Form.Control
                  name='dataVenda'
                  type='date'
                  value={values.dataVenda}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataVenda && !errors.dataVenda}
                  isInvalid={touched.dataVenda && errors.dataVenda}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataVenda}</Form.Control.Feedback>
              </Form.Group>

              {/* Status da Entrega */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>Status da Entrega:</Form.Label>
                <Form.Select
                  name='statusEntrega'
                  value={values.statusEntrega}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.statusEntrega && !errors.statusEntrega}
                  isInvalid={touched.statusEntrega && errors.statusEntrega}
                >
                  <option value=''>Selecione o Status</option>
                  <option value='em processamento'>Em Processamento</option>
                  <option value='em separação'>Em Separação</option>
                  <option value='pedido enviado'>Pedido Enviado</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.statusEntrega}</Form.Control.Feedback>
              </Form.Group>

              {/* Data de Entrega */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label>Data de Entrega:</Form.Label>
                <Form.Control
                  name='dataEntrega'
                  type='date'
                  value={values.dataEntrega}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataEntrega && !errors.dataEntrega}
                  isInvalid={touched.dataEntrega && errors.dataEntrega}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataEntrega}</Form.Control.Feedback>
              </Form.Group>

              {/* Botões */}
              <Form.Group className='text-end'>
                <Button className='me-2' href='/pedidos'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>
    </Pagina>
  )
}
