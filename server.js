require("dotenv").config(); // ← 必ず一番上に！

const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 3000;

// JSON形式と静的ファイルの読み込み
app.use(express.json());
app.use(express.static("public")); // ← これで public/index.html が読み込まれるようになる！

// ✅ Googleの所有権確認用にトップで index.html を返すルートを追加！
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 📩 お問い合わせフォーム POSTルート
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // 簡易バリデーション
  if (!name || !email || !message) {
    return res.status(400).json({ message: "すべての項目を入力してください。" });
  }

  // メール送信用トランスポーター
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // 管理者宛
  const mailToAdmin = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: "masa.liveinfo@gmail.com", // 管理者のメール
    subject: `【お問い合わせ】${name}様より`,
    text: `${name}様からお問い合わせがありました。\n\n---\nお名前: ${name}\nメール: ${email}\n内容:\n${message}\n---`
  };

  // ユーザー宛の自動返信
  const mailToUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "【自動返信】お問い合わせありがとうございます",
    text: `${name}様\n\nこの度はお問い合わせいただきありがとうございます。\n\n以下の内容で受け付けました：\n---\n${message}\n---\n\n返信までお待ちください。\n\nMasa オフィシャルサイト`
  };

  try {
    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(mailToUser);
    res.json({ message: `${name}さん、メール送信しました！` });
  } catch (err) {
    console.error("エラー:", err);
    res.status(500).json({ message: "送信に失敗しました。" });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ サーバー起動中: http://localhost:${PORT}`);
});
