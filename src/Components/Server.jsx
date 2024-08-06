// // server.js
// const express = require('express');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 8080;

// // Middleware
// app.use(cors({ origin: 'http://127.0.0.1:5173' }));
// app.use(bodyParser.json());

// // Secret key for JWT
// const SECRET_KEY = 'your-secret-key';

// // Mock user data
// const users = [
//   { email: 'test@example.com', password: 'password' }
// ];

// // Route to handle login and issue JWT
// app.post('/api/v1/token/generate-token', (req, res) => {
//   const { email, password } = req.body;

//   // Find user
//   const user = users.find(user => user.email === email);

//   // Check if user exists and password is correct
//   if (user && user.password === password) {
//     // Generate JWT token
//     const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// // Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
