# MERN Store Management App

## Overview
My first fullstack MERN app that is designed for manageing store-related data.
Live at: 
Feedback is always welcome!

## Features
- **Store, Product, and FAQ Management**: Perform CRUD operations on stores, products, and FAQs.
- **Public Search**: Search data using keywords without authentication.
- **Protected Mutations**: User authentication required for creating, updating, or deleting data.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt, refresh Token


## API Endpoints
- **Public Endpoints**:
  - `GET /api/products` - Retrieve all products
  - `GET /api/products?q=keyword` - Search products by keyword
  - `GET /api/products?q=keyword&lp=lowerprice&hp=higherprice` - Search products by keyword and prices

  - `GET /api/shops` - Retrieve all stores
  - `GET /api/shops?q=keyword` - Search stores by keyword
  - `GET /api/shops?lat=latitude&lon=longituide` - Search nearby stores within 2km

  - `GET /api/questions` - Retrieve all FAQs
  - `GET /api/questions?q=keyword` - Search FAQs by keyword

- **Authenticated Endpoints**:
  - Create data (passing JSON data)
  - `POST /api/products/add` 
  - `POST /api/shops/add` 
  - `POST /api/questions/add` 

  - Update data (passing JSON data)
  - `PUT /api/products/edit/:id` 
  - `PUT /api/shops/edit/:id` 
  - `PUT /api/questions/edit/:id`

  - Delete data
  - `DELETE /api/products/del/:id`
  - `DELETE /api/shops/del/:id` 
  - `DELETE /api/questions/del/:id` 
