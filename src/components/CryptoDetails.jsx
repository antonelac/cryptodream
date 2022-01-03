import React from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Typography } from "antd";
import { DollarCircleOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, FundOutlined, MoneyCollectOutlined, ExclamationCircleOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
import Loader from './Loader';

const { Title, Text } = Typography;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const cryptoDetails = data?.data?.coin;

    if (isFetching) return <Loader />;

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
      { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return(
        <Col className="coin-detail-container">
          <Col className="coin-heading-container">
           <Title level={2} className="coin-name">
              {data?.data?.coin.name} Price
           </Title>
           <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
          </Col>
          <Col className="stats-container">
            <Col className="coin-value-statistics">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
                <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
              </Col>
              {stats.map(({ icon, title, value }) => (
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
                <Title level={3} className="coin-details-heading">Other Stats Info</Title>
                <p>An overview showing the statistics of {cryptoDetails.name}, such as the number of markets and total supply.</p>
              </Col>
              {genericStats.map(({ icon, title, value }) => (
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
        </Col>
    );
}

export default CryptoDetails;