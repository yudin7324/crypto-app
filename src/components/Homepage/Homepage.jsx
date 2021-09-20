import React from 'react';
import millify from 'millify';
import { 
  Col, 
  Row, 
  Statistic, 
  Typography 
} from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Link } from 'react-router-dom';
import { Cryptocurrencies, News } from '..';
import Loader from '../Loader/Loader';
import './Homepage.css';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data.stats;

  if (isFetching) return <Loader/>;

  return (
    <>
      <Title level={2} className="heading">
          Статистика 
      </Title>
      <Row justify="start" gutter={[10, 10]}>
        <Col xs={24} sm={12} md={10} lg={4}>
          <Statistic title="Всего криптовалют" value={globalStats.total}/>
        </Col>
        <Col xs={24} sm={12} md={10} lg={4}>
          <Statistic title="Доступных бирж" value={millify(globalStats.totalExchanges)}/>
        </Col>
        <Col xs={24} sm={12} md={10} lg={4}>
          <Statistic title="Капитализация" value={millify(globalStats.totalMarketCap)}/>
        </Col>
        <Col xs={24} sm={12} md={10} lg={4}>
          <Statistic title="Объем (24ч.)" value={millify(globalStats.total24hVolume)}/>
        </Col>
        <Col xs={24} sm={12}  md={10} lg={4}>
          <Statistic title="Всего" value={millify(globalStats.totalMarkets)}/>
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Топ 10 криптовалют в мире</Title>
        <Title level={3} className="show-more">
          <Link style={{ color: '#1192B7' }} to="/cryptocurrencies">Показать больше</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Крипто-новости</Title>
        <Title level={3} className="show-more">
          <Link to="/news">Показать больше</Link>
        </Title>
      </div>
      <News simplified/>
    </>
  )
}

export default Homepage;
