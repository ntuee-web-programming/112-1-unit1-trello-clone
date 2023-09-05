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

# Frontend Setup

### 1. Add `.env` file
```bash
touch .env
```
Fill in the following variables in `.env` file
```bash
VITE_API_URL="http://localhost:8000/api"
```
Please note that the value of `VITE_API_URL` should be the same as the url of the backend server. Also, since `.env` file contains sensitive information, make sure to add `.env` to `.gitignore` file so that it won't be pushed to GitHub.


# Backend Setup

## 1. Create a `backend` folder

```bash
mkdir backend
```

## 2. Create a `package.json` file

```bash
cd backend
yarn init -y
```

## 3. Install dependencies

```bash
yarn add express cors mongoose dotenv body-parser
```

## 4. Typescript setup

```bash
yarn add -D ts-node typescript @types/cors @types/node @types/express
```

`-D` flag means that the package is a dev dependency. It is only used during development and not in production.

Then we create a `tsconfig.json` file

```bash
yarn tsc --init
```

We want to use the types defined in the `lib` folder. Therefore, we have to add the following line to `tsconfig.json`

```json
{
  "compilerOptions": {
    ...
    "@lib/*": ["../lib/*"],
    ...
  }
}
```

## 5. Create an entry point

```bash
mkdir src
touch src/index.ts
```

## 6. Add scripts to `package.json`

```json
"scripts": {
  "dev": "nodemon src/index.ts",
  "start": "ts-node src/index.ts",
  "lint": "eslint src",
  "format": "prettier --write src"
}
```
