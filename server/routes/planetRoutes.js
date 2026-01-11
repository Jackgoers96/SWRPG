const PlanetModel = require("../models/Planet");

const router = require("express").Router();

router.get("/", async(req, res) => {
    try {
        const planets = await PlanetModel.find();
        res.json(planets);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;