require("dotenv").config(); // ← 必ず一番上に！

const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // バリデーション（簡易）
  if (!name || !email || !message) {
    return res.status(400).json({ message: "すべての項目を入力してください。" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // 例: masa.liveinfo@gmail.com
      pass: process.env.EMAIL_PASS
    }
  });
// 管理者（マサさん）に届くメール
const mailToAdmin = {
  from: process.env.EMAIL_USER,
  replyTo: email, // ユーザーが入力したメールアドレス
  to: "masa.liveinfo@gmail.com", // ★マサさんのアドレス
  subject: `【お問い合わせ】${name}様より`,
  text: `${name}様からお問い合わせがありました。\n\n以下の内容です：\n-----------------------------\nお名前: ${name}\nメール: ${email}\n内容:\n${message}\n-----------------------------`
};

// ユーザー宛の自動返信メール
const mailToUser = {
  from: process.env.EMAIL_USER,
  to: email, // ★ユーザーの入力したメールアドレス
  subject: "【自動返信】お問い合わせありがとうございます",
  text: `${name}様\n\nこの度はお問い合わせいただき、ありがとうございます。\n\n以下の内容で受け付けました：\n-----------------------------\n${message}\n-----------------------------\n\n本人またはスタッフからの返信をお待ちください。\n\nご確認の程よろしくお願いいたします。\n\nMasa オフィシャルサイト`
};

  try {
    await transporter.sendMail(mailToAdmin); // 管理者へ通知
    await transporter.sendMail(mailToUser);  // ユーザーへ自動返信

    res.json({ message: `${name}さん、メール送信しました！` });
  } catch (err) {
    console.error("エラー:", err);
    res.status(500).json({ message: "送信に失敗しました。" });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} でサーバー起動中`);
});
