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

// Get all BenchmarkIndex records
userController.getBenchmarkIndex = async (req, res) => {
	try {
		const benchmarkData = await User.getBenchmarkIndex();
		res.status(200).json({ data: benchmarkData });
	} catch (error) {
		console.error(
			"Failed to fetch BenchmarkIndex data:",
			error.message
		);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Get all AllocationStrategy records
userController.getAllocationStrategy = async (req, res) => {
	try {
		const allocationData = await User.getAllocationStrategy();
		res.status(200).json({ data: allocationData });
	} catch (error) {
		console.error(
			"Failed to fetch AllocationStrategy data:",
			error.message
		);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Get all Watchlist records
userController.getWatchlist = async (req, res) => {
	try {
		const watchlistData = await User.getWatchlist();
		res.status(200).json({ data: watchlistData });
	} catch (error) {
		console.error("Failed to fetch Watchlist data:", error.message);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Get all Transaction records
userController.getTransactions = async (req, res) => {
	try {
		const transactionData = await User.getTransactions();
		res.status(200).json({ data: transactionData });
	} catch (error) {
		console.error(
			"Failed to fetch Transaction data:",
			error.message
		);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Get all PerformanceReport records
userController.getPerformanceReports = async (req, res) => {
	try {
		const performanceReportData =
			await User.getPerformanceReports();
		res.status(200).json({ data: performanceReportData });
	} catch (error) {
		console.error(
			"Failed to fetch PerformanceReport data:",
			error.message
		);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Get all RiskAssessment records
userController.getRiskAssessments = async (req, res) => {
	try {
		const riskAssessmentData = await User.getRiskAssessments();
		res.status(200).json({ data: riskAssessmentData });
	} catch (error) {
		console.error(
			"Failed to fetch RiskAssessment data:",
			error.message
		);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Get all Assets records
userController.getAssets = async (req, res) => {
	try {
		const assetsData = await User.getAssets();
		res.status(200).json({ data: assetsData });
	} catch (error) {
		console.error("Failed to fetch Assets data:", error.message);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Get all Portfolio records
userController.getPortfolios = async (req, res) => {
	try {
		const portfolioData = await User.getPortfolios();
		res.status(200).json({ data: portfolioData });
	} catch (error) {
		console.error("Failed to fetch Portfolio data:", error.message);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Get all Funds records
userController.getFunds = async (req, res) => {
	try {
		const fundsData = await User.getFunds();
		res.status(200).json({ data: fundsData });
	} catch (error) {
		console.error("Failed to fetch Funds data:", error.message);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Controller function to update fund details
userController.updateFundDetails = async (req, res) => {
	const { FundID, FundName, FundType, StrategyID } = req.body;

	if (!FundID || !FundName || !FundType || !StrategyID) {
		return res
			.status(400)
			.json({ error: "All fields are required" });
	}

	try {
		const rowsAffected = await User.updateFundDetails(
			FundID,
			FundName,
			FundType,
			StrategyID
		);

		if (rowsAffected === 0) {
			return res
				.status(404)
				.json({ error: "Fund not found" });
		}

		res.status(200).json({
			message: "Fund details updated successfully",
		});
	} catch (error) {
		console.error("Failed to update fund details:", error.message);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Controller function to insert new fund details
userController.addFundDetails = async (req, res) => {
	const { FundName, FundType, StrategyID } = req.body;

	if (!FundName || !FundType || !StrategyID) {
		return res
			.status(400)
			.json({ error: "All fields are required" });
	}

	// Validate fundType
	const validFundTypes = ["Equity", "Debt", "Hybrid"];
	if (!validFundTypes.includes(FundType)) {
		return res
			.status(400)
			.json({
				error: `Invalid FundType. Must be one of: ${validFundTypes.join(
					", "
				)}`,
			});
	}

	try {
		const rowsAffected = await User.insertFundDetails(
			FundName,
			FundType,
			StrategyID
		);

		if (rowsAffected === 0) {
			return res
				.status(400)
				.json({ error: "Failed to add fund" });
		}

		res.status(201).json({ message: "Fund added successfully" });
	} catch (error) {
		console.error("Failed to add fund details:", error.message);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

// Controller function to delete a risk assessment
userController.deleteRiskAssessment = async (req, res) => {
	const { assessmentID } = req.params;

	if (!assessmentID) {
		return res
			.status(400)
			.json({ error: "AssessmentID is required" });
	}

	try {
		const rowsAffected = await User.deleteRiskAssessment(
			assessmentID
		);

		if (rowsAffected === 0) {
			return res
				.status(404)
				.json({
					error: "No record found with the given AssessmentID",
				});
		}

		res.status(200).json({
			message: "Risk assessment deleted successfully",
		});
	} catch (error) {
		console.error(
			"Failed to delete risk assessment:",
			error.message
		);
		res.status(500).json({
			error: "Server error, please try again later.",
		});
	}
};

module.exports = userController;
