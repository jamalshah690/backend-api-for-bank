const  express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const Account = require("../models/Account");

router.post("/", async (req, res) => {
    try {
        var data = req.body;
        const newUser = new User(data);

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        console.error("Error in POST /api/users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



/* =========================
GET  All API data
========================= */
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json({ message: "Users retrieved successfully", users });

    } catch (error) {
        console.error("Error in GET /api/users:", error);
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});


/* =========================
GET  specific user data
========================= */
router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
        console.error("Error in GET /api/users/:id:", error);
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});



router.put("/:id", async (req, res) => {
    try {
        var userId = req.params.id;
        var updatedData = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });

    } catch (error) {
        console.error("Error in PUT /api/users/:id:", error);
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        var userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error in DELETE /api/users/:id:", error);
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});
router.put("/activate/:id", async (req, res) => {
    try {
        var userId = req.params.id;
        const activatedUser = await User.findByIdAndUpdate(userId, { isActive: true }, { new: true });
        if (!activatedUser) {
            return res.status(404).json({ error: "User not found" });
        }  // Update all accounts of this user
        await Account.updateMany(
            { userId: userId },
            { status: "active" }
        );
        res.status(200).json({ message: "User activated successfully", user: activatedUser });

    } catch (error) {
        console.error("Error in PUT /api/users/activate/:id:", error);      
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});
router.put("/deactivate/:id", async (req, res) => {
    try {
        var userId = req.params.id;
        const deactivatedUser = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
        if (!deactivatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        // Update all accounts of this user
        await Account.updateMany(
            { userId: userId },
            { status: "blocked" }
        );
        res.status(200).json({ message: "User deactivated successfully", user: deactivatedUser });

    } catch (error) {
        console.error("Error in PUT /api/users/deactivate/:id:", error);
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});
module.exports = router;