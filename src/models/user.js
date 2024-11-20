// models/user.js
const { sql, poolPromise } = require("../config/db"); // Database connection

// User model
const User = {};

// Find user by email
User.findByEmail = async (email) => {
	try {
		const pool = await poolPromise; // Reuse the poolPromise connection
		const result = await pool
			.request()
			.input("email", sql.VarChar, email) // Add parameterized input
			.query("SELECT * FROM [User] WHERE UserEmail = @email"); // Use @email parameter

		return result.recordset[0] || null; // Return the first user (or undefined if not found)
	} catch (error) {
		throw new Error("Database query failed", error);
	}
};

// Create a new user
User.create = async (name, email, password, phone, dob, riskprofile) => {
	try {
		const pool = await poolPromise;
		await pool
			.request()
			.input("name", sql.VarChar, name)
			.input("email", sql.VarChar, email)
			.input("password", sql.VarChar, password) // Storing plain text as per the current requirement
			.input("phone", sql.VarChar, phone)
			.input("dob", sql.Date, dob)
			.input("riskprofile", sql.VarChar, riskprofile).query(`
          INSERT INTO [User] (UserName, UserEmail, UserPassword, UserContact, DateOfBirth, RiskProfile)
          VALUES (@name, @email, @password, @phone, @dob, @riskprofile)
        `);
	} catch (error) {
		console.error("Database insertion failed:", error.message);
		throw new Error("Database insertion failed");
	}
};

// Fetch a single user's details by email (if not added already)
User.getUserDetailsByEmail = async (email) => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("email", sql.VarChar, email)
			.query("SELECT * FROM [User] WHERE UserEmail = @email");
		return result.recordset[0] || null; // Return user details or null if not found
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Update user details by email
User.updateDetailsByEmail = async (
	email,
	{ name, phone, dob, riskProfile }
) => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("email", sql.VarChar, email)
			.input("name", sql.VarChar, name)
			.input("phone", sql.VarChar, phone)
			.input("dob", sql.Date, dob)
			.input("riskProfile", sql.VarChar, riskProfile).query(`
          UPDATE [User]
          SET UserName = @name,
              UserContact = @phone,
              DateOfBirth = @dob,
              RiskProfile = @riskProfile
          WHERE UserEmail = @email
        `);

		return result.rowsAffected[0]; // Return the number of rows affected
	} catch (error) {
		console.error("Database update failed:", error.message);
		throw new Error("Database update failed");
	}
};

// Get all records from BenchmarkIndex table
User.getBenchmarkIndex = async () => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query("SELECT * FROM BenchmarkIndex");
		return result.recordset; // Return all records from BenchmarkIndex
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Get all records from AllocationStrategy table
User.getAllocationStrategy = async () => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query("SELECT * FROM AllocationStrategy");
		return result.recordset; // Return all records from AllocationStrategy
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Get all records from Watchlist table
User.getWatchlist = async () => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query("SELECT * FROM Watchlist");
		return result.recordset; // Return all records from Watchlist
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Get all records from Transaction table
User.getTransactions = async () => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query("SELECT * FROM [Transaction]");
		return result.recordset; // Return all records from Transaction
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Get all records from PerformanceReport table
User.getPerformanceReports = async () => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query("SELECT * FROM PerformanceReport");
		return result.recordset; // Return all records from PerformanceReport
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Get all records from RiskAssessment table
User.getRiskAssessments = async () => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query("SELECT * FROM RiskAssessment");
		return result.recordset; // Return all records from RiskAssessment
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Get all records from Assets table
User.getAssets = async () => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query("SELECT * FROM Assets");
		return result.recordset; // Return all records from Assets
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Get all records from Portfolio table
User.getPortfolios = async () => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query("SELECT * FROM Portfolio");
		return result.recordset; // Return all records from Portfolio
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Get all records from Funds table
User.getFunds = async () => {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query("SELECT * FROM Funds");
		return result.recordset; // Return all records from Funds
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Update the details of a specific fund by FundID
User.updateFundDetails = async (FundID, FundName, FundType, StrategyID) => {
	try {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("FundID", sql.Int, FundID)
			.input("FundName", sql.NVarChar(100), FundName)
			.input("FundType", sql.NVarChar(50), FundType)
			.input("StrategyID", sql.Int, StrategyID).query(`
          UPDATE Funds
          SET FundName = @FundName, FundType = @FundType, StrategyID = @StrategyID
          WHERE FundID = @FundID
        `);

		return result.rowsAffected[0]; // Returns the number of affected rows
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Insert a new fund into the Funds table
User.insertFundDetails = async (FundName, FundType, StrategyID) => {
	try {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("FundName", sql.NVarChar(100), FundName)
			.input("FundType", sql.NVarChar(50), FundType)
			.input("StrategyID", sql.Int, StrategyID).query(`
          INSERT INTO Funds (FundName, FundType, StrategyID)
          VALUES (@FundName, @FundType, @StrategyID);
        `);

		return result.rowsAffected[0]; // Returns the number of affected rows
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

// Delete a risk assessment record by AssessmentID
User.deleteRiskAssessment = async (assessmentID) => {
	try {
		const pool = await poolPromise;

		const result = await pool
			.request()
			.input("AssessmentID", sql.Int, assessmentID).query(`
          DELETE FROM RiskAssessment
          WHERE AssessmentID = @AssessmentID;
        `);

		return result.rowsAffected[0]; // Returns the number of affected rows
	} catch (error) {
		console.error("Database query failed:", error.message);
		throw new Error("Database query failed");
	}
};

module.exports = User;
