const mongoose = require('mongoose');
const { mongoConnectionString } = require('../config.json')

const connection = async (req, res) => {
    try {
        await mongoose.connect(mongoConnectionString).then(() => {
            console.log('Connected to MongoDB');
        }).catch((error) => {
            console.log('Could not connect to MongoDB', error);
        });
    }
    catch (error) {
        console.log('Could not connect to MongoDB', error);

    }
}
connection();
