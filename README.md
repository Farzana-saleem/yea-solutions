# TODO App Challenge

TODO application backend built with Node.js, Express, TypeScript, Sequelize and MySQL.

## APIs

- User registration & login with JWT authentication
- CRUD operations for tasks
- Mark tasks as done

## Setup

```bash
npm install
npm run dev
```

## API Endpoints

### Auth

- POST `/api/register`
- POST `/api/login`

### Tasks (require JWT auth)

- POST `/api/tasks`
- GET `/api/tasks`
- GET `/api/tasks/:id`
- PUT `/api/tasks/:id`
- PATCH `/api/tasks/:id/done`
- DELETE `/api/tasks/:id`

### Approch

Simple DB structure with user, task tables

- USER : id, username, password
- TASK : id, title, desc, deadline, done

Have created simple MVC code structure with standard basic code.

Front-end : not done fully, most simple form created. more experienced in BE.

### API documentation

Postman Link : https://web.postman.co/workspace/My-Workspace~69fc31f9-d466-4212-8262-1f63a4e20711/collection/41342593-7e5c4b6a-fba6-4484-9d19-3c0000151356?action=share&source=copy-link&creator=41342593

### Enhancements possible

1. Add input validations using Joi for all endpoints
2. Bring Joi validation layer to middleware
3. Error handling : have seperate list of errors, instead of harcoding withing code
4. Implement refresh token API
5. Add proper comments and logging
6. Add role based authorization if needed to give admin / user access
7. Implement Swagger to document all APIs (Currently used postman to test and document APIs)

### Sample .env

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=pass
DB_NAME=yea-solutions-db
DB_PORT=3306
DB_DIALECT=mysql
JWT_SECRET=JWT_SECRET
JWT_EXPIRE=24h
