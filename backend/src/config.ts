const { PORT, MONGODB_URI, WORKERS, JWT_LIFE_TIME, JWT_SECRET } = process.env;

export default {
  JwtLifeTime: JWT_LIFE_TIME || '7d',
  JwtSecret: JWT_SECRET || '',
  MongoDbURI: MONGODB_URI || '',
  Port: PORT || 5000,
  Workers: WORKERS || 1,
};
