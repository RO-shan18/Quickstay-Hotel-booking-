import { request } from 'express';
import Stripe from 'stripe';
import bookingmodel from '../models/bookingmodel.js';

const stripewebhook = async(req, res)=>{
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const signature = request.headers['stripe-signature']

        let event

        try{
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                process.env.STRIPE_WEBHOOKS_SECRET
            )
        }catch(error){
        res.status(400).send(`Webhook error:${error.message}`)
         }

        if(event.type === 'payment_intent.succeeded'){
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //Getting session data
            const session = await stripe.checkout.sessions.list({
                payment_intent : paymentIntentId
            })

            const {bookingId} = session.data[0].metadata;

            await bookingmodel.findByIdAndUpdate(bookingId, {isPaid : true, paymentMethod : 'Stripe'});
        }else{
            console.log("Unhandled event type: ", event.type)
        }

        res.json({received : true});
}

export default stripewebhook