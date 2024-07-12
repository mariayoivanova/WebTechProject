const Subscriber = require('../models/Subscriber');

exports.showSubscribePage = (req, res) => {
    res.render('subscribe', { message: null });
};

exports.handleSubscribe = async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.json({ success: false, message: 'You have already subscribed with this email.' });
        }

        const newSubscriber = new Subscriber({ firstName, lastName, email });
        await newSubscriber.save();

        return res.json({ success: true, message: 'Thank you for subscribing!' });
    } catch (error) {
        console.error('Error subscribing:', error);
        return res.status(500).json({ success: false, message: 'There was an error, please try again.' });
    }
};
