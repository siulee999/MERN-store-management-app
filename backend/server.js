import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/db.js";
import path from "path";

import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import shopRoute from "./routes/shop.route.js";
import questionRoute from "./routes/question.route.js";

import { checkJSONBody } from "./middlewares/checkJSONBody.js";


// 應用程式設定
let app = express();


// 請求設定和檢查
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(checkJSONBody);

// APIs
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/shops", shopRoute);
app.use("/api/questions", questionRoute);


// 伺服器設定
const PORT = process.env.PORT || 8080;

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist" )));

	app.get(/.*/, (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

const server = app.listen(PORT, () => {
	connectDB();
	const addressInfo = server.address();
	console.log(`RESTful API Server listening on ${addressInfo.address}:${addressInfo.port}`);
});
