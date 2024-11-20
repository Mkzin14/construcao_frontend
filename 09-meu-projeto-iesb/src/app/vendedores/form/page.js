'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import {ReactInputMask} from 'react-input-mask';
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function VendedoresFormPage(props) {

  const router = useRouter()

  // Recupera funcionários do localStorage
  const vendedores = JSON.parse(localStorage.getItem('vendedores')) || []

  // Recupera o id para edição (se houver)
  const searchParams = useSearchParams(props);
  const id = searchParams.get('id');
  const vendedorEditado = vendedores.find(item => item.id === id)

  // Função para salvar os dados do form
  function salvar(dados) {
    if (vendedorEditado) {
      Object.assign(vendedorEditado, dados)
      localStorage.setItem('vendedores', JSON.stringify(vendedores))
    } else {
      dados.id = v4()
      vendedores.push(dados)
      localStorage.setItem('vendedores', JSON.stringify(vendedores))
    }

    alert("Vendedor cadastrado com sucesso!")
    router.push("/vendedores")
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: '',
    sobrenome: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    endereco: '',
    foto: ''
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    sobrenome: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório").length(11, "CPF deve ter 11 dígitos"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    foto: Yup.string().url("URL da foto inválida").required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Vendedor"}>
      <Formik
        initialValues={vendedorEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Nome:</Form.Label>
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

                <Form.Group as={Col}>
                  <Form.Label>Sobrenome:</Form.Label>
                  <Form.Control
                    name='sobrenome'
                    type='text'
                    value={values.sobrenome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.sobrenome && !errors.sobrenome}
                    isInvalid={touched.sobrenome && errors.sobrenome}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.sobrenome}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Telefone:</Form.Label>
                  <Form.Control as={ReactInputMask}
                    name='telefone'
                    type='text'
                    mask={"(99)99999-9999"}
                    placeholder={'(99)99999-9999'}
                    value={values.telefone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.telefone && !errors.telefone}
                    isInvalid={touched.telefone && errors.telefone}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>CPF:</Form.Label>
                  <Form.Control as={ReactInputMask}
                    name='cpf'
                    type='text'
                    mask={"999-999-999-99"}
                    placeholder='999-999-999-99'
                    maxLength={11}
                    value={values.cpf}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cpf && !errors.cpf}
                    isInvalid={touched.cpf && errors.cpf}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.cpf}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Data de Nascimento:</Form.Label>
                  <Form.Control
                    name='dataNascimento'
                    type='date'
                    value={values.dataNascimento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.dataNascimento && !errors.dataNascimento}
                    isInvalid={touched.dataNascimento && errors.dataNascimento}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.dataNascimento}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Endereço:</Form.Label>
                  <Form.Control
                    name='endereco'
                    type='text'
                    value={values.endereco}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.endereco && !errors.endereco}
                    isInvalid={touched.endereco && errors.endereco}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.endereco}</Form.Control.Feedback>
                </Form.Group>
              </Row>
              
              <Form.Group className='mb-2'>
                <Form.Label>Foto (URL):</Form.Label>
                <Form.Control
                  name='foto'
                  type='text'
                  value={values.foto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.foto && !errors.foto}
                  isInvalid={touched.foto && errors.foto}
                />
                <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
                {values.foto && !errors.foto && (
                  <img src={values.foto} alt="Foto do vendedor" style={{ maxWidth: '200px', marginTop: '10px' }} />
                )}
              </Form.Group>

              {/* Botões */}
              <Form.Group className='text-end'>
                <Button className='me-2' href='/vendedores'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>
    </Pagina>
  )
}
