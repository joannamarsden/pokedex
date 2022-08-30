import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useGetPokemonsQuery } from '../../../api/apiSlice'
import { Button, Col, Row, Spin, Typography } from 'antd';

const { Text, Title } = Typography;

function Pokedex() {
  const {t} = useTranslation('common');
  const [params, setParams] = useState(false);

  const {
    data: pokemons = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPokemonsQuery(params);

  let content;

  if (isLoading) {
    content = <Spin spinning={isLoading || isFetching} />
  } else if (isSuccess) {
    const { results } = pokemons;
    const renderedPokemons = results.map(pokemon => {
      const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      return (
      <Col xs={6} key={pokemon.id}>
        <Title level={3}>
          <a href={`/species/${pokemon.name}`}>
            {name}
          </a>
        </Title>
      </Col>
    )})

    const prevParams = pokemons.previous && pokemons.previous.split('?')[1]
    const nextParams = pokemons.next && pokemons.next.split('?')[1];

    content = (
      <>
        <Row style={{ marginTop: 48}}>
          {renderedPokemons}
        </Row>
        <Row justify="space-between" style={{ marginTop: 48}}>
          <Button
            disabled={!pokemons.previous}
            key="prev"
            onClick={() => setParams(prevParams)}
            >
            {t('previous')}
          </Button>
          <Button
            disabled={!pokemons.next}
            key="next"
            onClick={() => setParams(nextParams)}
          >
            {t('next')}
          </Button>
        </Row>
      </>
    );
  }
    return (
      <Col span={24}>
        <Row justify="center">
          <Title>
            {t('pokedex.heading')}
          </Title>
        </Row>
        <Row justify="center">
          <Text>
            {t('pokedex.tag_line')}
          </Text>
        </Row>
        {content}
    </Col>
  )
}

export default Pokedex;
