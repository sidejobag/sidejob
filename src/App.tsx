import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'

const ACCENT = '#673AB7'

type Answers = {
  q1: string
  q2: string
  q3: string
  q4: string
  q5: string
  q6: string[]
  q7: string
  q8: string
  q9: string[]
  q10: string
  q11: string
}

const initial: Answers = {
  q1: '', q2: '', q3: '', q4: '', q5: '', q6: [],
  q7: '', q8: '', q9: [], q10: '', q11: '',
}

const SECTIONS = [
  {
    title: '2026年 副業の実態調査',
    desc: '所要時間は約3分です。選択式が中心で簡単にお答えいただけます。ご回答は統計的に集計し、調査目的以外には使用しません。まずはあなたについて教えてください。',
  },
  {
    title: 'あなたの副業の現状について',
    desc: '次に、これまでの副業の取り組みについて伺います。正直なところをそのままお答えください。',
  },
  {
    title: '副業に対する思い・理想',
    desc: 'ここでは、あなたが副業に何を求めているか、どんなことに困っているかを教えてください。普段は言葉にしないことかもしれませんが、整理するきっかけになれば幸いです。',
  },
  {
    title: '調査へのご協力ありがとうございました',
    desc: '最後に、調査参加特典のご案内です。受け取りは任意ですので、ご希望の方のみお進みください。',
  },
]

const TOTAL = SECTIONS.length
const LINE_URL = import.meta.env.VITE_LINE_URL || 'https://line.me'

function ThanksPage({ wantsGift }: { wantsGift: boolean }) {
  const [count, setCount] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(timer)
          window.location.href = LINE_URL
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: '#F3EEF9' }}>
            <svg className="w-6 h-6" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-gray-900 mb-1">回答ありがとうございました！</h2>
          {wantsGift ? (
            <p className="text-sm text-gray-500 mb-6">
              特典はLINEでお届けします。<br />下のQRコードから友だち追加してください。
            </p>
          ) : (
            <p className="text-sm text-gray-500 mb-6">
              調査へのご協力、ありがとうございました。<br />
              もし気が向いたときは、LINEでも情報を発信しています。
            </p>
          )}

          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white border-2 border-gray-100 rounded-xl inline-block">
              <QRCodeSVG value={LINE_URL} size={180} />
            </div>
          </div>

          <a
            href={LINE_URL}
            className="block w-full py-3 rounded-xl text-sm font-semibold text-white mb-4"
            style={{ backgroundColor: '#06C755' }}
          >
            {wantsGift ? 'LINEで友だち追加する' : 'LINEを見てみる'}
          </a>

          <p className="text-xs text-gray-400">{count}秒後に自動で移動します…</p>
        </div>
      </div>
    </div>
  )
}

function Radio({
  name, value, checked, onChange, label,
}: { name: string; value: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label
      className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors"
      style={{
        borderColor: checked ? ACCENT : '#E5E7EB',
        backgroundColor: checked ? '#F3EEF9' : '#FFFFFF',
      }}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span
        className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
        style={{ borderColor: checked ? ACCENT : '#D1D5DB' }}
      >
        {checked && <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ACCENT }} />}
      </span>
      <span className="text-sm text-gray-800">{label}</span>
    </label>
  )
}

function Checkbox({
  id, checked, onChange, label,
}: { id: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors"
      style={{
        borderColor: checked ? ACCENT : '#E5E7EB',
        backgroundColor: checked ? '#F3EEF9' : '#FFFFFF',
      }}
    >
      <input type="checkbox" id={id} checked={checked} onChange={onChange} className="sr-only" />
      <span
        className="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center"
        style={{
          borderColor: checked ? ACCENT : '#D1D5DB',
          backgroundColor: checked ? ACCENT : undefined,
        }}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="text-sm text-gray-800">{label}</span>
    </label>
  )
}

