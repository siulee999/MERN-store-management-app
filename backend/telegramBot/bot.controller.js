export async function printoutProducts(products, bot, chatId) {
  try {
    products.sort((a, b) => b.productId - a.productId);

    for (const product of products) {
      let resp = `🌟<b>${product.productName}</b>\n`;
      resp += `<b>價格：</b>$${product.price}\n`;
      resp += `<b>介紹：</b>${product.description}\n`;   
      
      await bot.sendMessage(chatId, resp, { parse_mode: "HTML" });
    }

  } catch(err) {
    console.log(err);
  }
};


export async function printoutQA(questions, bot, chatId) {
  try {
    questions.sort((a, b) => a.q_id - b.q_id);

    for (const [index, element] of questions.entries()) {
      let resp = `💬<b>Q${index + 1}: ${element.q_question}\n</b>`;
      resp += `${element.q_answer}`;

      await bot.sendMessage(chatId, resp, { parse_mode: "HTML" });
    };

  } catch(err) {
    console.log(err);
  }
};


export function printoutShops(shops, bot, chatId) {
  for (const shop of shops) {
    let resp = `🏪<b>${shop.shopName}</b>\n`;
    resp += `<b>地址:</b> ${shop.address}\n`;
    resp += `<b>營業時間:</b> ${shop.openingHour}\n`

    bot.sendMessage(chatId, resp, { parse_mode: "HTML" });
  }
}