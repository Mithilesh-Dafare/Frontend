# Quick Setup Guide

## Step-by-Step Setup Instructions

### 1. Install Node.js Dependencies
```bash
npm install
```

### 2. Set Up MySQL Database

**Option A: Using Command Line**
```bash
mysql -u root -p < database/schema.sql
```

**Option B: Using MySQL Workbench or phpMyAdmin**
- Open the `database/schema.sql` file
- Copy and paste the SQL commands
- Execute them in your MySQL client

### 3. Create Environment File

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=sayone_ventures
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

**Important:** Replace the placeholder values with your actual credentials.

### 4. Get Razorpay API Keys

1. Go to [https://razorpay.com/](https://razorpay.com/)
2. Sign up or log in to your account
3. Navigate to Settings → API Keys
4. Generate or copy your Key ID and Key Secret
5. Update both `.env` file and `public/order.js` (line 196)

**For Testing:**
- Use Razorpay's test mode
- Test card number: `4111 1111 1111 1111`
- Any future expiry date and CVV

### 5. Update Razorpay Key in Frontend

Open `public/order.js` and update line 196:
```javascript
key: 'your_razorpay_key_id_here', // Replace with your actual Razorpay Key ID
```

### 6. Start the Server

```bash
npm start
```

Or for development (with auto-reload):
```bash
npm run dev
```

### 7. Access the Website

Open your browser and go to:
```
http://localhost:3000
```

## Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database `sayone_ventures` exists

### Payment Not Working
- Verify Razorpay keys are correct in both `.env` and `public/order.js`
- Check Razorpay dashboard for API key status
- Ensure you're using test keys for testing

### Port Already in Use
- Change `PORT` in `.env` to a different port (e.g., 3001)
- Update the URL accordingly

## Next Steps

- Customize product prices in `public/products.js` and `public/order.js`
- Update company information in HTML files
- Add real millet product images
- Configure email service for order confirmations (optional)

