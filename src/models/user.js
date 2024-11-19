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

module.exports = User;
