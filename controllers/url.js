const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Url is required" })
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visithistory: [],
    })
    return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalclicks: result.visithistory.length,
        analysis: result.visithistory,
    });
}
module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
