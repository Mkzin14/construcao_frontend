'use client';

import Pagina from '@/components/Pagina';
import { Formik } from 'formik';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FaCheck, FaTrash } from 'react-icons/fa';
import ReactInputMask from 'react-input-mask';
import * as Yup from "yup";

export default function CadastroImovel() {
  function cadastrar(imovel) {
    console.log(imovel);
    const imoveis = JSON.parse(localStorage.getItem('imoveis')) || [];
    imoveis.push(imovel);
    localStorage.setItem('imoveis', JSON.stringify(imoveis));
    alert("Imóvel cadastrado com sucesso!");
  }

  const initialValues = {
    tipo: '', //casa, apartamento, terreno, sala comercial
    finalidade: '', //aluguel, venda
    valor: '',
    area: '',
    quartos: '',
    banheiros: '',
    descricao: '',
    foto: '',
    vagasGaragem: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
    },
    proprietario: {
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
    },
  };

  const validationSchema = Yup.object().shape({
    tipo: Yup.string().required('Campo é obrigatório'),
    finalidade: Yup.string().required('Campo é obrigatório'),
    valor: Yup.number().required('Campo é obrigatório').positive('Deve ser um valor positivo'),
    area: Yup.number().required('Campo é obrigatório').positive('Deve ser um valor positivo'),
    quartos: Yup.number().required('Campo é obrigatório').integer('Deve ser um número inteiro'),
    banheiros: Yup.number().required('Campo é obrigatório').integer('Deve ser um número inteiro'),
    descricao: Yup.string().required('Campo é obrigatório'),
    foto: Yup.string().url('Deve ser um link válido').required('Campo é obrigatório'),
    vagasGaragem: Yup.number().integer('Deve ser um número inteiro'),
    endereco: Yup.object().shape({
      cep: Yup.string().required("Campo é obrigatório"),
      logradouro: Yup.string().required("Campo é obrigatório"),
      numero: Yup.string().required("Campo é obrigatório"),
      complemento: Yup.string(),
      bairro: Yup.string().required("Campo é obrigatório"),
      cidade: Yup.string().required("Campo é obrigatório"),
      uf: Yup.string().required("Campo é obrigatório").length(2, 'UF deve ter 2 caracteres'),
    }),
    proprietario: Yup.object().shape({
      nome: Yup.string().required("Campo é obrigatório"),
      email: Yup.string().email("E-mail inválido").required("Campo é obrigatório"),
      telefone: Yup.string().required("Campo é obrigatório"),
      cpf: Yup.string().required("Campo é obrigatório"),
    }),
  });

  return (
    <Pagina titulo={"Cadastro de Imóveis"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={cadastrar}
      >
        {({ values, errors, touched, handleBlur, handleSubmit, handleReset, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <div className='text-center'>
              <h3>Dados do Proprietário</h3>
              <hr />
            </div>

            <Row className='mb-2'>
            <Form.Group as={Col}>
              <Form.Label>Nome do Proprietário:</Form.Label>
              <Form.Control
                name='proprietario.nome'
                type='text'
                value={values.proprietario.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.proprietario?.nome && !errors.proprietario?.nome}
                isInvalid={touched.proprietario?.nome && !!errors.proprietario?.nome}
              />
              <Form.Control.Feedback type='invalid'>{errors.proprietario?.nome}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>CPF/CNPJ:</Form.Label>
              <Form.Control
                name='proprietario.cpf'
                type='text'
                value={values.proprietario.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.proprietario?.cpf && !errors.proprietario?.cpf}
                isInvalid={touched.proprietario?.cpf && !!errors.proprietario?.cpf}
              />
              <Form.Control.Feedback type='invalid'>{errors.proprietario?.cpf}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                name='proprietario.email'
                type='email'
                value={values.proprietario.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.proprietario?.email && !errors.proprietario?.email}
                isInvalid={touched.proprietario?.email && !!errors.proprietario?.email}
              />
              <Form.Control.Feedback type='invalid'>{errors.proprietario?.email}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className='mb-2'>
            <Form.Group as={Col} md={6}>
              <Form.Label>Telefone:</Form.Label>
              <Form.Control as={ReactInputMask}
                mask={"(99)99999-9999"}
                placeholder='(99)99999-9999'
                name='proprietario.telefone'
                type='text'
                value={values.proprietario.telefone}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.proprietario?.telefone && !errors.proprietario?.telefone}
                isInvalid={touched.proprietario?.telefone && !!errors.proprietario?.telefone}
              />
              <Form.Control.Feedback type='invalid'>{errors.proprietario?.telefone}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <div className='text-center'>
            <h3>Endereço</h3>
            <hr />
          </div>

          <Row className='mb-2'>
            <Form.Group as={Col} md={3}>
              <Form.Label>Cep:</Form.Label>
              <Form.Control as={ReactInputMask}
                mask={"99999-999"}
                placeholder="99999-999"
                name='endereco.cep'
                type='text'
                value={values.endereco.cep}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.endereco?.cep && !errors.endereco?.cep}
                isInvalid={touched.endereco?.cep && !!errors.endereco?.cep}
              />
              <Form.Control.Feedback type='invalid'>{errors.endereco?.cep}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Logradouro:</Form.Label>
              <Form.Control
                name='endereco.logradouro'
                type='text'
                value={values.endereco.logradouro}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.endereco?.logradouro && !errors.endereco?.logradouro}
                isInvalid={touched.endereco?.logradouro && !!errors.endereco?.logradouro}
              />
              <Form.Control.Feedback type='invalid'>{errors.endereco?.logradouro}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className='mb-2'>
            <Form.Group as={Col}>
              <Form.Label>Número:</Form.Label>
              <Form.Control
                name='endereco.numero'
                type='text'
                value={values.endereco.numero}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.endereco?.numero && !errors.endereco?.numero}
                isInvalid={touched.endereco?.numero && !!errors.endereco?.numero}
              />
              <Form.Control.Feedback type='invalid'>{errors.endereco?.numero}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Complemento:</Form.Label>
              <Form.Control
                name='endereco.complemento'
                type='text'
                value={values.endereco.complemento}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.endereco?.complemento && !errors.endereco?.complemento}
                isInvalid={touched.endereco?.complemento && !!errors.endereco?.complemento}
              />
              <Form.Control.Feedback type='invalid'>{errors.endereco?.complemento}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className='mb-2'>
            <Form.Group as={Col}>
              <Form.Label>Cidade:</Form.Label>
              <Form.Control
                name='endereco.cidade'
                type='text'
                value={values.endereco.cidade}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.endereco?.cidade && !errors.endereco?.cidade}
                isInvalid={touched.endereco?.cidade && !!errors.endereco?.cidade}
              />
              <Form.Control.Feedback type='invalid'>{errors.endereco?.cidade}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Bairro:</Form.Label>
              <Form.Control
                name='endereco.bairro'
                type='text'
                value={values.endereco.bairro}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.endereco?.bairro && !errors.endereco?.bairro}
                isInvalid={touched.endereco?.bairro && !!errors.endereco?.bairro}
              />
              <Form.Control.Feedback type='invalid'>{errors.endereco?.bairro}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>UF:</Form.Label>
              <Form.Control
                name='endereco.uf'
                type='text'
                value={values.endereco.uf}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.endereco?.uf && !errors.endereco?.uf}
                isInvalid={touched.endereco?.uf && !!errors.endereco?.uf}
              />
              <Form.Control.Feedback type='invalid'>{errors.endereco?.uf}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <div className='text-center'>
            <h3>Dados do Imóvel</h3>
            <hr />
          </div>

          <Row className='mb-2'>
            <Form.Group as={Col}>
              <Form.Label>Tipo de Imóvel:</Form.Label>
              <Form.Select
                name='tipo'
                value={values.tipo}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.tipo && !errors.tipo}
                isInvalid={touched.tipo && !!errors.tipo}
              >
                <option value=''>Selecione</option>
                <option value="Casa">Casa</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Terreno">Terreno</option>
                <option value="Sala Comercial">Sala Comercial</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.tipo}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Finalidade:</Form.Label>
              <Form.Select
                name='finalidade'
                value={values.finalidade}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.finalidade && !errors.finalidade}
                isInvalid={touched.finalidade && !!errors.finalidade}
              >
                <option value=''>Selecione</option>
                <option value="Aluguel">Aluguel</option>
                <option value="Venda">Venda</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.finalidade}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Valor:</Form.Label>
              <Form.Control
                name='valor'
                type='number'
                value={values.valor}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.valor && !errors.valor}
                isInvalid={touched.valor && !!errors.valor}
              />
              <Form.Control.Feedback type='invalid'>{errors.valor}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className='mb-2'>
            <Form.Group as={Col}>
              <Form.Label>Área (m²):</Form.Label>
              <Form.Control
                name='area'
                type='number'
                value={values.area}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.area && !errors.area}
                isInvalid={touched.area && !!errors.area}
              />
              <Form.Control.Feedback type='invalid'>{errors.area}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Quartos:</Form.Label>
              <Form.Control
                name='quartos'
                type='number'
                value={values.quartos}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.quartos && !errors.quartos}
                isInvalid={touched.quartos && !!errors.quartos}
              />
              <Form.Control.Feedback type='invalid'>{errors.quartos}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Banheiros:</Form.Label>
              <Form.Control
                name='banheiros'
                type='number'
                value={values.banheiros}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.banheiros && !errors.banheiros}
                isInvalid={touched.banheiros && !!errors.banheiros}
              />
              <Form.Control.Feedback type='invalid'>{errors.banheiros}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className='mb-2'>
            <Form.Group as={Col}>
              <Form.Label>Descrição:</Form.Label>
              <Form.Control
                name='descricao'
                as="textarea"
                rows={3}
                value={values.descricao}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.descricao && !errors.descricao}
                isInvalid={touched.descricao && !!errors.descricao}
              />
              <Form.Control.Feedback type='invalid'>{errors.descricao}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Link da Foto:</Form.Label>
              <Form.Control
                name='foto'
                type='text'
                value={values.foto}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.foto && !errors.foto}
                isInvalid={touched.foto && !!errors.foto}
              />
              <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Vagas na Garagem:</Form.Label>
              <Form.Control
                name='vagasGaragem'
                type='number'
                value={values.vagasGaragem}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.vagasGaragem && !errors.vagasGaragem}
                isInvalid={touched.vagasGaragem && !!errors.vagasGaragem}
              />
              <Form.Control.Feedback type='invalid'>{errors.vagasGaragem}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className='text-end mb-5'>
            <Button onClick={handleReset} className='me-2'><FaTrash /> Limpar</Button>
            <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
          </Form.Group>

        </Form>
      )}
    </Formik>
  </Pagina>
  )
}  