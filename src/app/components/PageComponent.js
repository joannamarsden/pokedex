import { Layout, Menu } from 'antd';
import React from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

const { Header, Content, Footer } = Layout;

function PageComponent({children}) {
  const {t} = useTranslation('common');
  const location = useLocation();

  const menuItems = [
    {
      label: (
        <a href={`${location.pathname}/?lng=fr`}>{t('language_switcher.fr')}</a>
      ),
      key: 'fr'
    },
    {
      label: (
        <a href={`${location.pathname}/?lng=en`}>{t('language_switcher.en')}</a>
      ),
      key: 'en'
    }
  ]

  return (
    <Layout style={{ height: '100vh'}}>
      <Header style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'fixed'}}>
        <a href="/"><img src={logo} alt="logo" width="64px" height="64px" /></a>
        <Menu mode="horizontal" items={menuItems} theme="dark" />
      </Header>
      <Content className="site-layout" style={{padding: '24px 48px 48px', marginTop: 64}}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center'}}>
        Joanna Marsden 2022
      </Footer>
    </Layout>
  )
}

export default withTranslation()(PageComponent);
