// p1: import
const productRouter = require('./product')
const orderRouter = require('./order')
const homeRouter = require('./home')
const apiRouter = require('./api')

// p2: func
function route(app) {


    app.use('/products', productRouter);
    app.use('/checkout', orderRouter);
    app.use('/api', apiRouter);
    app.use('/', homeRouter);
}

// p3: export
module.exports = route;