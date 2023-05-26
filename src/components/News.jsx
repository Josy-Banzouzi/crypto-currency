import React, { useState } from 'react'
import { Select, Row, Col, Avatar, Typography ,Card} from 'antd'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const {Title} = Typography;
const {Option} = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';


const News = ({simplified}) => {
  const [newsCatergory, setNewsCategory] = useState('Cryptocurrency')
  const count = simplified ? 6 : 12;
  const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({newsCatergory, count: count});
  const {data} = useGetCryptosQuery(100)
  if(isFetching) return <Loader />
  return (
    <Row gutter={[24, 24]}>
       {!simplified && (
          <Col span={24}>
              <Select
                showSearch
                className='select-news'
                placeholder='select a crypto'
                optionFilterProp='children'
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())}
              >
                <Option value='Cryptocurrency'>Cryptocurrency</Option>
                {data?.data?.coins.map((currency) => (
                  <Option value={currency.name}>{currency.name}</Option>
                ))}
              </Select>
          </Col>
      )}
      {cryptoNews?.value.map((news, i) => (
        <Col key={i} xs={24} sm={12} lg={8}>
            <Card hoverable className='news-card'>
                <a href={news.url} target='_blank' rel='noreferrer'>
                  <div className='news-image-container'>
                    <Title className='news-title' level={4}>{news.name}</Title>
                    <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail.contentUrl ||demoImage } alt='news' />
                  </div>
                  <p>
                    {news.description > 100 ? `${news.description.substring(0, 100)}...`: news.description}
                  </p>
                  <div className='provider-container'>
                    <div>
                       <Avatar src={news.provider[0]?.image?.thumbnail.contentUrl || demoImage} alt='news'/>
                        <Title className='provider-name'>{news.provider[0]?.name}</Title>
                    </div>
                      <Title>{moment(news.datePublished).startOf('ss').fromNow()}</Title>
                  </div>
                </a>
            </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News