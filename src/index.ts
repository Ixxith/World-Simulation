import bodyParser from 'body-parser';
import express, {Request,Response,Application} from 'express';
import { addCitizenToTown, generate } from "./worldgen/Generator";
const app:Application = express();
var path = require('path');


// The code below allows the node js to find the public directory with the index.html file
const publicPath = path.join(__dirname, '../public');
// Node js is using port 3000/ and when you push to cloud it will use process.env.PORT
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* GET index page */
app.get("/", (req:Request, res:Response):void => {
  let out = generate()
  res.render('index', {output : out, seed: 'seed'});
});

app.post("/", (req:Request, res:Response):void => {
  let seed = req.body.seed || 'seed'
  let out = generate(seed)
  res.render('index', {output : out, seed: seed});
});

app.post("/addcitizen", (req:Request, res:Response):void => {
  let townidstr : string = req.body.townid
  if (townidstr != undefined || townidstr == '') {
    let townid : number =  parseInt(townidstr.substring(12))
    let seed = req.body.seed || 'seed'
    let out = addCitizenToTown(townid)
    res.render('index', {output : out, seed: seed});
  }
});


app.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}/`);
});