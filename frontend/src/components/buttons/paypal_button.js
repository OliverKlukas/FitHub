import * as React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";


export const PaypalCheckoutButton = (props) => {

    // handle routing to the myplans view after payment
    let navigate = useNavigate();

    const { product } = props;

    const [paidFor, setPaidFor] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleApprove = (orderId) => {
        // call backend function to fulfill order

        // if response is success
        setPaidFor(true);
        // Refresh user's account or subscription status

        // if the response is error
        // alert the user ("Your Payment was processed succesfully. However we are unable to fulfill your purchase. Please contact us at FitHubSEBA@gmail.com")
    };

    if (paidFor) {
        // Display success message and give the option to redirect to my plans
        console.log(props);
        //navigate(`/myplans/2000`);
    }

    if (error) {
        // display error message
        alert(error);
    }

    return (

            <PayPalButtons
                style={{
                    layout: "vertical",
                }}
                onClick={(data, actions) => {
                    // validate on button click, client or server side
                    const hasAlreadyBoughtPlan = false;

                    if (hasAlreadyBoughtPlan) {
                        setError("You already bought this plan. Go to MyPlans to download it.");
                        return actions.reject();
                    } else {
                        return actions.resolve();
                    }
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: product.description,
                                amount: {
                                    value: product.price,
                                },
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log("order", order);

                    handleApprove(data.orderID);
                }}
                onCancel={() => {
                    // display cancel message
                }}
                onError={(err) => {
                    setError(err);
                    console.error("PayPal Checkout onError", err);
                }}
            />

    );
};
