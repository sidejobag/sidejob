const LINE_URL = import.meta.env.VITE_LINE_URL || 'https://line.me'

const STYLES = `
:root {
  --navy: #132b63;
  --navy-dark: #06265a;
  --gold: #d4a62a;
  --green: #05bd48;
  --text: #232323;
  --muted: #5f6875;
  --line: #dfe4ec;
}
* { box-sizing: border-box; }
body { margin: 0; overflow-x: hidden; background: #f4f2ee; color: var(--text); font-family: "Noto Sans JP", "Yu Gothic", Meiryo, sans-serif; }
.sp-only { display: none; }
.lp { width: min(100%, 864px); margin: 0 auto; overflow: hidden; background: linear-gradient(180deg,#fff 0%,#fff 44%,#fbfaf7 100%); box-shadow: 0 18px 50px rgba(20,28,42,.16); }

.hero { position: relative; min-height: 530px; padding: 58px 42px 30px; background: radial-gradient(circle at 13% 10%,rgba(212,166,42,.10),transparent 28%), linear-gradient(180deg,#fff 0%,#fff 84%,#faf7f1 100%); }
.hero::before { content:""; position:absolute; top:-51px; left:82px; width:330px; height:150px; border-top:12px solid rgba(212,166,42,.48); border-radius:50%; transform:rotate(-16deg); }
.hero-photo { position:absolute; top:0; right:0; width:430px; height:356px; background: linear-gradient(90deg,#fff 0%,rgba(255,255,255,.24) 24%,rgba(255,255,255,0) 46%), url("/hero-generated.png") right top/cover no-repeat; }
.script { position:absolute; z-index:2; top:22px; left:22px; margin:0; color:#c59124; font:italic 24px "Segoe Script","Brush Script MT",cursive; transform:rotate(-8deg); }
.ribbon { position:relative; z-index:2; display:inline-block; margin:0 0 20px 6px; padding:9px 30px; clip-path:polygon(4% 0,100% 0,96% 100%,0 100%); background:linear-gradient(90deg,#07306b,#061f4e); color:#fff; font-size:20px; font-weight:800; line-height:1.15; }
.hero-copy { position:relative; z-index:2; max-width:535px; }
.hero h1 { margin:0; font-family:"Noto Serif JP","Yu Mincho",serif; font-size:54px; font-weight:700; line-height:1.28; letter-spacing:0; }
.hero h1 span { display:block; margin-bottom:2px; font-size:35px; font-weight:600; }
.hero h1 strong { color:var(--gold); font-size:1.54em; }
.hero-copy p { margin:17px 0 0; font-size:15px; font-weight:800; }
.free-badge { position:absolute; z-index:3; top:141px; right:238px; width:151px; height:151px; display:grid; place-items:center; align-content:center; border:1px solid var(--gold); border-radius:50%; background:rgba(255,255,255,.95); box-shadow:0 7px 18px rgba(68,50,19,.18); color:var(--navy); text-align:center; font-size:15px; font-weight:800; line-height:1.45; }
.gift-icon { width:26px; height:26px; display:block; object-fit:contain; }
.free-badge strong { font-size:20px; line-height:1.25; }
.hero-cta { position:relative; z-index:4; margin-top:36px; }

.line-button { position:relative; width:min(100%,572px); min-height:78px; margin:0 auto; padding:12px 20px; display:flex; align-items:center; justify-content:center; gap:16px; overflow:hidden; border-radius:999px; background:linear-gradient(180deg,#08cc55,#04a840); box-shadow:0 8px 16px rgba(4,119,49,.28); color:#fff; text-align:center; text-decoration:none; font-size:24px; font-weight:900; line-height:1.25; transition:transform .18s ease; }
.line-button:hover { transform:scale(1.018); }
.line-button::after { content:""; position:absolute; inset:-20% auto -20% -30%; z-index:0; width:24%; background:linear-gradient(110deg,transparent,rgba(255,255,255,.35),transparent); transform:skewX(-18deg); animation:lp-shine 3.8s ease-in-out infinite; }
.line-button > span { position:relative; z-index:1; }
.line-bubble, .button-arrow { flex:0 0 auto; display:grid; place-items:center; border-radius:50%; background:#fff; color:var(--green); font-weight:900; }
.line-bubble { width:52px; height:52px; font-size:15px; }
.button-arrow { width:36px; height:36px; font-size:38px; line-height:1; }
.cta-notes { width:min(100%,560px); margin:17px auto 0; padding:0; display:flex; justify-content:center; gap:30px; color:var(--navy); list-style:none; font-size:14px; font-weight:800; }
.cta-notes li::before { content:""; display:inline-block; width:12px; height:12px; margin-right:8px; border-radius:50%; background:var(--navy); vertical-align:-1px; }

.section { padding:34px 42px; }
.section-title { display:flex; align-items:center; justify-content:center; gap:25px; margin:0 0 24px; color:var(--navy); font-family:"Noto Serif JP","Yu Mincho",serif; font-size:32px; font-weight:600; line-height:1.35; text-align:center; }
.section-title::before, .section-title::after { content:""; width:86px; height:1px; background:var(--navy); opacity:.6; }

.concern-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; align-items:stretch; }
.concern-card { overflow:hidden; display:flex; flex-direction:column; border:1px solid var(--line); border-radius:4px; background:#fff; box-shadow:0 4px 12px rgba(20,40,72,.04); }
.concern-card h3 { min-height:78px; margin:0; padding:13px 10px; display:grid; place-items:center; background:linear-gradient(180deg,#08336f,#06275b); color:#fff; text-align:center; font-size:15px; font-weight:900; line-height:1.45; }
.concern-card img { display:block; width:146px; height:138px; object-fit:contain; margin:10px auto 4px; }
.concern-card ul, .gift-body ul { margin:0; padding:0 18px 18px; list-style:none; font-size:12px; font-weight:800; line-height:1.65; }
.concern-card li, .gift-body li { position:relative; margin-bottom:4px; padding-left:22px; }
.concern-card li { white-space:nowrap; }
.concern-card li::before { content:""; position:absolute; left:0; top:.25em; width:15px; height:15px; border:1px solid var(--navy); border-radius:50%; background:linear-gradient(135deg,transparent 43%,var(--navy) 45% 55%,transparent 57%) 4px 6px/7px 5px no-repeat,#fff; }

.title-gift-icon { width:30px; height:30px; display:inline-block; flex:0 0 25px; object-fit:contain; }
.gift-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:18px; align-items:stretch; }
.gift-card { position:relative; min-height:324px; padding:30px 18px 22px; display:grid; grid-template-columns:118px 1fr; grid-template-rows:auto auto 1fr; column-gap:18px; border:1px solid var(--gold); border-radius:5px; background:#fff; }
.gift-corner { position:absolute; top:0; left:0; width:118px; height:118px; padding:13px 0 0 17px; background:linear-gradient(135deg,#bd8616 0%,#e6c45f 58%,transparent 59%); color:#fff; font-family:"Noto Serif JP","Yu Mincho",serif; font-size:18px; font-weight:700; line-height:1.1; }
.gift-corner strong { font-size:34px; font-weight:700; }
.gift-card > img { grid-column:1; grid-row:1/3; width:118px; height:136px; margin-top:45px; object-fit:cover; border-radius:3px; }
.gift-body { display:contents; }
.gift-body h3 { grid-column:2; grid-row:1; margin:0 0 12px; color:var(--navy); font-family:"Noto Serif JP","Yu Mincho",serif; font-size:20px; font-weight:700; line-height:1.5; }
.gift-body p { grid-column:2; grid-row:2; margin:0; padding-top:13px; border-top:1px solid #e7d8b1; font-size:11px; font-weight:800; line-height:1.9; }
.gift-body ul { grid-column:1/-1; grid-row:3; margin-top:20px; padding:0 0 0 42px; color:var(--navy); font-size:13px; }
.gift-body li::before { content:""; position:absolute; left:1px; top:.45em; width:10px; height:10px; border:1.5px solid var(--gold); border-radius:2px; }

.future { margin:0 42px 36px; overflow:hidden; border:1px solid var(--line); border-radius:5px; background:#fff; }
.future h2 { margin:0; padding:9px 10px; background:linear-gradient(180deg,#07336f,#06275b); color:#fff; text-align:center; font-size:22px; font-weight:900; line-height:1.25; }
.future-grid { display:grid; grid-template-columns:repeat(4,1fr); }
.future-grid article { min-height:147px; display:grid; place-items:center; align-content:center; gap:9px; padding:14px 8px; border-left:1px solid var(--line); text-align:center; }
.future-grid article:first-child { border-left:0; }
.future-grid img { width:88px; height:74px; object-fit:contain; }
.future-grid p { margin:0; font-size:15px; font-weight:900; line-height:1.55; }

.voices { padding-bottom:34px; }
.voice-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; align-items:stretch; }
.voice-grid article { min-height:144px; display:grid; grid-template-columns:76px 1fr; grid-template-rows:auto 1fr; column-gap:12px; row-gap:6px; padding:14px 12px 12px; border:1px solid #d7a43b; border-radius:3px; background:#fff; }
.voice-grid img { grid-column:1; grid-row:1; width:76px; height:88px; object-fit:cover; object-position:center 35%; border-radius:4px; }
.voice-copy { grid-column:2; grid-row:1/3; }
.voice-grid h3 { margin:0 0 6px; color:var(--navy); font-family:"Noto Serif JP","Yu Mincho",serif; font-size:14px; line-height:1.35; min-height:38px; }
.voice-grid p { margin:0 0 5px; font-size:10px; font-weight:800; line-height:1.55; min-height:48px; }
.voice-grid strong { grid-column:1; grid-row:2; justify-self:center; align-self:end; width:100%; text-align:center; font-size:12px; font-weight:900; }

.final-cta { padding:8px 42px 28px; background:linear-gradient(174deg,transparent 0 57%,#062a63 57.2% 100%); text-align:center; }
.final-cta p { margin:0 0 4px; color:var(--navy); font-family:"Noto Serif JP","Yu Mincho",serif; font-size:18px; }
.final-cta h2 { margin:0 0 13px; color:var(--navy); font-family:"Noto Serif JP","Yu Mincho",serif; font-size:31px; line-height:1.2; }
.final-cta .line-button { width:min(100%,496px); min-height:59px; font-size:21px; }
.final-cta .line-bubble { width:43px; height:43px; font-size:12px; }
.final-cta .button-arrow { width:31px; height:31px; font-size:36px; }
.final-cta .cta-notes { margin-top:12px; color:#fff; font-size:12px; }
.final-cta .cta-notes li::before { background:#fff; }

@keyframes lp-shine { 0%,58%{left:-30%} 100%{left:125%} }

.lp img { -webkit-user-select:none; user-select:none; -webkit-touch-callout:none; pointer-events:none; }
.lp { -webkit-user-select:none; user-select:none; }

@media (max-width:720px) {
  .sp-only { display:initial; }
  .hero { min-height:auto; padding:22px 18px 34px; }
  .hero-photo { width:68%; height:300px; opacity:.24; background-position:right top; }
  .script { top:14px; left:18px; font-size:22px; }
  .ribbon { max-width:100%; margin-top:34px; margin-left:0; padding:8px 18px; font-size:16px; }
  .hero h1 { font-size:36px; }
  .hero h1 span { font-size:23px; }
  .hero-copy p { font-size:14px; }
  .free-badge { position:static; width:132px; height:132px; margin:22px auto 0; font-size:13px; }
  .hero-cta { margin-top:24px; }
  .line-button, .final-cta .line-button { width:min(100%,340px); min-height:66px; gap:10px; padding:10px 12px; font-size:16px; }
  .line-bubble, .final-cta .line-bubble { width:44px; height:44px; font-size:12px; }
  .button-arrow, .final-cta .button-arrow { width:31px; height:31px; font-size:34px; }
  .cta-notes, .final-cta .cta-notes { width:min(100%,340px); display:grid; grid-template-columns:1fr; justify-items:start; gap:4px; font-size:11px; }
  .section { padding:32px 18px 34px; }
  .section-title { gap:12px; padding:0 6px; font-size:22px; line-height:1.4; flex-wrap:wrap; }
  .section-title::before, .section-title::after { width:22px; flex:0 0 22px; }
  .concern-grid, .gift-grid, .voice-grid { grid-template-columns:1fr; gap:18px; }
  .concern-card, .gift-card, .voice-grid article { width:100%; max-width:430px; margin:0 auto; }
  .concern-card { max-width:320px; }
  .concern-card h3 { min-height:auto; padding:14px 12px; font-size:16px; }
  .concern-card img { width:168px; height:150px; }
  .gift-card { min-height:auto; display:block; padding:82px 20px 22px; }
  .gift-card > img { display:block; position:static; width:150px; height:112px; margin:0 auto 16px; transform:none; }
  .gift-body { display:block; }
  .gift-body h3 { text-align:center; font-size:21px; }
  .gift-body p { margin-top:14px; padding-top:14px; font-size:12px; }
  .gift-body ul { margin-top:18px; padding-left:18px; }
  .future { margin:0 18px 34px; }
  .future-grid { grid-template-columns:1fr; }
  .future-grid article { min-height:128px; border-left:0; }
  .future-grid article + article { border-top:1px solid var(--line); }
  .voice-grid article { grid-template-columns:82px 1fr; max-width:430px; margin:0 auto; }
  .voice-grid img { width:82px; height:92px; }
  .final-cta { padding:8px 18px 28px; }
  .final-cta h2 { font-size:25px; }
}
`

