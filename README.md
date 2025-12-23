# SayOne Ventures - Millet Import & Export Website

A fully responsive business website for SayOne Ventures, a millet import and export company. Built with HTML5, CSS3, JavaScript (frontend) and Node.js + Express.js (backend) with MySQL database.

## Features

- **Home Page**: Professional hero banner with company highlights
- **About Page**: Mission, Vision, Certifications, Values, and health benefits
- **Products Page**: Display of 8 different millet varieties with details
- **Order Page**: Complete order form with product selection, quantity calculation, and payment integration
- **Contact Page**: Contact form with database storage
- **Payment Integration**: Razorpay payment gateway
- **Responsive Design**: Fully responsive with mobile-first approach
- **Modern UI**: Green & white theme with smooth animations

## Tech Stack

### Frontend
- HTML5
- CSS3 (Flexbox & Grid)
- Vanilla JavaScript (No frameworks)

### Backend
- Node.js
- Express.js
- MySQL (mysql2)
- Razorpay Payment Gateway

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- Razorpay Account (for payment integration)

## Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL database**
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   Or manually run the SQL file in your MySQL client.

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=sayone_ventures
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ADMIN_USER=admin_username
   ADMIN_PASSWORD=strong_admin_password
   ADMIN_NOTIFICATION_EMAIL=your-email-to-receive-notifications
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```

5. **Get Razorpay Keys**
   - Sign up at [Razorpay](https://razorpay.com/)
   - Get your Key ID and Key Secret from the dashboard
   - Update `.env` file with your keys
   - Also update the Razorpay key in `public/order.js` (line 196):
     ```javascript
     key: 'your_razorpay_key_id', // Replace with your actual key
     ```

6. **Start the server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

7. **Access the website**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
sayone-ventures/
├── config/
│   └── database.js          # MySQL connection configuration
├── database/
│   └── schema.sql           # Database schema
├── public/
│   ├── index.html           # Home page
│   ├── about.html           # About page
│   ├── products.html        # Products page
│   ├── order.html           # Order page
│   ├── contact.html         # Contact page
│   ├── styles.css           # Main stylesheet
│   ├── script.js            # Common JavaScript
│   ├── products.js          # Products page logic
│   ├── order.js             # Order page logic
│   └── contact.js           # Contact form logic
├── server.js                # Express server
├── package.json             # Dependencies
└── README.md                # This file
```

## Database Schema

The database includes four main tables:

1. **customers**: Stores customer information
2. **orders**: Stores order details with payment status
3. **order_items**: Stores individual items in each order
4. **contacts**: Stores contact form submissions

## API Endpoints

- `POST /api/create-order`: Creates a Razorpay order
- `POST /api/verify-payment`: Verifies payment and saves order to database
- `POST /api/contact`: Saves contact form submission

## Payment Flow

1. Customer selects millet products and quantities
2. Customer fills in shipping details
3. System calculates total amount
4. Customer clicks "Proceed to Payment"
5. Razorpay checkout opens
6. After successful payment, order is saved to database
7. Success confirmation is displayed

## Customization

### Products
Edit the `milletProducts` array in `public/products.js` and `public/order.js` to add/modify products.

### Styling
Modify `public/styles.css` to change colors, fonts, or layout. The main color variables are defined in `:root`.

### Prices
Update product prices in the `milletProducts` arrays.

## Testing Payment

For testing, use Razorpay's test mode:
- Use test API keys from Razorpay dashboard
- Test card: 4111 1111 1111 1111
- Any future expiry date and CVV

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Notes

- Always use environment variables for sensitive data
- Enable HTTPS in production
- Implement rate limiting for API endpoints
- Add CSRF protection
- Sanitize all user inputs (already implemented with express-validator)

## License

This project is created for SayOne Ventures.

## Support

For issues or questions, please contact the development team.

