const getEnv = (key: string, defaultValue?: string) => {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
};

export const NODE_ENV = getEnv('NODE_ENV', 'development');
export const PORT = getEnv('PORT', '3000');
export const FRONT_END_URL = getEnv('FRONT_END_URL');
export const MONGO_URI = getEnv('MONGO_URI');
