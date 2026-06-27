# Stripe Architecture SOP

## Goal
Provide a checkout URL for downloading the OpenUI app.

## Input
JSON object from frontend (optional, defaults handled by backend if not provided).

## Logic
1. Receive request to `/api/checkout`.
2. Use Stripe SDK with `STRIPE_SECRET_KEY`.
3. Create a Stripe Checkout Session for a one-time payment or free download.
4. Return the Checkout Session URL.

## Edge Cases
- Missing API Key -> Return 500.
- Stripe API Error -> Return 500 with message.
