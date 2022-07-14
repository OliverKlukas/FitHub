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
    //customers
    let customers = [];

    //overall revenue
    let ownSales = [];
    let overallRev = 0;
    let ovRevString = "";

    //payout
    let salesCurrPeriod = [];
    let payoutCurrPeriod = 0;
    let payoutCurrPeriodString = "";

    //growth rate
    let salesLastPeriod = [];
    let payoutLastPeriod = 0;
    let changeRate = 0;
    const offset = 24 * 60 * 60 * 1000;

    //setting dates for current period (calculate payout)
    const currDate = new Date();
    const firstCurrDay = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      1
    );

    //setting dates for last period (calculate chage)
    const periodStart = new Date(currDate - 31 * offset);
    const firstLastDay = new Date(
      periodStart.getFullYear(),
      periodStart.getMonth(),
      1
    );

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

    // check sales by timeframes
    ownSales.map((item) => {
      // get sales in current period
      if (firstCurrDay < item.boughtAt && currDate >= item.boughtAt) {
        salesCurrPeriod.push(item);
      }
      // get sales in last period
      if (firstLastDay < item.boughtAt && firstCurrDay >= item.boughtAt) {
        salesLastPeriod.push(item);
      }
    });

    // summarize payments in current period
    salesCurrPeriod.map((item) => {
      let tempprice = item.price;
      let tempint = 0;

      tempprice = tempprice.replace(",", "");
      tempint = parseInt(tempprice);
      payoutCurrPeriod += tempint;
    });

    // current payout to string
    payoutCurrPeriodString = payoutCurrPeriod.toString();
    payoutCurrPeriodString =
      payoutCurrPeriodString.substring(0, payoutCurrPeriodString.length - 2) +
      "," +
      payoutCurrPeriodString.substring(
        payoutCurrPeriodString.length - 2,
        payoutCurrPeriodString.length
      );
    if (payoutCurrPeriodString === ",0") {
      payoutCurrPeriodString = "0";
    }

    // summarize payments in current period
    salesLastPeriod.map((item) => {
      let tempprice = item.price;
      let tempint = 0;

      tempprice = tempprice.replace(",", "");
      tempint = parseInt(tempprice);
      payoutLastPeriod += tempint;
    });

    if (payoutCurrPeriod !== 0) {
      changeRate = Math.round(
        ((payoutCurrPeriod - payoutLastPeriod) / payoutCurrPeriod) * 100
      );
    }

    const changeRateString = changeRate.toString().replace("-", "- ");

    // summarize overall payments
    ownSales.map((item) => {
      let tempprice = item.price;
      let tempint = 0;

      tempprice = tempprice.replace(",", "");
      tempint = parseInt(tempprice);
      overallRev += tempint;
    });

    // overall payments back to string
    ovRevString = overallRev.toString();
    ovRevString =
      ovRevString.substring(0, ovRevString.length - 2) +
      "," +
      ovRevString.substring(ovRevString.length - 2, ovRevString.length);
    if (ovRevString === ",0") {
      ovRevString = "0";
    }

    return res.status(200).json({
      overallRevenue: ovRevString,
      expectedPayout: payoutCurrPeriodString,
      payoutChange: changeRateString,
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

const getTimeline = async (req, res) => {
  try {
    const boughtPlans = await boughtPlansModel.find({}).exec();
    const ownSales = []; //all sales of the creator
    const offset = 24 * 60 * 60 * 1000; //for calculating in days
    const vals = [];
    const days = [];
    const sales = [0, 0, 0, 0, 0, 0, 0, 0];

    boughtPlans.map((item) => {
      //check if content is from requested user
      if (item.ownerId == req.body.userId) {
        ownSales.push(item);
      }
    });

    //calculate current calender week
    const currentDate = new Date();
    days.push(currentDate);

    // get calender weeks
    const firstDayYear = new Date(currentDate.getFullYear(), 0, 1);
    const sumDays = Math.floor((currentDate - firstDayYear) / offset);
    const calweek = Math.ceil(sumDays / 7);

    for (let i = 0; i < 8; i++) {
      vals.push("CW" + (calweek - i).toString());
    }

    // current calender week is last sunday until today
    const lastSunday = new Date(currentDate - currentDate.getDay() * offset);
    days.push(lastSunday);

    // for loop to get all sundays
    for (let i = 7; i < 56; i = i + 7) {
      days.push(new Date(lastSunday - i * offset));
    }

    ownSales.map((item) => {
      for (let i = 0; i < 8; i++) {
        if (days[i + 1] < item.boughtAt && item.boughtAt <= days[i]) {
          sales[i] = sales[i] + 1;
        }
      }
    });

    return res.status(200).json({
      timeline: [
        { week: vals[7], sales: sales[7] },
        { week: vals[6], sales: sales[6] },
        { week: vals[5], sales: sales[5] },
        { week: vals[4], sales: sales[4] },
        { week: vals[3], sales: sales[3] },
        { week: vals[2], sales: sales[2] },
        { week: vals[1], sales: sales[1] },
        { week: vals[0], sales: sales[0] },
      ],
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
  getTimeline,
};
