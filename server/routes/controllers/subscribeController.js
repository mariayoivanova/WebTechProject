const Subscriber = require('../models/Subscriber');

// Show subscribe page
exports.showSubscribePage = (req, res) => {
    res.render('subscribe', {
        title: 'Subscribe to Our Newsletter',
        description: 'Subscribe to our newsletter to get the latest updates.',
        showModal: false ,
        message: null
    });
};

exports.handleSubscribe = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
        res.render('subscribe', {
            title: 'Subscribe to Our Newsletter',
            description: 'Subscribe to our newsletter to get the latest updates.',
            showModal: false,
            message: "You have already subscribed with this email."
        });
    } else {
        const newSubscriber = new Subscriber({ firstName, lastName, email });
        await newSubscriber.save();
        res.render('subscribe', {
            title: 'Subscribe to Our Newsletter',
            description: 'Subscribe to our newsletter to get the latest updates.',
            showModal: false,
            message: "Thanks for subscribing!"
        });
    }

};
