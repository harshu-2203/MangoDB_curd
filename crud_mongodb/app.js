const express = require("express");
const app = express();
app.use(express.json({ extended: false }));

const mongoose = require("mongoose");
var serverPort = 8080;

var port = process.env.PORT || serverPort;
const MONGOURL = "mongodb+srv://dbUser:dbUser@cluster0.pzuxd.mongodb.net/PRODUCTAPI?retryWrites=true&w=majority";
mongoose
    .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("mongoDB connected.."));
app.listen(port, () => { console.log("Server started..."); });

// ======================= GET ================================

const donorModel = require('./models/donor');

app.get('/', async (req, res) => {
    const donors = await donorModel.find();
    if (donors.length < 1) {
        return res.json("No donors");
    }
    return res.json(donors);
});

// ======================= POST =================================
app.post('/add', async (req, res) => {
    console.log(req.body);
    
    const newdonor = await req.body;
    donorModel.create(newdonor);
    return res.json( newdonor);
});

app.put('/update', async(req, res) => {
    
    console.log(req.body);
    var did = req.body.did;
    var name_ = req.body.name;
    var phone_ = req.body.phone;
    var blood_ = req.body.blood;

    // const did = await donorModel.findOne({_id:did});

    
    var updateresult = await donorModel.findOneAndUpdate({_id:did},{$set:{ name:name_,
                                                                        phone:phone_,
                                                                        blood:blood_}},
                                                                        {new: true})
        console.log(updateresult);
        if (!updateresult) {
            return res.json({ "data": "No donors" });
        }
        return res.json(updateresult);
});

// ======================================Delete ===========================

app.delete("/delete",async(req,res)=>{
    const did = req.body.did;
    const result = await donorModel.findOneAndDelete({_id:did});
    console.log(did,result);
    return res.json("Deleted Succesfully");
});
