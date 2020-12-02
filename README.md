# smoothie
Online Smoothie Recipebook

## Running
`npm install`
`npm run start`

## Endpoints
- `GET /api/smoothies` gets a list of smoothies
- `GET /api/smoothies/:id` gets a specific smoothie by ID
- `POST /api/smoothies` creates a new smoothie
- `POST /api/smoothies/:id` edits an existing smoothie

## Sample body for POST (`Content-Type: application/json`)
```json
{"name": "Delicious smoothie", "ingredients": {"Whey Isolate": "One scoop", "Milk": "Two Cups"}}
```