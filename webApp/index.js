import express from 'express';
import moongoose from 'mongoose';
const app = express();

moongoose.connect('mongodb://localhost:27017/restaurants', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB...'))
    const port = 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));

const restaurantSchema = new moongoose.Schema({
    address: String
});

const Restaurant = moongoose.model('restaurantcollections', restaurantSchema);

app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.send(restaurants);
    }
    catch (ex) {
        res.status(500).send('Something failed.');
    }
});