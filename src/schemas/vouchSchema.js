const { model, Schema } = require('mongoose');

module.exports = model('vouchSchema',
    new Schema({
        userId: String,
        totalVouch: Number,
    })
);