'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { ReactInputMask } from 'react-input-mask'
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ProdutoFormPage(props) {

  const router = useRouter()

  // Recupera produtos do localStorage
  const produtos = JSON.parse(localStorage.getItem('produtos')) || []

  // Recupera o id para edição (se houver)
  const searchParams = useSearchParams(props)
  const id = searchParams.get('id')
  const produtoEditado = produtos.find(item => item.id === id)

  // Função para salvar os dados do formulário
  function salvar(dados) {
    if (produtoEditado) {
      Object.assign(produtoEditado, dados)
      localStorage.setItem('produtos', JSON.stringify(produtos))
    } else {
      dados.id = v4()
      produtos.push(dados)
      localStorage.setItem('produtos', JSON.stringify(produtos))
    }

    alert("Produto cadastrado com sucesso!")
    router.push("/produtos")
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: '',
    tipo: '',
    tamanho: '',
    cor: '',
    marca: '',
    material: '',
    status: '',
    preco: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    tipo: Yup.string().required("Campo obrigatório"),
    tamanho: Yup.string().required("Campo obrigatório"),
    cor: Yup.string().required("Campo obrigatório"),
    marca: Yup.string().required("Campo obrigatório"),
    material: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    preco: Yup.number().required("Campo obrigatório").min(0, "Preço inválido"),
  })

  return (
    <Pagina titulo={"Cadastro de Produto"}>
      <Formik
        initialValues={produtoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome do Produto:</Form.Label>
                <Form.Control
                  name='nome'
                  type='text'
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Tipo de Produto:</Form.Label>
                <Form.Select
                  name='tipo'
                  value={values.tipo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.tipo && !errors.tipo}
                  isInvalid={touched.tipo && errors.tipo}
                >
                  <option value=''>Selecione</option>
                  <option value='camisa'>Camisa</option>
                  <option value='calça'>Calça</option>
                  <option value='bermuda'>Bermuda</option>
                  <option value='tenis'>Tênis</option>
                  <option value='boné'>Boné</option>
                  <option value='jaqueta'>Jaqueta</option>
                  <option value='sandália'>Sandália</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.tipo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Tamanho:</Form.Label>
                <Form.Control as={ReactInputMask}
                  name='tamanho'
                  type='text'
                  mask={'P, M, G, GG ou XGG'}
                  placeholder='P, M, G, GG ou XGG'
                  value={values.tamanho}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.tamanho && !errors.tamanho}
                  isInvalid={touched.tamanho && errors.tamanho}
                />
                <Form.Control.Feedback type='invalid'>{errors.tamanho}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Cor:</Form.Label>
                <Form.Control
                  name='cor'
                  type='text'
                  value={values.cor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.cor && !errors.cor}
                  isInvalid={touched.cor && errors.cor}
                />
                <Form.Control.Feedback type='invalid'>{errors.cor}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Marca:</Form.Label>
                <Form.Control
                  name='marca'
                  type='text'
                  value={values.marca}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.marca && !errors.marca}
                  isInvalid={touched.marca && errors.marca}
                />
                <Form.Control.Feedback type='invalid'>{errors.marca}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Material:</Form.Label>
                <Form.Control
                  name='material'
                  type='text'
                  value={values.material}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.material && !errors.material}
                  isInvalid={touched.material && errors.material}
                />
                <Form.Control.Feedback type='invalid'>{errors.material}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Status:</Form.Label>
                <Form.Select
                  name='status'
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.status && !errors.status}
                  isInvalid={touched.status && errors.status}
                >
                  <option value=''>Selecione</option>
                  <option value='disponivel'>Disponível</option>
                  <option value='esgotado'>Esgotado</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Preço:</Form.Label>
                <Form.Control
                  name='preco'
                  type='number'
                  step='0.01'
                  value={values.preco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.preco && !errors.preco}
                  isInvalid={touched.preco && errors.preco}
                />
                <Form.Control.Feedback type='invalid'>{errors.preco}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' href='/produtos'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
