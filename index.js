const express = require('express');
const app = express();
const URL = require('./models/url');
const { connectToMongoDB } = require('./connect');
const urlRout = require('./routes/url');
const shortid = require('shortid');
const port = 3030;

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log("mongoDB connected"));

app.use(express.json());
app.use("/url", urlRout);

app.get("/:shortId", async (req, res) => {
    const shortId  = req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId,
    },
        {
            $push: {
                visithistory: {
                    timestamp: Date.now(),
                },
            }
        }
    );
    console.log(entry);
    res.redirect(entry.redirectURL);
});

app.delete("/:shortId",async(req, res) => { 
    await URL.findOneAndDelete({
        shortid,
    })
    return res.json('success');
});

app.listen(port, () => console.log(`Server is run on port:${port}`));
