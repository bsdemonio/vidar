import url from 'url';

import mongoose from 'mongoose';
import throng from 'throng';

import app from './app';
import config from './config';

const mongoHost = new url.URL(config.MongoDbURI).host;

const startServer = async () => {
  const mongooseOptions = {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await Promise.all([
      mongoose.connect(config.MongoDbURI, mongooseOptions),
      app.listen(config.Port),
    ]);

    // eslint-disable-next-line no-console
    console.log(`Server has started on port: ${config.Port}, connected to mongo at ${mongoHost}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Could not start the app: ', error);
  }
};

// Let's make Node.js clustered for better multi-core performance
throng({
  lifetime: Infinity,
  start: startServer,
  workers: config.Workers,
});
