const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./src/index.html');
})

// Require authentication for now
app.use(function(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.redirect('/')
  }
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)

router.get('/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
})

app.use(route.get('/auth/facebook',
  passport.authenticate('facebook')
))

app.use(route.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
))

app.use(route.get('/auth/twitter',
  passport.authenticate('twitter')
))

app.use(route.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
))

app.use(route.get('/auth/google',
  passport.authenticate('google')
))

app.use(route.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
))

router.get('/app', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/views/app.html');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
})

module.exports = router;
