<img width="290" alt="image" src="https://github.com/RajneeshOjha0/Real-time-Biding/assets/151709914/10dc32e9-6fc7-429f-a73e-b3c86706e673">

# Real-Time Bidding Platform

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd real-time-bidding-platform
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and configure environment variables:
    ```plaintext
    DB_USERNAME=root
    DB_PASSWORD=password
    DB_NAME=bidding_platform
    DB_HOST=localhost
    JWT_SECRET=your_jwt_secret
    ```

4. Run the project:
    ```bash
    npm start
    ```

## API Endpoints

### Users
- `POST /users/register` - Register a new user.
- `POST /users/login` - Authenticate a user and return a token.
- `GET /users/profile` - Get the profile of the logged-in user.

### Items
- `GET /items` - Retrieve all auction items (with pagination).
- `GET /items/:id` - Retrieve a single auction item by ID.
- `POST /items` - Create a new auction item. (Authenticated users, image upload)
- `PUT /items/:id` - Update an auction item by ID. (Authenticated users, only item owners or admins)
- `DELETE /items/:id` - Delete an auction item by ID. (Authenticated users, only item owners or admins)

### Bids
- `GET /items/:itemId/bids` - Retrieve all bids for a specific item.
- `POST /items/:itemId/bids` - Place a new bid on a specific item. (Authenticated users)

### Notifications
- `GET /notifications` - Retrieve notifications for the logged-in user.
- `POST /notifications/mark-read` - Mark notifications as read.

## Real-Time WebSocket Events

### Bidding
- `connection` - Establish a new WebSocket connection.
- `bid` - Place a new bid on an item.
- `update` - Notify all connected clients about a new bid on an item.

### Notifications
- `notify` - Send notifications to users in real-time.

## Testing

To run tests:
```bash
npm test
