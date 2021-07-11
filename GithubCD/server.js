import bodyParser  from 'body-parser';
import express from 'express';

const router = express.Router();
const app = express();

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

router.post('/webhook',(request,response) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    console.log(request.body);
});
    
// add router in the Express app.
app.use("/", router);