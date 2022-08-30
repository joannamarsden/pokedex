import React from 'react';
import { useTranslation } from 'react-i18next'
import { useGetEvolutionsQuery } from '../../../api/apiSlice'
import { Col, Row, Spin, Typography } from 'antd';

const { Text } = Typography;

function Evolutions({id, name}) {
  const {t} = useTranslation('common');

  const {
    data: evolutions = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetEvolutionsQuery(id);

  let content;
  if (isLoading) {
    content = <Row justify="center"><Spin spinning /></Row>
  } else if (isSuccess) {
    const {chain} = evolutions;
    const {evolves_to} = chain;
    const evolutionChain = Object.values(evolves_to)[0];
    let subsequentEvolutions = [];

    if (evolutionChain) {
      subsequentEvolutions.push(evolutionChain.species);
    }
    if (evolutionChain.evolves_to.length) {
      subsequentEvolutions.push(evolutionChain.evolves_to[0].species);
    }
    const filtered = subsequentEvolutions.filter(subsequentEvolution => subsequentEvolution.name !== name);

    content = (
      <>
        {(filtered.length > 0) && (
          <Text strong>{t('evolves_to')}</Text>
        )}
        <Text>
          {filtered.map((subsequentEvolution, i) => <span key={i}>
            {(i > 0) && ", "}
              <a href={`/species/${subsequentEvolution.name}`}>{subsequentEvolution.name}</a>
            </span>)}
        </Text>
    </>
  )
  }

  return (
    <Col span={24}>
      <Row justify="center">
        { content }
      </Row>
    </Col>
  )
}

export default Evolutions;
