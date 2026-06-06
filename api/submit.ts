import type { VercelRequest, VercelResponse } from '@vercel/node'

const LABELS: Record<string, string> = {
  q1: 'Q1. 年代',
  q2: 'Q2. 性別',
  q3: 'Q3. お仕事の状況',
  q4: 'Q4. クラウドワークス登録時期',
  q5: 'Q5. 副業収入の経験',
  q6: 'Q6. やりたい副業分野',
  q7: 'Q7. 副業を始めたい理由',
  q8: 'Q8. 目指したい月収',
  q9: 'Q9. 困っていること',
  q10: 'Q10. 情報・サポートを知りたいか',
  q11: 'Q11. 特典資料の受け取り',
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  console.log('[submit] received')

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('[submit] DISCORD_WEBHOOK_URL is not set')
    return res.status(200).json({ ok: true })
  }

  try {
    const body = req.body as Record<string, string | string[]>
    const fields = Object.entries(LABELS).map(([key, label]) => {
      const val = body[key]
      const value = Array.isArray(val) && val.length > 0
        ? val.join('、')
        : typeof val === 'string' && val
          ? val
          : '（未回答）'
      return { name: label, value, inline: false }
    })

    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '📋 副業アンケート 新規回答',
          color: 0x673AB7,
          fields,
          timestamp: new Date().toISOString(),
        }],
      }),
    })

    if (discordRes.ok) {
      console.log('[submit] discord ok')
    } else {
      console.error('[submit] discord error', discordRes.status, await discordRes.text())
    }
  } catch (err) {
    console.error('[submit] exception', err)
  }

  return res.status(200).json({ ok: true })
}
