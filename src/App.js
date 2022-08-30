import React, {Suspense} from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './app/config/language_config.js';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './app/routes';
import PageComponent from './app/components/PageComponent';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense>
        <Router>
          <PageComponent>
            <Routes />
          </PageComponent>
        </Router>
      </Suspense>
    </I18nextProvider>
  );
}

export default App;
