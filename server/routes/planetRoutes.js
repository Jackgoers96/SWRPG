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

router.post("/", async (req, res) => {
  try {
    const created = await PlanetModel.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    console.error("create error:", err);
    return res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const planetId = req.params.id;

    const deleted = await PlanetModel.findByIdAndDelete(planetId);

    if (!deleted) {
      return res.status(404).json({ error: "Planet not found" });
    }

    // Option A: return the deleted document
    return res.status(200).json(deleted);

    // Option B (common): return no content
    // return res.sendStatus(204);
  } catch (err) {
    console.error("delete error:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;