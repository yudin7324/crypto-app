import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useGetExchangesQuery } from '../../services/cryptoApi';
import Loader from '../Loader/Loader';
import './Exchanges.css';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col xs={13} sm={15} md={12} lg={12}>Биржы</Col>
        <Col xs={5} sm={3} md={3} lg={4}>24ч.</Col>
        <Col xs={3} sm={3} md={3} lg={4}>Рынки</Col>
        <Col xs={2} sm={3} md={3} lg={4}>Объемы(%)</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col xs={13} sm={15} md={12} lg={12}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col xs={5} sm={3} md={3} lg={4}>${millify(exchange.volume)}</Col>
                    <Col xs={3} sm={3} md={3} lg={4}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col xs={2} sm={3} md={3} lg={4}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
