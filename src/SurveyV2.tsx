import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

const ACCENT = '#673AB7'
const TINT = 'rgba(103,58,183,0.08)'
const LINE_URL = import.meta.env.VITE_LINE_URL || 'https://line.me'
const MIN_CHARS = 20
const TOTAL = 6

type Answers = {
  consent: boolean
  cw: string
  q1: string
  q2: string
  q3: string
  q4: string
  q5: string
  f1: string
  q6: string[]
  q7: string
  q8: string
  f2: string
  q9: string[]
  f3: string
  q10: string
  q11: string
}

const initial: Answers = {
  consent: false, cw: '',
  q1: '', q2: '', q3: '',
  q4: '', q5: '', f1: '', q6: [],
  q7: '', q8: '', f2: '', q9: [], f3: '', q10: '',
  q11: '',
}

// ---- 共通コンポーネント ----

function Radio({ name, value, checked, onChange, label }: {
  name: string; value: string; checked: boolean; onChange: () => void; label: string
}) {
  return (
    <label className="flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors mb-2"
      style={{ borderColor: checked ? ACCENT : '#E5E7EB', backgroundColor: checked ? TINT : undefined }}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span className="w-4.5 h-4.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
        style={{ borderColor: checked ? ACCENT : '#D1D5DB', width: 18, height: 18 }}>
        {checked && <span className="rounded-full" style={{ width: 9, height: 9, backgroundColor: ACCENT }} />}
      </span>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
}

function Checkbox({ id, checked, onChange, label }: {
  id: string; checked: boolean; onChange: () => void; label: string
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors mb-2"
      style={{ borderColor: checked ? ACCENT : '#E5E7EB', backgroundColor: checked ? TINT : undefined }}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} className="sr-only" />
      <span className="rounded flex-shrink-0 flex items-center justify-center border-2"
        style={{ width: 18, height: 18, borderColor: checked ? ACCENT : '#D1D5DB', backgroundColor: checked ? ACCENT : undefined }}>
        {checked && (
          <svg className="text-white" width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
}

function QLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <p className="text-sm font-medium text-gray-800 mt-5 mb-2">
      {text}
      {required
        ? <span className="ml-1 text-red-500 text-xs">*必須</span>
        : <span className="ml-1 text-gray-400 text-xs">任意</span>}
    </p>
  )
}

function FreeTextArea({ value, onChange, label, placeholder, required }: {
  value: string; onChange: (v: string) => void; label: string; placeholder: string; required: boolean
}) {
  const len = value.trim().length
  const isBad = value.trim().length > 0 && len < MIN_CHARS
  const counterColor = len >= MIN_CHARS ? ACCENT : isBad ? '#EF4444' : '#9CA3AF'

  return (
    <div className="mt-5">
      <p className="text-sm font-medium text-gray-800 mb-1">
        {label}
        {required
          ? <span className="ml-1 text-red-500 text-xs">*必須</span>
          : <span className="ml-1 text-gray-400 text-xs">任意</span>}
      </p>
      <p className="text-xs text-gray-400 mb-2">
        {required ? 'できるだけ具体的に（20文字以上）' : '書く場合は20文字以上でお願いします'}
      </p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2.5 rounded-lg border text-sm text-gray-800 outline-none resize-y"
        style={{ borderColor: isBad ? '#EF4444' : '#E5E7EB' }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-red-500">
          {isBad ? 'もう少し具体的に、20文字以上で教えてください' : ' '}
        </span>
        <span className="text-xs" style={{ color: counterColor }}>{len} / {MIN_CHARS}文字</span>
      </div>
    </div>
  )
}

function SectionHeader({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="mb-2">
      <p className="text-xs font-medium mb-1.5" style={{ color: ACCENT }}>{step}</p>
      <p className="text-base font-semibold text-gray-900 mb-2 leading-snug">{title}</p>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}

// ---- サンクスページ ----

function ThanksPage({ wantsGift }: { wantsGift: boolean }) {
  const [count, setCount] = useState(5)
  useEffect(() => {
    const t = setInterval(() => {
      setCount(c => {
        if (c <= 1) { clearInterval(t); window.location.href = LINE_URL }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(t)
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
            <p className="text-sm text-gray-500 mb-6">診断結果と特典をLINEでお届けします。<br />下のQRコードから友だち追加してください。</p>
          ) : (
            <p className="text-sm text-gray-500 mb-6">調査へのご協力、ありがとうございました。<br />もし気が向いたときは、LINEでも情報を発信しています。</p>
          )}
          <div className="flex justify-center mb-6">
            <div className="p-3 border-2 border-gray-100 rounded-xl inline-block">
              <QRCodeSVG value={LINE_URL} size={180} />
            </div>
          </div>
          <a href={LINE_URL}
            className="block w-full py-3 rounded-xl text-sm font-semibold text-white mb-4"
            style={{ backgroundColor: '#06C755' }}>
            {wantsGift ? 'LINEで友だち追加する' : 'LINEを見てみる'}
          </a>
          <p className="text-xs text-gray-400">{count}秒後に自動で移動します…</p>
        </div>
      </div>
    </div>
  )
}

// ---- メイン ----

export default function SurveyV2() {
  const [section, setSection] = useState(0)
  const [answers, setAnswers] = useState<Answers>(initial)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth' })

  const set = (key: keyof Answers) => (val: string) => setAnswers(a => ({ ...a, [key]: val }))
  const toggle = (key: 'q6' | 'q9') => (val: string) =>
    setAnswers(a => {
      const cur = a[key] as string[]
      return { ...a, [key]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] }
    })

  const showErr = (msg: string) => { setError(msg); topRef.current?.scrollIntoView({ behavior: 'smooth' }) }
  const clearErr = () => setError('')

  const validate = (): boolean => {
    if (section === 0) {
      if (!answers.consent) { showErr('同意のチェックをしてから進んでください'); return false }
    }
    if (section === 1) {
      if (!answers.cw.trim()) { showErr('ユーザー名を入力してください'); return false }
      if (!answers.q1) { showErr('Q1を選択してください'); return false }
      if (!answers.q2) { showErr('Q2を選択してください'); return false }
      if (!answers.q3) { showErr('Q3を選択してください'); return false }
    }
    if (section === 2) {
      if (!answers.q4) { showErr('Q4を選択してください'); return false }
      if (!answers.q5) { showErr('Q5を選択してください'); return false }
      if (answers.f1.trim().length < MIN_CHARS) { showErr('Q6は20文字以上で入力してください'); return false }
      if (answers.q6.length === 0) { showErr('Q7を1つ以上選択してください'); return false }
    }
    if (section === 3) {
      if (!answers.q7) { showErr('Q8を選択してください'); return false }
      if (!answers.q8) { showErr('Q9を選択してください'); return false }
      if (answers.f2.trim().length < MIN_CHARS) { showErr('Q10は20文字以上で入力してください'); return false }
      if (answers.q9.length === 0) { showErr('Q11を1つ以上選択してください'); return false }
      if (answers.f3.trim().length < MIN_CHARS) { showErr('Q12は20文字以上で入力してください'); return false }
      if (!answers.q10) { showErr('Q13を選択してください'); return false }
    }
    if (section === 5) {
      if (!answers.q11) { showErr('Q14を選択してください'); return false }
    }
    return true
  }

  const next = () => {
    if (!validate()) return
    clearErr()
    setSection(s => s + 1)
    scrollTop()
  }

  const back = () => {
    clearErr()
    setSection(s => s - 1)
    scrollTop()
  }

  const submit = () => {
    if (!validate()) return
    setSubmitting(true)
    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...answers, _version: 'v2' }),
    }).catch(() => {})
    setDone(true)
  }

  if (done) return <ThanksPage wantsGift={answers.q11 === '受け取りたい'} />

  const progress = ((section + 1) / TOTAL) * 100

  return (
    <div className="min-h-screen bg-gray-50" ref={topRef}>
      {/* プログレスバー */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3 max-w-xl mx-auto">
          <span className="text-xs text-gray-400 whitespace-nowrap">{section + 1} / {TOTAL}</span>
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, backgroundColor: ACCENT }} />
          </div>
        </div>
      </div>

      <div className="pt-14 pb-10 px-4 max-w-xl mx-auto">
        <div className="mt-5" />

        {/* エラー表示 */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        {/* セクション0：同意 */}
        {section === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader
              step="はじめにお読みください（重要）"
              title="副業タイプ診断〈2026年版〉"
              desc="いくつかの質問にお答えいただくと、あなたに合った副業の方向性と、いま伸ばすべきポイントを診断します。回答内容は1件ずつ確認のうえ、承認・謝礼のお支払いを行います。"
            />
            <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 mb-4">
              <p className="text-xs font-semibold text-red-600 mb-2">⚠️ 謝礼をお支払いできない場合があります</p>
              <ul className="text-xs text-red-500 space-y-1 leading-relaxed">
                <li>・すべての設問で同じ選択肢が選ばれている回答</li>
                <li>・記述式が空欄、または意味をなさない文字列（「あ」「123」など）</li>
                <li>・明らかに内容を読まずに送信されたと判断できる回答</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 mb-5 text-xs text-gray-500 leading-relaxed">
              内容を確認し、適切と判断したご回答にはすべて謝礼をお支払いします。所要時間は約3分。診断結果は最後にLINEでお受け取りいただけます。
            </div>
            <label className="flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer"
              style={{ borderColor: answers.consent ? ACCENT : '#E5E7EB', backgroundColor: answers.consent ? TINT : undefined }}>
              <span className="rounded flex-shrink-0 flex items-center justify-center border-2"
                style={{ width: 20, height: 20, borderColor: answers.consent ? ACCENT : '#D1D5DB', backgroundColor: answers.consent ? ACCENT : undefined }}>
                {answers.consent && (
                  <svg className="text-white" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <input type="checkbox" className="sr-only" checked={answers.consent}
                onChange={() => setAnswers(a => ({ ...a, consent: !a.consent }))} />
              <span className="text-sm font-medium text-gray-800">上記の内容を理解し、丁寧に回答することに同意します</span>
            </label>
          </div>
        )}

        {/* セクション1：基本情報 */}
        {section === 1 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader step="STEP 1 / 5　あなたについて" title="まずは基本情報から" desc="答えやすい質問から始めます。" />
            <QLabel text="クラウドワークスのユーザー名" required />
            <input type="text" placeholder="例：yamada_taro" value={answers.cw}
              onChange={e => setAnswers(a => ({ ...a, cw: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg border text-sm text-gray-800 outline-none"
              style={{ borderColor: '#E5E7EB' }} />
            <QLabel text="Q1. 年代" required />
            {['10代', '20代', '30代', '40代', '50代以上'].map(v => (
              <Radio key={v} name="q1" value={v} checked={answers.q1 === v} onChange={() => set('q1')(v)} label={v} />
            ))}
            <QLabel text="Q2. 性別" required />
            {['男性', '女性', '回答しない'].map(v => (
              <Radio key={v} name="q2" value={v} checked={answers.q2 === v} onChange={() => set('q2')(v)} label={v} />
            ))}
            <QLabel text="Q3. 現在のお仕事の状況" required />
            {['会社員（正社員）', '会社員（契約・派遣・パート）', '自営業・フリーランス', '学生', '主婦・主夫', '現在無職・求職中'].map(v => (
              <Radio key={v} name="q3" value={v} checked={answers.q3 === v} onChange={() => set('q3')(v)} label={v} />
            ))}
          </div>
        )}

        {/* セクション2：現状 */}
        {section === 2 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader step="STEP 2 / 5　いまの現状" title="あなたの副業の現状" desc="正直なところをそのままお答えください。" />
            <QLabel text="Q4. クラウドワークスを登録したのはいつ頃ですか？" required />
            {['1ヶ月以内', '半年以内', '1年以内', '1年以上前', 'まだ登録していない・覚えていない'].map(v => (
              <Radio key={v} name="q4" value={v} checked={answers.q4 === v} onChange={() => set('q4')(v)} label={v} />
            ))}
            <QLabel text="Q5. これまでに副業で収入を得た経験は？" required />
            {['まだ一度もない', '月1万円未満', '月1〜5万円', '月5〜10万円', '月10万円以上'].map(v => (
              <Radio key={v} name="q5" value={v} checked={answers.q5 === v} onChange={() => set('q5')(v)} label={v} />
            ))}
            <FreeTextArea
              key="f1" value={answers.f1} onChange={v => setAnswers(a => ({ ...a, f1: v }))} required={true}
              label="Q6. いまの副業収入について、正直どう感じていますか？"
              placeholder="例：思ったより全然稼げていなくて、このままで大丈夫かと不安です"
            />
            <QLabel text="Q7. 副業で主にやっている・やりたい分野は？（複数選択可）" required />
            {['Webライティング・記事作成', '動画編集', 'デザイン・バナー作成', 'データ入力・事務作業', 'プログラミング・Web制作', 'SNS運用・マーケティング', 'まだ決まっていない・わからない'].map(v => (
              <Checkbox key={v} id={`q6-${v}`} checked={answers.q6.includes(v)} onChange={() => toggle('q6')(v)} label={v} />
            ))}
          </div>
        )}

        {/* セクション3：理想と課題 */}
        {section === 3 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader step="STEP 3 / 5　理想と課題" title="副業に対する思い・理想" desc="普段は言葉にしないことかもしれませんが、整理するきっかけになれば幸いです。" />
            <QLabel text="Q8. 副業を始めたい・続けたい一番の理由は？" required />
            {['収入を増やしたい・生活を楽にしたい', '将来・老後のお金が不安だから', '本業以外のスキルを身につけたい', 'いずれ独立・フリーランスになりたい', '時間や場所に縛られず働きたい'].map(v => (
              <Radio key={v} name="q7" value={v} checked={answers.q7 === v} onChange={() => set('q7')(v)} label={v} />
            ))}
            <QLabel text="Q9. 副業で目指したい月収は？" required />
            {['月3万円くらい（お小遣い・生活の足し）', '月5〜10万円（しっかりした副収入）', '月10〜30万円（本業並み）', '月30万円以上（独立も視野）', 'まだイメージできていない'].map(v => (
              <Radio key={v} name="q8" value={v} checked={answers.q8 === v} onChange={() => set('q8')(v)} label={v} />
            ))}
            <FreeTextArea
              key="f2" value={answers.f2} onChange={v => setAnswers(a => ({ ...a, f2: v }))} required={true}
              label="Q10. その金額を稼げるようになったら、生活や気持ちはどう変わりそうですか？"
              placeholder="例：お金の不安が減って、家族との時間や自分の趣味にも使えそうです"
            />
            <QLabel text="Q11. 副業で今いちばん困っていること・つまずいていることは？（複数選択可）" required />
            {['そもそも何から始めればいいかわからない', '応募しても採用・受注されない', 'ポートフォリオや実績の作り方がわからない', 'プロフィール・提案文の書き方に自信がない', 'どの案件が「優良」か見分けられない', '時間が取れない・続かない', '特に困っていない'].map(v => (
              <Checkbox key={v} id={`q9-${v}`} checked={answers.q9.includes(v)} onChange={() => toggle('q9')(v)} label={v} />
            ))}
            <FreeTextArea
              key="f3" value={answers.f3} onChange={v => setAnswers(a => ({ ...a, f3: v }))} required={true}
              label="Q12. 理想の収入に届いていない一番の原因は、何だと思いますか？"
              placeholder="例：正しいやり方が分からないまま、なんとなく続けてしまっている気がします"
            />
            <QLabel text='Q13.「副業の悩みを解決できる情報やサポート」があれば知りたいですか？' required />
            {['ぜひ知りたい', '内容によっては知りたい', '今は特に必要ない'].map(v => (
              <Radio key={v} name="q10" value={v} checked={answers.q10 === v} onChange={() => set('q10')(v)} label={v} />
            ))}
          </div>
        )}

        {/* セクション4：振り返り */}
        {section === 4 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader
              step="STEP 4 / 5　回答の振り返り"
              title="あなたの回答を整理しました"
              desc="ここまでお答えいただいた内容です。あなたの副業タイプ診断は、この回答をもとに作成されます。"
            />
            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 divide-y divide-gray-100">
              {[
                { icon: '😔', label: 'いまの現状', val: answers.f1.trim() },
                { icon: '🎯', label: '理想の未来', val: answers.f2.trim() },
                { icon: '🔑', label: '届かない原因', val: answers.f3.trim() },
              ].map(r => (
                <div key={r.label} className="flex gap-3 px-4 py-3">
                  <span className="text-lg mt-0.5">{r.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{r.label}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {r.val || <span className="text-gray-400">（未記入）</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-lg border text-xs text-gray-500 leading-relaxed"
              style={{ backgroundColor: TINT, borderColor: 'rgba(103,58,183,0.3)' }}>
              あなたが書いてくれた「届かない原因」を解消する具体的な方法を、診断結果とあわせて次のページのLINEでお渡しします。
            </div>
          </div>
        )}

        {/* セクション5：LINE誘導 */}
        {section === 5 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <SectionHeader
              step="STEP 5 / 5　診断結果の受け取り"
              title="診断結果が完成しました"
              desc="あなたの回答をもとにした副業タイプ診断と、課題に合わせた特典をLINEでお届けします。"
            />
            <div className="mt-4 p-4 rounded-lg border mb-2"
              style={{ backgroundColor: TINT, borderColor: 'rgba(103,58,183,0.3)' }}>
              <p className="text-sm font-medium text-gray-900 mb-2">LINEで受け取れるもの</p>
              <ul className="text-xs text-gray-600 space-y-1 leading-relaxed">
                <li>・あなたの副業タイプ診断結果</li>
                <li>・『2026年 最頻の副業5選』</li>
                <li>・『優良案件の見分け方（保存版）』</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">友だち追加後、すぐにお受け取りいただけます。</p>
            </div>
            <QLabel text="Q14. 診断結果・特典の受け取りを希望しますか？" required />
            {['受け取りたい', '今回は受け取らない'].map(v => (
              <Radio key={v} name="q11" value={v} checked={answers.q11 === v} onChange={() => set('q11')(v)} label={v} />
            ))}
          </div>
        )}

        {/* ナビゲーション */}
        <div className="flex gap-3 mt-6">
          {section > 0 && (
            <button onClick={back}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 bg-white">
              ← 戻る
            </button>
          )}
          {section === 0 && (
            <button onClick={next} disabled={!answers.consent}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40"
              style={{ backgroundColor: ACCENT }}>
              診断を始める →
            </button>
          )}
          {section > 0 && section < TOTAL - 1 && (
            <button onClick={next}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: ACCENT }}>
              {section === 4 ? '結果を受け取る →' : '次へ →'}
            </button>
          )}
          {section === TOTAL - 1 && (
            <button onClick={submit} disabled={submitting}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: ACCENT }}>
              {submitting ? '送信中…' : '送信して結果を受け取る'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
