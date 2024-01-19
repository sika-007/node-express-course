const getAllJobs = async (req, res) => {
  res.send({ user: req.user });
};

const getJob = async (req, res) => {
  res.send({ user: req.user });
};

const createJob = async (req, res) => {
  res.send("Create job");
};

const updateJob = async (req, res) => {
  res.send("Update jobs");
};

const deleteJob = async (req, res) => {
  res.send("Delete job");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
