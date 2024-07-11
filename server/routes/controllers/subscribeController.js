// server/controllers/subscribeController.js
const Subscriber = require('../../models/Subscriber');

exports.showSubscribePage = (req, res) => {
    res.render('subscribe', { message: null });
};

exports.handleSubscribe = async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        const existingSubscriber = await Subscriber.findOne({ email });

        if (existingSubscriber) {
            return res.render('subscribe', { message: 'You have already subscribed with this email.' });
        }

        const newSubscriber = new Subscriber({ firstName, lastName, email });
        await newSubscriber.save();

        res.render('subscribe', { message: 'Thank you for subscribing!' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
