const express=require("express");
const router=express.Router();
const Account=require("../models/Account");
const generateAccountNumber=require("../utils/generateAccountNumber");

/* =========================
CREATE  new account
========================= */
router.post("/createBankAccount", async (req, res) => {
    try 
    {
        var data = req.body;
      const newAccount = new Account(data);
      newAccount.accountNumber = await generateAccountNumber();
      const savedAccount = await newAccount.save();
      res.status(201).json({ message: "Bank account created successfully", account: savedAccount });

     } catch (error) {
        console.error("Error in POST /createBankAccount:", error);
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});


router.get("/getAllAccounts", async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json({ message: "Accounts retrieved successfully", accounts });

    } catch (error) {
        console.error("Error in GET /getAllAccounts:", error);
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});

router.get("/getAccount/:id", async (req, res) => {
    try {
        const accountId = req.params.id;
        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }
        res.status(200).json({ message: "Account retrieved successfully", account });
    } catch (error) {
        console.error("Error in GET /getAccount/:id:", error);
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
}
);

router.delete("/deleteAccount/:id", async (req, res) => {
    try{

        var accountId = req.params.id;
        const deletedAccount = await Account.findByIdAndDelete(accountId);
        if (!deletedAccount) {
            return res.status(404).json({ error: "Account not found" });
        }
        res.status(200).json({ message: "Account deleted successfully", account: deletedAccount });
    }catch(error){
        console.error("Error in DELETE /deleteAccount/:id:", error);
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
}
);
router.put("/updateAccount/:id", async (req, res) => {
  try {
    const accountId = req.params.id;
    const updatedData = req.body;

    console.log("Updating Account:", accountId, updatedData);

    const updatedAccount = await Account.findByIdAndUpdate(
      accountId,
      updatedData,
      { new: true, runValidators: true }
    );

    console.log("Updated Account:", updatedAccount);

    if (!updatedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.status(200).json({ message: "Account updated successfully", account: updatedAccount });
  } catch (error) {
    console.error("Error in PUT /updateAccount/:id:", error);
    res.status(500).json({ error: "Internal server error", errorDetails: error.message });
  }
});


module.exports=router;