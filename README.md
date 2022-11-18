# ng_api


📝 Features Created
=====================
* Login (JWT Authentication)
* Users CRUD
* Account CRUD
* Transactions CRUD


🚀 Techs
=================

<table>
<tr>
<td>mysql2</td>
<td>node</td>
<td>express</td>
<td>typeorm</td>
<td>typeorm-extension</td>
<td>bcrypt</td>
<td>jsonwebtoken</td>
<td>class-validator</td>
<td>reflect-metadata</td>
</tr>
</table>

## Local Project

To run this project locally, you'll need Git, Node and PostegreSQL installed on your computer.

After cloning project, remember to insert your local database credentials into /.env.

```bash
# Clone this repository
$ git clone https://github.com/DanielAntunes-dev/ng_api

# Go into the repository
$ cd ng_api

# Install dependencies
$ npm install

# Create database
$ npm db:create

# Run migrations
$ npm migration:run


# Run server
$ npm run dev

# running on port 3000
```

📇 API documentation
=================

#### Create User

```http
  POST http://localhost:3000/create
```

Json example:

```
{
    "username":"UserTest",
    "password": "123456"
}
```

#### Login

```http
  POST http://localhost:3000/
```

Json example:

```
{
  "username": "UserTest",
  "password": "123456"
}
```
