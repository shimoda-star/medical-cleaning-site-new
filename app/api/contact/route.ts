import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  // この行をPOST関数の中に移動しました。これが正しい修正です。
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await request.json()
    const { name, facility, phone, email, service, message } = body

    // Basic validation
    if (!name || !facility || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "必須項目が不足しています。" },
        { status: 400 },
      )
    }

    const emailContent = `
新しいお問い合わせが届きました。

【お客様情報】
ご担当者名: ${name}
施設名: ${facility}
電話番号: ${phone}
メールアドレス: ${email}
希望内容: ${service || "未選択"}

【メッセージ】
${message || "なし"}

---
このメールは医療白衣クリーニングサイトから自動送信されました。
    `

    const data = await resend.emails.send({
      from: "noreply@wbrownie.com",
      to: [process.env.TO_EMAIL || "shimoda@wbrownie.com"],
      subject: `【医療白衣クリーニング】新しいお問い合わせ - ${facility}`,
      text: emailContent,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "メール送信中にサーバーでエラーが発生しました。",
        debug: {
          error: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    )
  }
}