function LineButton({ label }: { label: string }) {
  return (
    <a className="line-button" href={LINE_URL}>
      <span className="line-bubble">LINE</span>
      <span dangerouslySetInnerHTML={{ __html: label }} />
      <span className="button-arrow">&rsaquo;</span>
    </a>
  )
}

export default function LandingPage() {
  return (
    <div style={{ background: '#f4f2ee', minHeight: '100vh' }}>
      <style>{STYLES}</style>
      <main className="lp" onContextMenu={e => e.preventDefault()}>

        {/* ヒーロー */}
        <section className="hero">
          <div className="hero-photo" aria-hidden="true" />
          <p className="script">thank you!</p>
          <p className="ribbon">アンケート回答ありがとうございました</p>
          <div className="hero-copy">
            <h1>
              <span>お礼に副業攻略に欠かせない</span>
              <strong>豪華特典</strong>を<br />
              配布中です
            </h1>
            <p>副業を始めたいあなたの「最初の一歩」をサポートします。</p>
          </div>
          <div className="free-badge">
            <img className="gift-icon" src="/icon-gift.svg" alt="" />
            <span>今だけ！</span>
            <strong>完全無料で</strong>
            <span>受け取れます</span>
          </div>
          <div className="hero-cta">
            <LineButton label="今すぐLINE登録して<br class='sp-only' />完了報告する" />
            <ul className="cta-notes">
              <li>登録は1分で完了</li>
              <li>いつでもブロックOK</li>
              <li>個人情報の登録不要</li>
            </ul>
          </div>
        </section>

        {/* お悩み */}
        <section className="section concerns">
          <h2 className="section-title">こんなお悩みはありませんか？</h2>
          <div className="concern-grid">
            {[
              { title: '副業をしたいけど<br />何から始めるか<br class="sp-only" />迷っている人', img: '/concern-generated-1.png', items: ['選択肢が多く選べない', '合う副業がわからない', '始め方に迷っている'] },
              { title: '案件が取れずに<br />低単価作業から<br class="sp-only" />抜け出したい人', img: '/concern-generated-2.png', items: ['単価が低く時間がない', '案件の取り方が不明', 'スキルに自信がない'] },
              { title: '高単価案件に<br />挑戦したい人', img: '/concern-generated-3.png', items: ['収入をもっと伸ばしたい', '高単価案件を取りたい', '優良顧客と出会いたい'] },
            ].map((c, i) => (
              <article key={i} className="concern-card">
                <h3 dangerouslySetInnerHTML={{ __html: c.title }} />
                <img src={c.img} alt="" />
                <ul>{c.items.map(item => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        {/* 特典 */}
        <section className="section gifts">
          <h2 className="section-title">
            <img className="title-gift-icon" src="/icon-gift.svg" alt="" />
            今だけの豪華プレゼント
          </h2>
          <div className="gift-grid">
            <article className="gift-card">
              <div className="gift-corner">特典<br /><strong>01</strong></div>
              <img src="/gift-generated-1.png" alt="" />
              <div className="gift-body">
                <h3>2026年最新！<br />未経験から始められる<br />最強の副業5選</h3>
                <p>初心者でも始めやすく、将来性が高い副業を厳選！必要なスキル・収益目安・始め方までわかりやすくまとめました。</p>
                <ul>
                  <li>未経験OKの副業だけを厳選</li>
                  <li>収益の目安や特徴を徹底比較</li>
                  <li>今日から行動に移せる具体ステップ付き</li>
                </ul>
              </div>
            </article>
            <article className="gift-card">
              <div className="gift-corner">特典<br /><strong>02</strong></div>
              <img src="/gift-generated-2.png" alt="" />
              <div className="gift-body">
                <h3>優良なクライアントの<br />見つけ方</h3>
                <p>継続して高単価で仕事をもらえる人だけが知っているクライアントの見極め方を公開！失敗しない案件選びができるようになります。</p>
                <ul>
                  <li>優良クライアントの特徴とは？</li>
                  <li>避けるべきクライアントの見分け方</li>
                  <li>信頼されて継続依頼をもらうコツ</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* 未来 */}
        <section className="future">
          <h2>受け取ることで得られる未来</h2>
          <div className="future-grid">
            {[
              { img: '/future-generated-1.png', text: '自分に合った副業が\n見つかり収入UP！' },
              { img: '/future-generated-2.png', text: '優良クライアントと\n出会える！' },
              { img: '/future-generated-3.png', text: '低単価の作業から\n抜け出せる！' },
              { img: '/future-generated-4.png', text: '在宅で自由な働き方が\n実現できる！' },
            ].map((f, i) => (
              <article key={i}>
                <img src={f.img} alt="" />
                <p style={{ whiteSpace: 'pre-line' }}>{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 声 */}
        <section className="section voices">
          <h2 className="section-title">受け取った方の声（一部）</h2>
          <div className="voice-grid">
            {[
              { img: '/voice-generated-1.png', title: '自分に合う副業が\n見つかりました！', body: '特典を参考に行動したら、自分に合う副業が見つかり初月から収益が出ました！', meta: '20代 女性' },
              { img: '/voice-generated-2.png', title: '低単価の作業から\n抜け出せました！', body: '見極め方を学んでから継続案件が取れるようになり、収入が大きく変わりました！', meta: '30代 男性' },
              { img: '/voice-generated-3.png', title: '在宅で月10万円を\n達成できました！', body: '未経験でも始め方がわかり、在宅で月10万円以上を安定して続けています！', meta: '30代 女性' },
            ].map((v, i) => (
              <article key={i}>
                <img src={v.img} alt="" />
                <div className="voice-copy">
                  <h3 style={{ whiteSpace: 'pre-line' }}>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
                <strong className="voice-meta">{v.meta}</strong>
              </article>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <p>無料で受け取れるのは今だけ！</p>
          <h2>今すぐLINE登録して特典を受け取ろう</h2>
          <LineButton label="今すぐLINE登録して<br class='sp-only' />完了報告する" />
          <ul className="cta-notes">
            <li>登録は1分で完了</li>
            <li>いつでもブロックOK</li>
            <li>個人情報の登録不要</li>
          </ul>
        </section>

      </main>
    </div>
  )
}
