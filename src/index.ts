import express from "express";
import router from './router';

const app = express();

app.use(router);

app.listen(9090, function() {
  console.log('server listen on 9090');
});

export default app;