import React, { useState } from 'react';
import { Typography, Select, Row, Col, Card, Avatar } from 'antd';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import moment from 'moment';
import Loader from '../Loader/Loader';
import './News.css';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({ 
    newsCategory, count: simplified ? 6 : 12
  });
  const { data } = useGetCryptosQuery(100);

  if(!cryptoNews?.value) return <Loader/>;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select 
            showSearch 
            className="select-news" 
            placeholder="Выберите криптовалюту" 
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency">Все</Option>
            {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} md={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer"> 
              <div className="news-card-content">
                <div className="news-image-container">
                  <div className="news-image">
                    <img 
                      src={news?.image?.thumbnail?.contentUrl || demoImage} 
                      alt="newsPreview" 
                    />
                  </div>
                  
                  <Title className="news-title" level={5}>{news.name}</Title>
                </div>
                <p className="news-card-description">
                  {news.description > 80 
                    ? `${news.description.substring(0, 80)}` 
                    : news.description 
                  }
                </p>
                <div className="card-news-footer">
                  <div>
                    <Avatar src={ news.provider[0]?.image?.thumbnail?.contentUrl || demoImage } alt="news"/>
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(news.datPublished).format("MMM Do YY")}</Text>
                </div> 
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News;
