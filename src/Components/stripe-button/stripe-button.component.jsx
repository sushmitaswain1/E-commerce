import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {

     const priceForStripe = price * 100; //price in cents
     const publishableKey = 'pk_test_51HBDGNJMLdvIJp5wIK7oXBmyMRfgfANrd1Bxy45nVwVCfAJsk2kpws3LKwRu6N4JUesROGQnZ1HZDhHum9cWYYvo00Edy1pUia'
     
     const onToken = token => {
         console.log(token);
         alert('Your Payment is successful')
     }

     return(
        <StripeCheckout
         label = 'Pay Now'
         name = 'NAM It'
         billingAddress
         shippingAddress
         image = 'https://sendeyo.com/up/d/f3eb2117da'
         description = {`Your total is $${price}`}
         panelLabel ='Pay Now'
         amount ={priceForStripe}
         token = {onToken}
         stripeKey ={publishableKey}
        />
        )
};

export default StripeCheckoutButton;