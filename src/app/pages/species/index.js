import React from 'react';
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom';
import { useGetPokemonQuery } from '../../../api/apiSlice'
import { Col, Row, Spin, Typography } from 'antd';
import SpeciesContent from './SpeciesContent';

const { Text, Title } = Typography;

function Species() {
  const {t} = useTranslation('common');
  const location = useLocation();
  const name = location.pathname.split("/")[2];

  const {
    data: pokemon = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPokemonQuery(name);

  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  let content;

  if (isLoading) {
    content = <Row justify="center"><Spin spinning /></Row>
  } else if (isSuccess) {
    const { forms, height, sprites, types, weight } = pokemon;
    content = (
      <>
        <Row justify="center">
          <img src={sprites.front_default} alt={displayName} />
        </Row>
        <Row justify="center">
            <Text strong>{t('height')}</Text>
            <Text>{height}</Text>
        </Row>
        <Row justify="center">    
            <Text strong>{t('weight')}</Text>
            <Text>{weight}</Text>
        </Row>
        <Row justify="center">
          <Text strong>{t('type', {count: types.length })}</Text>
          <Text>
            {types.map((type, i) => <span key={i}>
              {i > 0 && ", "}
              {type.type.name}
              </span>)}
          </Text>
        </Row>
    </>
  )}
  return (
    <Col span={24}>
      <Row justify="center">
        <Title>
          {displayName}
        </Title>
      </Row>
      { content }
      <SpeciesContent name={name} />
    </Col>
  )
}

export default Species;
