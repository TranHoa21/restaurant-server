import user from './user.js';
import menu from './menu.js';

const initRouter = (app) => {
    app.use('/api/v1/user', user);
    app.use('/api/v1/menu', menu);

}

module.exports = initRouter