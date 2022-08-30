import React from 'react';
import { useTranslation } from 'react-i18next'
import { useGetSpeciesQuery } from '../../../api/apiSlice'
import { Col, Row, Spin, Typography } from 'antd';
import Evolutions from './Evolutions';

const { Text } = Typography;

function SpeciesContent({name}) {
  const {t} = useTranslation('common');

  const {
    data: species = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetSpeciesQuery(name);

  let content;
  if (isLoading) {
    content = <Row justify="center"><Spin spinning /></Row>
  } else if (isSuccess) {
    const evolutionChainId = species.evolution_chain.url.split('/')[6];
    content = (
      <>
        {(species.evolves_from_species) && (
          <>
            <Text strong>{t('evolves_from')}</Text>
            <Text><a href={`/species/${species.evolves_from_species.name}`}>{species.evolves_from_species.name}</a></Text>
          </>
        )}
        <Evolutions id={evolutionChainId} name={name} />
      </>
  )}
  return (
    <Col span={24}>
      <Row justify="center">
        { content }
      </Row>
    </Col>
  )
}

export default SpeciesContent;
