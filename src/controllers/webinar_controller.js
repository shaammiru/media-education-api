const WebinarData = require("../data/webinar_data");

const create = async (req, res) => {
  try {
    const validData = req.body.validData;
    const webinar = await WebinarData.create(validData);

    return res.status(201).json({ message: "Webinar created", data: webinar });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const list = async (req, res) => {
  try {
    const webinars = await WebinarData.list();

    return res.status(200).json({ message: "List of webinars", data: webinars });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const webinarId = req.params.id;
    const webinar = await WebinarData.getById(webinarId);

    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    return res.status(200).json({ message: "Webinar by id", data: webinar });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateById = async (req, res) => {
  try {
    const webinarId = req.params.id;
    const validData = req.body.validData;
    const webinar = await WebinarData.updateById(webinarId, validData);

    return res.status(200).json({ message: "Webinar updated", data: webinar });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const webinarId = req.params.id;
    const webinar = await WebinarData.deleteById(webinarId);

    return res.status(200).json({ message: "Webinar deleted", data: webinar });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create,
  list,
  getById,
  updateById,
  deleteById,
};
