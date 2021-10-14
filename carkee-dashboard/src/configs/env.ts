interface Env {
  API_ENDPOINT_URL: string;
}

const dev: Env = {
  API_ENDPOINT_URL: 'https://jsonplaceholder.typicode.com',
};

const prod: Env = {
  API_ENDPOINT_URL: 'https://api.prod.com',
};

const test: Env = {
  API_ENDPOINT_URL: 'https://api.test.com',
};

const getEnv = (): Env => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return dev;
    case 'production':
      return prod;
    case 'test':
      return test;
    default:
      return dev;
  }
};

export default getEnv();
