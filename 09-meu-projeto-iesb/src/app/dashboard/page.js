'use client'

import Pagina from '@/components/Pagina'
import { Card, Col, Row } from 'react-bootstrap'
import { FaShoppingCart, FaDollarSign, FaUsers, FaTruck } from 'react-icons/fa'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

// Registrando componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function DashboardPage() {

  // Dados fictícios
  const totalVendas = 250
  const receitaTotal = 125000
  const clientesAtivos = 180
  const pedidosEmTransito = 45

  // Dados para o gráfico de barras (Vendas por mês)
  const barData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Vendas (em unidades)',
        data: [40, 55, 60, 80, 70, 90],
        backgroundColor: '#007bff',
      },
    ],
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Vendas Mensais' },
    },
  }

  // Dados para o gráfico de pizza (Distribuição de Status dos Pedidos)
  const pieData = {
    labels: ['Em Processamento', 'Em Separação', 'Pedido Enviado'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['#ffc107', '#28a745', '#dc3545'],
      },
    ],
  }

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Status dos Pedidos' },
    },
  }

  return (
    <Pagina titulo="Dashboard de Vendas">
      <Row className="mb-4">
        {/* Cards Resumo */}
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaShoppingCart size={40} className="text-primary mb-3" />
              <h3>{totalVendas}</h3>
              <p>Total de Vendas</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaDollarSign size={40} className="text-success mb-3" />
              <h3>R$ {receitaTotal.toLocaleString('pt-BR')}</h3>
              <p>Receita Total</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaUsers size={40} className="text-warning mb-3" />
              <h3>{clientesAtivos}</h3>
              <p>Clientes Ativos</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <FaTruck size={40} className="text-danger mb-3" />
              <h3>{pedidosEmTransito}</h3>
              <p>Pedidos em Trânsito</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Gráficos */}
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Bar data={barData} options={barOptions} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Pie data={pieData} options={pieOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Pagina>
  )
}
