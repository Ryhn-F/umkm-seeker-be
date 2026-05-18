# UMKM Seeker API Documentation

## Base URL

`http://localhost:3000` (Development Server)

---

## Authentication APIs

### 1. Register User
Registers a new user account.

**Endpoint:** `POST /register`

**Request Body (JSON):**
```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Responses:**
- `201 Created`: Registration successful. Returns user data and JWT token.
- `400 Bad Request`: Missing required fields or email already registered.

### 2. Login User
Authenticates a user and returns a JWT token.

**Endpoint:** `POST /login`

**Request Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Responses:**
- `200 OK`: Login successful. Returns user data and JWT token.
- `401 Unauthorized`: Invalid email or password.

### 3. Logout User
Logs out a user (stateless, token is discarded client-side).

**Endpoint:** `POST /logout`

**Responses:**
- `200 OK`: Logout successful.

---

## Products APIs

### 1. Get All Products
Retrieves a list of all products.

**Endpoint:** `GET /product`

**Responses:**
- `200 OK`: Returns an array of products containing `id`, `name`, `image_url`, `category`, and `price`.

### 2. Get Product By ID
Retrieves details of a specific product.

**Endpoint:** `GET /product/:id`

**Responses:**
- `200 OK`: Returns product details.
- `404 Not Found`: Product not found.

### 3. Create Product
Creates a new product. Requires a valid JWT token.

**Endpoint:** `POST /product/create-product`
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body (FormData):**
- `name` (string, required)
- `stock` (integer, required)
- `price` (number, required)
- `description` (string, required)
- `category` (string, required)
- `image` (file, required) - Image file for the product

**Responses:**
- `201 Created`: Product created successfully.
- `400 Bad Request`: Missing required fields.
- `403 Forbidden`: Token required.

### 4. Update Product
Updates an existing product. Requires a valid JWT token.

**Endpoint:** `PUT /product/:id`
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Request Body (JSON):**
```json
{
  "name": "Kopi Susu Updated",
  "stock": 50,
  "price": 18000,
  "description": "Updated description",
  "category": "Beverage"
}
```

**Responses:**
- `200 OK`: Product updated successfully.
- `403 Forbidden`: Token required.
- `404 Not Found`: Product not found.

### 5. Delete Product
Deletes a product. Requires a valid JWT token.

**Endpoint:** `DELETE /product/:id`
**Headers:**
- `Authorization: Bearer <token>`

**Responses:**
- `200 OK`: Product deleted successfully.
- `403 Forbidden`: Token required.
- `404 Not Found`: Product not found.

---

## Orders APIs

### 1. Create Order
Creates a new order and handles product stock deduction. Can optionally handle table reservations.

**Endpoint:** `POST /order`
**Content-Type:** `application/json`

**Request Body (JSON):**
```json
{
  "person_name": "John Doe",
  "no_telp": "08123456789",
  "id_product": [1, 2],
  "quantity": [4, 2],
  "seat_id": 1, // Optional. Required for reservation
  "guest_count": 2, // Optional. Number of guests
  "reservation_date": "2026-05-20", // Optional. Required for reservation
  "reservation_time": "19:00:00", // Optional. Required for reservation
  "reservation_end_time": "21:00:00" // Optional. Required for reservation
}
```

**Notes:**
- `id_product` and `quantity` must be arrays of the same length and contain at least one item.
- If making a reservation, all reservation fields (`seat_id`, `reservation_date`, `reservation_time`, `reservation_end_time`) must be provided.
- Throws errors if stock is insufficient or reservation time overlaps with existing reservations.

**Responses:**
- `201 Created`: Order created successfully.
- `400 Bad Request`: Missing required fields or array lengths mismatch.
- `500 Internal Server Error`: Stock insufficient or reservation overlap.

### 2. Get All Orders
Retrieves all orders along with associated items, products, and seat details.

**Endpoint:** `GET /order`

**Responses:**
- `200 OK`: Returns an array of orders, sorted from newest to oldest. Includes populated `order_items`, `products`, and `seats` data.

### 3. Update Order
Updates an existing order's details.

**Endpoint:** `PUT /order/:id`

**Request Body:**
```json
{
  "person_name": "Jane Doe",
  "status": "completed"
}
```

**Responses:**
- `200 OK`: Order updated successfully.
- `404 Not Found`: Order not found.
- `500 Internal Server Error`: Server error.

### 4. Delete Order
Deletes an existing order and its associated order items.

**Endpoint:** `DELETE /order/:id`

**Responses:**
- `200 OK`: Order deleted successfully.
- `404 Not Found`: Order not found.
- `500 Internal Server Error`: Server error.

---

## Seats APIs

### 1. Get All Seats

Retrieves all available seats and tables.

**Endpoint:** `GET /seat`

**Responses:**

- `200 OK`: Returns an array of seats containing `id`, `seat_number`, `capacity`, and `status`.

### 2. Create Seat

Creates a new seat.

**Endpoint:** `POST /seat`

**Request Body:**

```json
{
  "seat_number": "A1", // Required
  "capacity": 4, // Required
  "status": "available" // Optional, default is 'available'
}
```

**Responses:**

- `201 Created`: Seat created successfully.
- `400 Bad Request`: Missing required fields.
- `500 Internal Server Error`: Seat number already exists or other error.

### 3. Update Seat

Updates an existing seat's details.

**Endpoint:** `PUT /seat/:id`

**Request Body:**

```json
{
  "seat_number": "A1",
  "capacity": 6,
  "status": "reserved"
}
```

**Responses:**

- `200 OK`: Seat updated successfully.
- `404 Not Found`: Seat not found.
- `500 Internal Server Error`: Server error.

### 4. Delete Seat

Deletes an existing seat.

**Endpoint:** `DELETE /seat/:id`

**Responses:**

- `200 OK`: Seat deleted successfully.
- `404 Not Found`: Seat not found.
- `500 Internal Server Error`: Server error.

---

## Testimonial APIs

### 1. Get All Testimonials

Retrieves all testimonials.

**Endpoint:** `GET /testimonial`

**Responses:**

- `200 OK`: Returns an array of testimonials containing `id`, `name`, and `message`.
- `500 Internal Server Error`: Server error.

### 2. Create Testimonial

Creates a new testimonial.

**Endpoint:** `POST /testimonial`

**Request Body:**

```json
{
  "name": "John Doe", // Required
  "message": "Great coffee and nice place!" // Required
}
```

**Responses:**

- `201 Created`: Testimonial created successfully.
- `400 Bad Request`: Missing required fields (`name`, `message`).
- `500 Internal Server Error`: Server error.
