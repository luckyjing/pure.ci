import dva from 'dva';
import models from './models';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
models.forEach((m) => {
  app.model(m);
});

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#stage');
import '../css/index.less';