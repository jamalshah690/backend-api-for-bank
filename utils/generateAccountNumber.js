const Counter = require("../models/Counter");

async function generateAccountNumber() {
  const counter = await Counter.findOneAndUpdate(
    { name: "accountNumber" },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true }
  );

  return counter.sequence.toString(); // 10000001, 10000002 ...
}

module.exports = generateAccountNumber;
