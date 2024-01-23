const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const { createdBy } = req.body;
  const jobs = await Job.find({ createdBy }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req;

  const job = await Job.findOne({ createdBy: userId, _id: id });

  if (!job) {
    throw new NotFound("This job does not exist");
  }

  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id },
    body: { company, position, status },
  } = req;

  if (company === "" || position === "" || status === "") {
    throw new BadRequestError(
      "Company and position fields cannot be left empty"
    );
  }

  const job = await Job.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { company, position, status },
    { runValidators: true, new: true }
  );

  if (!job) {
    throw new NotFoundError("Job does not exist");
  }

  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  const {
    params: { id },
    user: { userId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: id, createdBy: userId });

  if (!job) {
    throw new NotFoundError("This job does not exist");
  }

  console.log(id, userId);

  return res.status(StatusCodes.OK).json({ msg: "Successfully deleted" });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
