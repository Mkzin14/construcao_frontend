'use client'

import Pagina from '@/components/Pagina';
import { Formik } from 'formik';
import { useState } from 'react';
import { Button, CardImg, Form, Modal } from 'react-bootstrap';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { formatCurrency } from '@/utils/formatCurrency';

const TAXAS_DE_CAMBIO = {
  dolar: 0.18, 
  euro: 0.16, 
  bitcoin: 0.000003, 
};

export default function page() {
  const [showModal, setShowModal] = useState(false);
  const [valorReal, setValorReal] = useState(0);
  const [valoresConvertidos, setValoresConvertidos] = useState({
    dolar: 0.00,
    euro: 0.00,
    bitcoin: 0.00,
  });

  function calcularConversao(valores) {
    const dolar = valores.valorReal * TAXAS_DE_CAMBIO.dolar;
    const euro = valores.valorReal * TAXAS_DE_CAMBIO.euro;
    const bitcoin = valores.valorReal * TAXAS_DE_CAMBIO.bitcoin;

    setValoresConvertidos({ dolar, euro, bitcoin });
    setShowModal(true);
  }

  return (
    <Pagina titulo="Conversor de Moedas">
      <div>
        <CardImg src='/conversor/moedas.avif'/>
      </div>
       <Formik initialValues={{ valorReal: "" }} onSubmit={calcularConversao}>
        {({ values, handleChange, handleSubmit, handleReset }) => (
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Valor em Real (R$):</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={values.valorReal}
                onChange={handleChange('valorReal')}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              <FaCheck /> Converter
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              <FaTrashAlt /> Limpar
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Resultados da Conversão</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul>
                  <li>
                    Dólar (USD):{' '}
                    {formatCurrency('usd', valoresConvertidos.dolar)}
                  </li>
                  <li>
                    Euro (EUR): {formatCurrency('eur', valoresConvertidos.euro)}
                  </li>
                  <li>
                    Bitcoin (BTC): {formatCurrency('btc', valoresConvertidos.bitcoin)}
                  </li>
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}