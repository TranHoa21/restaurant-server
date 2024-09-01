import user from './user.js';
import menu from './menu.js';
import order from './order.js';
import order_item from './order_item.js';
import cart from './cart.js';
import cart_item from './cart_item.js';
const initRouter = (app) => {
    app.use('/api/v1/user', user);
    app.use('/api/v1/menu', menu);
    app.use('/api/v1/order', order);
    app.use('/api/v1/order_item', order_item);
    app.use('/api/v1/cart', cart);
    app.use('/api/v1/cart_item', cart_item);
}

module.exports = initRouter