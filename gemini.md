# 🧬 Data Schema & Project Constitution

## 1. Waitlist Payload (Input)
```json
{
  "email": "string (valid email format)"
}
```

## 2. Waitlist Response (Output)
```json
{
  "status": "success | error",
  "message": "string"
}
```

## 3. Stripe Checkout Session (Input)
```json
{
  "product_id": "string",
  "success_url": "string",
  "cancel_url": "string"
}
```

## 4. Stripe Checkout Session (Output)
```json
{
  "url": "string (Stripe checkout URL)"
}
```

## Behavioral Rules
- Use FastAPI for backend tools to remain in Python layer.
- Strict isolation of business logic in `tools/`.
- Maintain clean, minimal HTML frontend.
