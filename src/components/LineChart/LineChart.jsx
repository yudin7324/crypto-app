import React from 'react';
import { Col, Row, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import './LineChart.css';

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {

  const coinPrice = [];
  const coinTimestamp = [];

  for(let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price)
    coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp.slice(1, 100),
    datasets: [
      {
        label: 'Цена в USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#1192B7',
        borderColor: '#1192B7'
      }
    ]
  }

  const options = {
    scalse: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  return (
    <div className="chart">
      <Row className="chart-header">
        <Title level={2}>График цены: {coinName}</Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Текущая цена {coinName}: $ {currentPrice}
          </Title>
        </Col>
      </Row> 
      <Line data={data} options={options}/>
    </div>
  )
}

export default LineChart;
