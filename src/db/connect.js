const mongoose = require('mongoose');
const databaseUrl = process.env.MONGODB_URL;

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
