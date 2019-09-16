import * as data from './production.json';

export const environment = {
  production: true,
  version: (<any>data).version,
  sentry_dsn: '',
  deploy_url: (<any>data).deploy_url
};
