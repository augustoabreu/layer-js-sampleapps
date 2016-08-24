import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Client } from 'layer-sdk';
import { LayerProvider } from 'layer-react';
import Messenger from './containers/Messenger';
import ActiveConversation from './containers/ActiveConversation';
import DefaultPanel from './components/DefaultPanel';
import configureStore from './store/configureStore';
import { usersSet } from './actions/messenger';
import { IndexRoute, Route } from 'react-router';
import { ReduxRouter } from 'redux-router';

let client;
/**
 * Wait for identity dialog message to complete
 */
window.addEventListener('message', function(evt) {
  if (evt.data !== 'layer:identity') return;

  /**
   * Initialize Layer Client with `appId`
   */
  if (!client) {
    client = new Client({
      appId: window.layerSample.appId
    });
  }

  /**
   * Client authentication challenge.
   * Sign in to Layer sample identity provider service.
   *
   * See http://static.layer.com/sdk/docs/#!/api/layer.Client-event-challenge
   */
  client.once('challenge', e => {
    window.layerSample.challenge(e.nonce, e.callback);
  });

  client.on('ready', () => {
    store.dispatch(usersSet(client.userId, window.layerSample.users));
  });

  /**
   * Start authentication
   */
  client.connect(window.layerSample.userId);

  /**
   * Start authentication
   */
  client.connect(window.layerSample.userId);

  /**
   * Share the client with the middleware layer
   */
  const store = configureStore(client);

  // Render the UI wrapped in a LayerProvider
  render(
    <LayerProvider client={client}>
      <Provider store={store}>
        <ReduxRouter>
          <Route path='/' component={Messenger}>
            <IndexRoute component={DefaultPanel}/>
            <Route path='/conversations/:conversationId' component={ActiveConversation}/>
          </Route>
        </ReduxRouter>
      </Provider>
    </LayerProvider>,
    document.getElementById('root')
  );
});
