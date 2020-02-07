import * as Keycloak from 'keycloak-connect';
import * as expressSession from 'express-session';

const memoryStore = new expressSession.MemoryStore();

export const keycloak = new Keycloak({ store: memoryStore });

export const session = expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
});

