const Subscriber = require('../models/Subscriber');

// Show subscribe page
exports.showSubscribePage = (req, res) => {
    res.render('subscribe', {
        title: 'Subscribe to Our Newsletter',
        description: 'Subscribe to our newsletter to get the latest updates.',
        message: null
    });
};

exports.handleSubscribe = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        console.log('Checking for existing subscriber with email:', email);
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            console.log('Subscriber already exists:', existingSubscriber);
            return res.status(200).json({
                success: false,
                message: "You have already subscribed with this email."
            });
        } else {
            const newSubscriber = new Subscriber({ firstName, lastName, email });
            await newSubscriber.save();
            console.log('New subscriber added:', newSubscriber);
            return res.status(200).json({
                success: true,
                message: "Thanks for subscribing!"
            });
        }
    } catch (error) {
        console.error('Error during subscription:', error);
        return res.status(500).json({
            success: false,
            message: "There was an error processing your subscription. Please try again later."
        });
    }
};
