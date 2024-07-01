const Subscriber = require('../models/Subscriber');

exports.showSubscribePage = (req, res) => {
    res.render('subscribe', { title: 'Subscribe', message: null });
};

exports.handleSubscribe = async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        // Check if the email already exists in the database
        const existingSubscriber = await Subscriber.findOne({ email });

        if (existingSubscriber) {
            return res.render('subscribe', { 
                title: 'Subscribe', 
                message: 'You have already subscribed with this email.' 
            });
        }

        // Create a new subscriber
        const newSubscriber = new Subscriber({ firstName, lastName, email });
        await newSubscriber.save();

        res.render('subscribe', { 
            title: 'Subscribe', 
            message: 'Thank you for subscribing!' 
        });
    } catch (e) {
        res.status(500).send('An error occurred while processing your request.');
    }
};
