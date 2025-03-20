// p1: import
const productRouter = require('./product')
const orderRouter = require('./order')
const homeRouter = require('./home')
const apiRouter = require('./api')
const authRouter = require('./auth')
const registerRouter = require('./register')
const loginRouter = require('./login')

// p2: func
function route(app) {


    app.use('/products', productRouter);
    app.use('/checkout', orderRouter);
    app.use('/api', apiRouter);
    app.use("/auth", authRouter);
    app.use('/dashboard', homeRouter);
    app.use('/register', registerRouter);
    app.use('/login', loginRouter);
}

// p3: export
module.exports = route;