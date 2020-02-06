import { KeycloakService } from 'keycloak-angular';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => keycloak.init({
        config: {
            realm: "helpdesk",
            url: "http://localhost:8080/auth",
            clientId: "helpdesk-web"
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false
        },
        enableBearerInterceptor: true
    });
}