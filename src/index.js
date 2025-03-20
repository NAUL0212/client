// p1 : import
const express = require('express');
const app = express();
const cors = require('cors');                               // cors
// const jsonServer = require('json-server');                  // json-server
const port = process.env.PORT || 3000;                      // port
const { engine } = require('express-handlebars');           // handlebars
const path = require('path');                               // path
const route = require('./routes');                          // routes


// p2: connect database
const db = require('./config/db');                          // database
db.connect();


// p3: cấu hình Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// p4: Cấu hình CORS
// cho phép frontend truy cập từ localhost:8080
app.use(cors({
    origin: 'http://localhost:8080', // Địa chỉ của frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}));


// P5: cấu hìnhTemplate engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));


// p6: Routes init
route(app);


// P7: Khởi động server
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
