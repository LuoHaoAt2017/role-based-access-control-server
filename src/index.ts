import express from "express";
import bodyParser from "body-parser";
import router from './router';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(9090, function() {
  console.log('server listen on 9090');
});

export default app;