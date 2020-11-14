const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:daniel12345@cluster0.yq7vq.mongodb.net/MG', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('mongo connected')

});


module.exports = db;