const { PORT } = require('./common/config');
const dbConnect = require('./common/dbConnect');
const app = require('./app');

dbConnect(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
