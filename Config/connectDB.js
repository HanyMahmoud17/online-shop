const mongoose = require('mongoose');
const DB_URL = 'mongodb+srv://HanyMahmoud:9D5X7dxDtfHvhyfn@cluster0.iajcykd.mongodb.net/online-shop?retryWrites=true&w=majority';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

module.exports = db;