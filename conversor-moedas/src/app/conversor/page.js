'use client'

import { useState } from 'react';
import Pagina from '@/components/Pagina'

export default function Page() {
  const [valorReais, setValorReais] = useState('');
  const [moeda, setMoeda] = useState('dolar');
  const [resultado, setResultado] = useState('');

  const valoresConversao = {
    dolar: [0.18],
    euro: [0.16],
    bitcoin: [0.000003],
  };

  const converterMoeda = () => {
    const valor = parseFloat(valorReais);
    if (!isNaN(valor)) {
      const valorConvertido = valor * valoresConversao[moeda];
      setResultado(`R$ ${valorReais} = ${valorConvertido.toFixed(2)} ${moeda}`);
    } else {
      setResultado('Por favor, insira um valor válido.');
    }
  };

  const limparCampos = () => {
    setValorReais('');
    setMoeda('dolar');
    setResultado('');
  };

  return (
    <Pagina título="Conversor de Moedas">    
    <div style={{ padding: '20px' }}>
      <img src="/conversor/moedas.avif"></img>
      <h1>Conversor de Moedas</h1>
      <input
        type="number"
        value={valorReais}
        onChange={(e) => setValorReais(e.target.value)}
        placeholder="Valor em R$"
      />
      <select value={moeda} onChange={(e) => setMoeda(e.target.value)}>
        <option value="euro">Euro</option>
        <option value="bitcoin">Bitcoin</option>
        <option value="dolar">Dólar</option>
      </select>
      <button onClick={converterMoeda}>Converter</button>
      <button onClick={limparCampos}>Limpar</button>
      {resultado && <h2>{resultado}</h2>}
    </div>
  
    </Pagina>
  );
}
