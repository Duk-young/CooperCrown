import MomentUtils from '@date-io/moment';
import '@fake-db';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import {
  createGenerateClassName,
  jssPreset,
  StylesProvider
} from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import AppContext from './AppContext';
import { Auth } from './auth';
import routes from './fuse-configs/routesConfig';
import store from './store';

import { DateRangePicker } from '@algolia/react-instantsearch-widget-date-range-picker';
import { defineCustomElements } from '@duetds/date-picker/dist/loader';

// Defines the custom elements from the date picker for use on the window object
defineCustomElements(window);

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend(), rtl()],
  insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName();

const App = () => {
  return (
    <AppContext.Provider
      value={{
        routes
      }}>
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Auth>
              <Router history={history}>
                <FuseAuthorization>
                  <FuseTheme>
                    <FuseLayout />
                  </FuseTheme>
                </FuseAuthorization>
              </Router>
            </Auth>
          </MuiPickersUtilsProvider>
        </Provider>
      </StylesProvider>
    </AppContext.Provider>
  );
};

export default App;
