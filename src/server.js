const Koa = require('koa');
const serve = require('koa-static');
const logger = require('koa-logger');
const session = require('koa-session');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const mainRoutes = require('./routes/routes');

const PORT = process.env.PORT || 8000;

app.use(logger());

app.keys = ['super-secret-key'];
app.use(session(app));

app.use(bodyParser());

require('./services/auth');
app.use(passport.initialize());
app.use(passport.session());

// add response time to all items
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(mainRoutes.routes());

app.use(serve('./public'));
app.use(serve('./assets/images'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
