const Subscriber = require('../../models/Subscriber');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

exports.handleSubscribe = async (req, res) => {
    const { firstName, lastName, email } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    try {
        const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
        if (existingSubscriber) {
            return res.status(400).json({ success: false, message: 'You have already subscribed with this email.' });
        }

        const newSubscriber = new Subscriber({ firstName, lastName, email: email.toLowerCase() });
        await newSubscriber.save();

        return res.json({ success: true, message: 'Thank you for subscribing!' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'You have already subscribed with this email.' });
        }
        console.error('Error subscribing:', error);
        return res.status(500).json({ success: false, message: 'There was an error, please try again.' });
    }
};

exports.showSubscribePage = (req, res) => {
    res.render('subscribe', {
        title: 'Subscribe to Our Newsletter',
        description: 'Sign up to get a dose of life & style in your inbox, PLUS get access to exclusive fashion & lifestyle content just for subscribers!',
        message: null 
    });
};
