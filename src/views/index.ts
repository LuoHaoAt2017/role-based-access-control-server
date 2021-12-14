import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';

const render = createRenderer();

const app = new Vue({
  template: `<div>Hello World</div>`
});

render.renderToString(app, function(err, html) {
  if (err) {
    throw err;
  }
  console.log(html);
});