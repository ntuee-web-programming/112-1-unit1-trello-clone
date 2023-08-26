# 112-1-unit1-trello-clone

## API documentation

### card

#### GET `/api/cards`

- request body

no body

- response

```json
[
  {
    "id": "a4d603bc-5fcf-4f0d-9765-5430ac8e2602",
    "title": "Card 1",
    "description": "This is card 1",
    "list_id": "d31df21d-e9ad-4b18-998a-564614599aa2"
  },
  {
    "id": "a4d603bc-5fcf-4f0d-9765-5430ac8e2602",
    "title": "Card 2",
    "description": "This is card 2",
    "list_id": "d31df21d-e9ad-4b18-998a-564614599aa2"
  }
]
```

#### GET `/api/cards/:id`

- request body

no body

- response

```json
{
  "id": "a4d603bc-5fcf-4f0d-9765-5430ac8e2602",
  "title": "Card 1",
  "description": "This is card 1",
  "list_id": "d31df21d-e9ad-4b18-998a-564614599aa2"
}
```

#### POST `/api/cards`

- requst body

```json
{
  "title": "Card 1",
  "description": "This is card 1",
  "list_id": "d31df21d-e9ad-4b18-998a-564614599aa2"
}
```

- response

```json
{
  "id": "a4d603bc-5fcf-4f0d-9765-5430ac8e2602"
}
```

#### PUT `/api/cards/:id`

- requst body

```json
{
  "title": "Card 1",
  "description": "This is card 1",
  "list_id": "d31df21d-e9ad-4b18-998a-564614599aa2"
}
```

- response

```text
OK
```

#### DELETE `/api/cards/:id`

- request body

no body

- response

```text
OK
```

### list

#### GET `/api/lists`

- request body

no body

- response

```json
[
  {
    "id": "d31df21d-e9ad-4b18-998a-564614599aa2",
    "name": "List 1"
  }
]
```

#### GET `/api/lists/:id`

- request body

no body

- response

```json
{
  "id": "d31df21d-e9ad-4b18-998a-564614599aa2",
  "name": "List 1",
  "cards": [
    {
      "id": "a4d603bc-5fcf-4f0d-9765-5430ac8e2602",
      "title": "Card 1",
      "description": "This is card 1",
      "list_id": "d31df21d-e9ad-4b18-998a-564614599aa2"
    }
  ]
}
```

#### POST `/api/lists`

- requst body

```json
{
  "name": "List 1"
}
```

- response

```json
{
  "id": "d31df21d-e9ad-4b18-998a-564614599aa2"
}
```

#### PUT `/api/lists/:id`

- requst body

```json
{
  "name": "List 1"
}
```

- response

```text
OK
```

#### DELETE `/api/lists/:id`

- request body

no body

- response

```text
OK
```