function QuestionBlock({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode
}) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-800 mb-2">
        {label}
        <span className="ml-1 text-red-500 text-xs">*必須</span>
      </p>
      <div className="flex flex-col gap-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default function App() {
  const [section, setSection] = useState(0)
  const [answers, setAnswers] = useState<Answers>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof Answers, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const setRadio = (key: keyof Answers) => (val: string) =>
    setAnswers(a => ({ ...a, [key]: val }))

  const toggleCheck = (key: 'q6' | 'q9') => (val: string) =>
    setAnswers(a => {
      const cur = a[key] as string[]
      return { ...a, [key]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] }
    })

  const validate = (): boolean => {
    const e: Partial<Record<keyof Answers, string>> = {}
    if (section === 0) {
      if (!answers.q1) e.q1 = '選択してください'
      if (!answers.q2) e.q2 = '選択してください'
      if (!answers.q3) e.q3 = '選択してください'
    }
    if (section === 1) {
      if (!answers.q4) e.q4 = '選択してください'
      if (!answers.q5) e.q5 = '選択してください'
      if (answers.q6.length === 0) e.q6 = '1つ以上選択してください'
    }
    if (section === 2) {
      if (!answers.q7) e.q7 = '選択してください'
      if (!answers.q8) e.q8 = '選択してください'
      if (answers.q9.length === 0) e.q9 = '1つ以上選択してください'
      if (!answers.q10) e.q10 = '選択してください'
    }
    if (section === 3) {
      if (!answers.q11) e.q11 = '選択してください'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate()) return
    setSection(s => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => {
    setErrors({})
    setSection(s => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      })
    } catch {
      // 通知失敗してもユーザー体験は止めない
    }
    setDone(true)
  }

  if (done) {
    return <ThanksPage wantsGift={answers.q11 === '受け取りたい'} />
  }

  const progress = ((section + 1) / TOTAL) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* プログレスバー */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3 max-w-xl mx-auto">
          <span className="text-xs text-gray-500 whitespace-nowrap">{section + 1} / {TOTAL}</span>
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, backgroundColor: ACCENT }}
            />
          </div>
        </div>
      </div>

      <div className="pt-14 pb-10 px-4 max-w-xl mx-auto">
        {/* セクションヘッダー */}
        <div className="mt-6 mb-6 p-4 bg-white rounded-xl border border-gray-200">
          <h1 className="text-base font-semibold mb-2" style={{ color: ACCENT }}>
            {SECTIONS[section].title}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">{SECTIONS[section].desc}</p>
        </div>

        {/* セクション1 */}
        {section === 0 && (
          <>
            <QuestionBlock label="Q1. 年代" required error={errors.q1}>
              {['10代', '20代', '30代', '40代', '50代以上'].map(v => (
                <Radio key={v} name="q1" value={v} checked={answers.q1 === v} onChange={() => setRadio('q1')(v)} label={v} />
              ))}
            </QuestionBlock>
            <QuestionBlock label="Q2. 性別" required error={errors.q2}>
              {['男性', '女性', '回答しない'].map(v => (
                <Radio key={v} name="q2" value={v} checked={answers.q2 === v} onChange={() => setRadio('q2')(v)} label={v} />
              ))}
            </QuestionBlock>
            <QuestionBlock label="Q3. 現在のお仕事の状況" required error={errors.q3}>
              {['会社員（正社員）', '会社員（契約・派遣・パート）', '自営業・フリーランス', '学生', '主婦・主夫', '現在無職・求職中'].map(v => (
                <Radio key={v} name="q3" value={v} checked={answers.q3 === v} onChange={() => setRadio('q3')(v)} label={v} />
              ))}
            </QuestionBlock>
          </>
        )}

        {/* セクション2 */}
        {section === 1 && (
          <>
            <QuestionBlock label="Q4. クラウドワークスを登録したのはいつ頃ですか？" required error={errors.q4}>
              {['1ヶ月以内', '半年以内', '1年以内', '1年以上前', 'まだ登録していない・覚えていない'].map(v => (
                <Radio key={v} name="q4" value={v} checked={answers.q4 === v} onChange={() => setRadio('q4')(v)} label={v} />
              ))}
            </QuestionBlock>
            <QuestionBlock label="Q5. これまでに副業で収入を得た経験は？" required error={errors.q5}>
              {['まだ一度もない', '月1万円未満', '月1〜5万円', '月5〜10万円', '月10万円以上'].map(v => (
                <Radio key={v} name="q5" value={v} checked={answers.q5 === v} onChange={() => setRadio('q5')(v)} label={v} />
              ))}
            </QuestionBlock>
            <QuestionBlock label="Q6. 副業で主にやっている・やりたい分野は？（複数選択可）" required error={errors.q6 as string | undefined}>
              {['Webライティング・記事作成', '動画編集', 'デザイン・バナー作成', 'データ入力・事務作業', 'プログラミング・Web制作', 'SNS運用・マーケティング', 'まだ決まっていない・わからない'].map(v => (
                <Checkbox key={v} id={`q6-${v}`} checked={answers.q6.includes(v)} onChange={() => toggleCheck('q6')(v)} label={v} />
              ))}
            </QuestionBlock>
          </>
        )}

        {/* セクション3 */}
        {section === 2 && (
          <>
            <QuestionBlock label="Q7. 副業を始めたい・続けたい一番の理由は？" required error={errors.q7}>
              {['収入を増やしたい・生活を楽にしたい', '将来・老後のお金が不安だから', '本業以外のスキルを身につけたい', 'いずれ独立・フリーランスになりたい', '時間や場所に縛られず働きたい'].map(v => (
                <Radio key={v} name="q7" value={v} checked={answers.q7 === v} onChange={() => setRadio('q7')(v)} label={v} />
              ))}
            </QuestionBlock>
            <QuestionBlock label="Q8. 副業で目指したい月収は？" required error={errors.q8}>
              {['月3万円くらい（お小遣い・生活の足し）', '月5〜10万円（しっかりした副収入）', '月10〜30万円（本業並み）', '月30万円以上（独立も視野）', 'まだイメージできていない'].map(v => (
                <Radio key={v} name="q8" value={v} checked={answers.q8 === v} onChange={() => setRadio('q8')(v)} label={v} />
              ))}
            </QuestionBlock>
            <QuestionBlock label="Q9. 副業で今いちばん困っていること・つまずいていることは？（複数選択可）" required error={errors.q9 as string | undefined}>
              {['そもそも何から始めればいいかわからない', '応募しても採用・受注されない', 'ポートフォリオや実績の作り方がわからない', 'プロフィール・提案文の書き方に自信がない', 'どの案件が「優良」か見分けられない', '時間が取れない・続かない', '特に困っていない'].map(v => (
                <Checkbox key={v} id={`q9-${v}`} checked={answers.q9.includes(v)} onChange={() => toggleCheck('q9')(v)} label={v} />
              ))}
            </QuestionBlock>
            <QuestionBlock label='Q10. 「副業の悩みを解決できる情報やサポート」があれば知りたいですか？' required error={errors.q10}>
              {['ぜひ知りたい', '内容によっては知りたい', '今は特に必要ない'].map(v => (
                <Radio key={v} name="q10" value={v} checked={answers.q10 === v} onChange={() => setRadio('q10')(v)} label={v} />
              ))}
            </QuestionBlock>
          </>
        )}

        {/* セクション4 */}
        {section === 3 && (
          <>
            <div
              className="mb-6 p-4 rounded-xl border text-sm text-gray-700 leading-relaxed"
              style={{ backgroundColor: '#F3EEF9', borderColor: '#C5AEE8' }}
            >
              <p className="font-semibold text-gray-900 mb-2">🎁 調査参加特典のご案内</p>
              <p>調査にご協力いただいた方への特典として、以下の資料を無料でお渡ししています。</p>
              <ul className="mt-2 ml-4 list-disc space-y-1">
                <li>『2026年 最頻の副業5選』</li>
                <li>『優良案件の見分け方（保存版）』</li>
              </ul>
              <p className="mt-2">さらにご希望の方には、副業で実際に受注できるようになるための情報や、非公開の案件情報も配信しています。</p>
            </div>
            <QuestionBlock label="Q11. 特典資料の受け取りを希望しますか？" required error={errors.q11}>
              {['受け取りたい', '今回は受け取らない'].map(v => (
                <Radio key={v} name="q11" value={v} checked={answers.q11 === v} onChange={() => setRadio('q11')(v)} label={v} />
              ))}
            </QuestionBlock>
          </>
        )}

        {/* ナビゲーションボタン */}
        <div className="flex gap-3 mt-8">
          {section > 0 && (
            <button
              onClick={back}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 bg-white"
            >
              ← 戻る
            </button>
          )}
          {section < TOTAL - 1 ? (
            <button
              onClick={next}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: ACCENT }}
            >
              次へ →
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={submitting}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: ACCENT }}
            >
              {submitting ? '送信中…' : '送信する'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
