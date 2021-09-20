import React, { useState } from 'react';
import { Typography, Select, Col, Row } from 'antd';
import { 
  CheckOutlined, 
  DollarCircleOutlined, 
  ExclamationCircleOutlined, 
  FundOutlined, 
  MoneyCollectOutlined, 
  NumberOutlined, 
  StopOutlined, 
  ThunderboltOutlined, 
  TrophyOutlined 
} from '@ant-design/icons';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoApi';
import LineChart from '../LineChart/LineChart';
import Loader from '../Loader/Loader';
import './CryptoDetails.css';


const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod});
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ['24h', '7d', '30d', '1y'];

  const stats = [
    { title: 'Цена', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24ч.', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Капитализация', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'Самая высокая цена', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Торгуется на биржах', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Количество бирж', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Одобрено', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Общее предложение', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'В обороте', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          Подробная информация о {cryptoDetails.name} ({cryptoDetails.slug})
        </Title>
      </Col>
      <Select 
        defaultValue="7d" 
        className="select-timeperiod" 
        placeholder="Select Time Period" 
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart 
        coinHistory={coinHistory} 
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={2} className="coin-detailes-heading">
              {cryptoDetails.name} Статистика
            </Title>
          </Col>
          {stats.map(({icon, title, value}) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={2} className="coin-detailes-heading">
              Общая статистика
            </Title>
          </Col>
          {genericStats.map(({icon, title, value}) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
            <Title level={2} className="coin-details-heading">
              {cryptoDetails.name}
              {HTMLReactParser(cryptoDetails.description)}
            </Title>
        </Row>  
        <Col className="coin-links">
          <Title level={2} className="coin-details-heading">
            Полезные ссылки {cryptoDetails.name} 
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>  
      </Col>
    </Col>
  )
}

export default CryptoDetails;
