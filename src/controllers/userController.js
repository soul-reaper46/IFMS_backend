const { poolPromise } = require("../config/db");
const User = require("../models/user");
const userController = {};

userController.getAllUsers = async (req, res) => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query("SELECT * FROM [User]");
		res.status(200).json(result.recordset);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Get user details by email
userController.getUserDetails = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ error: "Email is required." });
	}

	try {
		const user = await User.getUserDetailsByEmail(email);

		if (!user) {
			return res
				.status(404)
				.json({ error: "User not found." });
		}

		// Respond with user details
		res.status(200).json({
			user: {
				id: user.UserID,
				name: user.UserName,
				contact: user.UserContact,
				email: user.UserEmail,
				riskProfile: user.RiskProfile,
				dateOfBirth: user.DateOfBirth,
			},
		});
	} catch (error) {
		console.error("Failed to fetch user details:", error.message);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Update user details by email
userController.updateUserDetails = async (req, res) => {
	const { email, name, password, phone, dob, riskProfile } = req.body;

	if (!email || !name || !phone || !dob || !riskProfile) {
		return res
			.status(400)
			.json({ error: "All fields are required." });
	}

	try {
		// Check if the user exists
		const existingUser = await User.findByEmail(email);
		if (!existingUser) {
			return res
				.status(404)
				.json({ error: "User not found." });
		}

		// Update user details
		const rowsAffected = await User.updateDetailsByEmail(email, {
			name,
			phone,
			dob,
			riskProfile,
		});

		if (rowsAffected > 0) {
			res.status(200).json({
				message: "User details updated successfully.",
			});
		} else {
			res.status(500).json({
				error: "Failed to update user details.",
			});
		}
	} catch (error) {
		console.error("Update user details failed:", error.message);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

module.exports = userController;
