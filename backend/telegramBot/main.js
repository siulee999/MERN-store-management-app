import TelegramBot from "node-telegram-bot-api";

import "dotenv/config";
import axios from "axios";
import { printoutProducts, printoutQA, printoutShops } from "./bot.controller.js";


// Bot設定
console.log("Telegram Bot Server start...");
const token = process.env.BOT_TOKEN;
const BASE_URL = process.env.SERVER_BASE_URL;

let bot = new TelegramBot(token, { polling: true });


// 發送指令訊息
const instructions = `歡迎使用豐電智能助理☺️\n您可以透過以下指令查詢相應資訊\：\n\n🌟<b>產品</b>\n<u>\/search 關鍵字\n\/search 關鍵字 最低價格 最高價格</u>\n例\：\/search 電視 1000 5000\n\n🏪<b>分店</b>\n<u>\/shop 關鍵字</u>\n例\：\/shop APM\n(或分享位置，查詢2公里內分店)\n\n💬<b>解答</b>\n<u>\/question 問題關鍵字</u>\n例\：\/question 會員\n\n可隨時輸入指令\～`;

bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, instructions, { parse_mode: "HTML" });
});


// 以關鍵字尋找產品
bot.onText(/\/search (.+)/, async function (msg, match) {
	try {
		const keywords = match[1].split(/\s+/);

		const word = keywords[0];
		const price1 = parseFloat(keywords[1]);
		const price2 = parseFloat(keywords[2]);

		let result = [];

		if (keywords.length === 1) {
			const response = await axios.get(`${BASE_URL}/products?q=${word}`);

			result = response.data;

		} else if (keywords.length === 3 && price1 && price2) {
			let response = {}; 

			if ( price1 < price2) {
				response = await axios.get(`${BASE_URL}/products?q=${word}&lp=${price1}&hp=${price2}`);
			} else {
				response = await axios.get(`${BASE_URL}/products?q=${word}&lp=${price2}&hp=${price1}`);
			}

			result = response.data;
		}
		
		if (result.length === 0) {
			bot.sendMessage(msg.chat.id, "😔沒有相關產品");

		} else {
			printoutProducts(result, bot, msg.chat.id);
		}

	} catch (err) {
		bot.sendMessage(msg.chat.id, "⚠️ 錯誤！搜尋失敗");
		console.log(err);
	}
});


// 以關鍵字尋找分店
bot.onText(/\/shop (.+)/, async function (msg, match) {
	try {
		let keyword = match[1].replace(/\s+/, "");

		const response = await axios.get(`${BASE_URL}/shops?q=${keyword}`);
		const result = response.data;

		if (result.length === 0) {
			bot.sendMessage(msg.chat.id, "😔沒有相關分店");
		} else {
			printoutShops(result, bot, msg.chat.id);
		}


	} catch (err) {

		bot.sendMessage(msg.chat.id, "⚠️ 錯誤！搜尋失敗");
		console.log(err);

	}
});


// 尋找鄰近分店
bot.on("location", async (msg) => {
	try {
		const { latitude, longitude } = msg.location;

		const response = await axios.get(`${BASE_URL}/shops?lat=${latitude}&lon=${longitude}`);

		const result = response.data;

		if (result.length === 0) {
			bot.sendMessage(msg.chat.id, "😔沒有鄰近分店");
		} else {
			printoutShops(result, bot, msg.chat.id);
		}

	} catch (err) {
		bot.sendMessage(msg.chat.id, "⚠️ 錯誤！搜尋失敗");
		console.log(err);
	}
});


// 以關鍵字尋找問題
bot.onText(/\/question (.+)/, async (msg, match) => {
	try {
		let keyword = match[1].trim();

		const response = await axios.get(`${BASE_URL}/questions?q=${keyword}`);
		const result = response.data;

		if (result.length === 0) {
			bot.sendMessage(msg.chat.id, "😔沒有相關問題")
		} else {
			printoutQA(result, bot, msg.chat.id);
		}

	} catch (err) {
		bot.sendMessage(msg.chat.id, "⚠️ 錯誤！搜尋失敗");
		console.log(err);
	}
});

