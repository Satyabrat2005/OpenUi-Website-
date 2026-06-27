import stripe
import os
from pydantic import BaseModel
from fastapi import HTTPException

stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_12345")

class CheckoutRequest(BaseModel):
    product_name: str = "OpenUI Download"

class CheckoutResponse(BaseModel):
    url: str

def create_checkout_session(req: CheckoutRequest) -> CheckoutResponse:
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': req.product_name,
                    },
                    'unit_amount': 1900,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=os.getenv("FRONTEND_URL", "http://localhost:8000") + "?success=true",
            cancel_url=os.getenv("FRONTEND_URL", "http://localhost:8000") + "?canceled=true",
        )
        return CheckoutResponse(url=session.url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
