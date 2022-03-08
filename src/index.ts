import express, {Request,Response,Application} from 'express';
const app:Application = express();
var path = require('path');


// The code below allows the node js to find the public directory with the index.html file
const publicPath = path.join(__dirname, '../public');
// Node js is using port 3000/ and when you push to cloud it will use process.env.PORT
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

/* GET index page */
app.get("/", (req:Request, res:Response):void => {
   res.render('index');
});

app.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}/`);
});