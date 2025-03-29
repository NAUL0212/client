// p1 : import
const express = require('express');
const app = express();
const cors = require('cors');                               // cors
// const jsonServer = require('json-server');                  // json-server
const port = process.env.PORT || 3000;                      // port
const { engine } = require('express-handlebars');           // handlebars
const path = require('path');                               // path
const exphbs = require('express-handlebars');               // exphbs
const cookieParser = require("cookie-parser");
const errorHandler = require('./middlewares/errorHandler');
const productRouter = require('./routes/productRouter');
const apiRouter = require('./routes/apiRouter')
const authRouter = require('./routes/authRouter')
const customerRouter = require('./routes/customerRouter')
const homeRouter = require('./routes/homeRouter')
const userRouter = require('./routes/userRouter')
const orderRouter = require('./routes/orderRouter')
const dotenv = require('dotenv').config();


// p2: connect database
const dbConnect = require('./config/dbConnect');
dbConnect();


// p3: cấu hình Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());        // // Middleware để đọc cookie


// p4.1: Cấu hình Handlebars
const hbs = exphbs.create({
    helpers: {
        multiply: (a, b) => a * b,  // Định nghĩa helper "multiply"
    }
});

// p4.2: cấu hình Template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));


// p5: Cấu hình CORS
// chỉ cho phép frontend truy cập từ localhost:8080
app.use(cors({
    origin: 'http://localhost:8080', // Địa chỉ của frontend
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Authorization',
}));


// p6: Routes
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/customer', customerRouter)
app.use('/dashboard', homeRouter);
app.use('/user', userRouter);   
app.use('/orders', orderRouter);
app.use('/products', productRouter);


// p7: Error handle middleware
app.use(errorHandler);


// P8: Khởi động server
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));



