import express from "express";
function main() {
  const app = express();
  app.listen(9090, 'localhost', function() {
    console.log('server listen on 9090');
  });
}

main();