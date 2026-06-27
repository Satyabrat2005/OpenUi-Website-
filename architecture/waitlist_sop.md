# Waitlist Architecture SOP

## Goal
Deterministically store email addresses submitted from the waitlist form.

## Input
JSON object matching the Data Schema in `gemini.md`:
`{"email": "string"}`

## Logic
1. Validate email format.
2. Open SQLite database (`.tmp/waitlist.db`).
3. Create `waitlist` table if it doesn't exist.
4. Insert email. Ignore if already exists (UNIQUE constraint).
5. Return success JSON object.

## Edge Cases
- Invalid email format -> Return 400.
- Database locked -> Retry / Return 500.
