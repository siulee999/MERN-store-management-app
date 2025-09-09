import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";


export async function handleLogin(req, res) {
	try {
		const { username, password } = req.body;
		const foundUser = await User.findOne({ username });
		if (!foundUser) return res.status(401).json({ message: "Username not found" });

		const isMatched = bcrypt.compareSync(password, foundUser.password);
		if (!isMatched) return res.status(401).json({ message: "Invalid password" });

		// access token sent via json
		// refresh token sent as cookie
		const accessToken = jwt.sign(
			{ "id": foundUser.userId, "username": foundUser.username },
			process.env.ACCESS_TOKEN_KEY,
			{ expiresIn: "10m" } // 10min expires
		)

		const refreshToken = jwt.sign(
			{ "id": foundUser.userId, "username": foundUser.username },
			process.env.REFRESH_TOKEN_KEY,
			{ expiresIn: "4h" } // 4 hrs expires
		)

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge:  4 * 60 * 60 * 1000, // 4 hrs expires
			path: "/auth"
		})

		await User.updateOne({ username: foundUser.username }, { $set: { refreshToken } });

		return res.json({ accessToken });


	} catch (err) {
		res.status(500).json({ message: "Error logging in" });
		console.log(err);
	}
}

export async function handleLogout(req, res) {
	try {
		const refreshToken = req.cookies.jwt;

		if (refreshToken) {
			res.clearCookie("jwt", {
				httpOnly: true,
				secure: true,
				sameSite: "none",
				maxAge: 4 * 60 * 60 * 1000, // 4hrs expires
				path: "/auth"
			});

			await User.updateMany({ refreshToken },
				{
					$set: {
						refreshToken: ""
					}
				})
		}

		res.json({ message: "Logged out successfully" });

	} catch (err) {
		res.status(500).json({ message: "Error logging out" });
		console.log(err);
	}

}

export async function handleRefreshToken(req, res) {
	try {
		const refreshToken = req.cookies.jwt;
		if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

		const foundUser = await User.findOne({ refreshToken });

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
			if (err) {
				if (err.name === 'TokenExpiredError') return res.status(403).json({ message: "Refreshtoken Expires"});
				return res.status(401).json({ message: "Failed to verify" });
			}

			if (decoded.username === foundUser.username && decoded.id === foundUser.userId) {
				const accessToken = jwt.sign(
					{ "id": foundUser.userId, "username": foundUser.username },
					process.env.ACCESS_TOKEN_KEY,
					{ expiresIn: "10m" } // 10min expires
				);
				res.json({ accessToken });
			}
		})

	} catch (err) {
		res.status(500).json({ message: "Error refreshing token" });
		console.log(err);
	}
}