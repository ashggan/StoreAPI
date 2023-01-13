# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

##### Products RESTful route

- A retirve route: 'products' [GET]
- A show route: 'products/:id' [GET]
- A show route: 'products/most-popular' [GET]
- A show route: 'category/:id/products' [GET]

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

##### Users RESTful route

- A retrieve route: 'users' [GET]
- A retrieve route: 'users/:id' [GET]
- A create route: 'users' [POst]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

##### Orders RESTful route

- A retrieve route: 'users/:id/orders/:id' [GET]
- A retrieve route: 'users/:id/orders' [GET]

## Data Shapes

#### Product

- table name [products]
  - columns :
    - [id] SERIAL
    - [name] VARCHAR
    - [price] DECIMAL
    - [category_id] INTEGER

#### User

- table name [users]
  - columns :
    - [id] SERIAL
    - [firstName] VARCHAR
    - [lastName] VARCHAR
    - [lastName] VARCHAR

#### Orders

- table name [catgory]
- columns :
  - [id] SERIAL
  - [status] VARCHAR
  - [user_id] INTEGER

#### Category

- table name [catgory]
- columns :
  - [id] :integer PRIMARY KEY,
  - [name] :VARCHAR(120)

#### Product Order

- table name [product_order]
- columns :
  - [id] SERIAL
  - [quantity] INTEGER
  - [product_id] INTEGER
  - [order_id] INTEGER
