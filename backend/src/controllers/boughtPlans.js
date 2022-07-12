"use Strict";

const { countDocuments } = require("../models/boughtPlans");
const boughtPlansModel = require("../models/boughtPlans");

/**
 * Returns list of all boughtPlan in database.
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const list = async (req, res) => {
  try {
    const boughtPlans = await boughtPlansModel.find({}).exec();
    return res.status(200).json(boughtPlans);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error: " + err.message,
    });
  }
};

/**
 * Creates a new boughtPlan item in database.
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const create = async (req, res) => {
  // Check if the body of the request is not empty.
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  // Handle the given boughtPlan creation request.
  try {
    // Create boughtPlan in database with supplied request body.
    const boughtPlan = await boughtPlansModel.create(req.body);

    // Return success status with created boughtPlan as json.
    return res.status(201).json(boughtPlan);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error:" + err.message,
    });
  }
};

/**
 * Retrieves item in database.
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const get = async (req, res) => {
  try {
    const boughtPlans = await boughtPlansModel
      .find({ userId: req.params.id })
      .exec();
    return res.status(200).json(boughtPlans);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error: " + err.message,
    });
  }
};

const getSalesDistribution = async (req, res) => {
  try {
    const boughtPlans = await boughtPlansModel.find({}).exec();
    let ownSales = []; //all sales of the creator
    let plans = []; //array of exclusive content
    let countPlans = []; //array with amount sold for each plan

    boughtPlans.map((item) => {
      //check if content is from requested user
      if (item.ownerId == req.body.userId) {
        ownSales.push(item.title);

        //eliminate duplicates
        if (!plans.includes(item.title)) {
          plans.push(item.title);
        }
      }
    });

    //get the amount of plans sold for each exclusive plan
    plans.map((item) => {
      countPlans.push({
        name: item,
        amount: ownSales.filter((x) => x == item).length,
      });
    });

    return res.status(200).json({
      salesDistribution: countPlans,
      overallSales: ownSales.length,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const getFinancials = async (req, res) => {
  try {
    const boughtPlans = await boughtPlansModel.find({}).exec();
    let customers = [];
    let ownSales = [];
    let overallRev = 0;
    let ovRevString = "";

    boughtPlans.map((item) => {
      //check if content is from requested user
      if (item.ownerId == req.body.userId) {
        ownSales.push(item);

        //eliminate duplicates
        if (!customers.includes(item.userId)) {
          customers.push(item.userId);
        }
      }
    });

    ownSales.map((item) => {
      let tempprice = item.price;
      let tempint = 0;

      tempprice = tempprice.replace(",", "");
      tempint = parseInt(tempprice);
      overallRev += tempint;
    });

    ovRevString = overallRev.toString();
    ovRevString =
      ovRevString.substring(0, ovRevString.length - 2) +
      "," +
      ovRevString.substring(ovRevString.length - 2, ovRevString.length);

    return res.status(200).json({
      overallRevenue: ovRevString,
      expectedPayout: 0,
      payoutChange: 0,
      overallCustomers: customers.length,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

module.exports = {
  create,
  list,
  get,
  getSalesDistribution,
  getFinancials,
};
