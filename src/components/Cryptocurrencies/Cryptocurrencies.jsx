import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Card, Col, Input, Row } from 'antd';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './Cryptocurrencies.css';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);


  if(isFetching) return <Loader/>;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Поиск" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[20, 20]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} md={12} lg={8} xl={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`} 
                extra={<img className="crypto-image" src={currency.iconUrl} alt="logo"/>}
                hoverable
              >
                <p>Цена: {millify(currency.price)}</p>
                <p>Капитализация: {millify(currency.marketCap)}</p>
                <p>24 часа: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies;
