import { mailOptions, transporter } from "@/config/nodemailer"
import { NextApiRequest, NextApiResponse } from "next"

const generateEmailContent = (data: {
  name: string
  email: string
  message: string
}) => {
  const emailContent = Object.entries(data).reduce((str, [key, val]) => {
    return str + `${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}\n`
  }, "")
  return emailContent
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = req.body
      const emailContent = generateEmailContent(data)

      await transporter.sendMail({
        ...mailOptions,
        subject: "Message from website",
        text: emailContent,
        html: `<pre>${emailContent}</pre>` // Using <pre> to preserve formatting
      })

      res.status(200).json({ message: "Form submitted successfully" })
    } catch (error) {
      console.error("Error processing contact form:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
