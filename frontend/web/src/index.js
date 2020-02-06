import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";
import { StoreProvider } from './store'
import rootReducer from './store/rootReducer'
import rootActions from './store/rootActions'

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(
    <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        audience={config.audience}
        issuer={config.issuer}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        scope={"openid profile read:tickets"}
    >
        <StoreProvider rootReducer={rootReducer} rootActions={rootActions}>
            <App />
        </StoreProvider>
    </Auth0Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();