export default function AboutPage() {
  return (
    <section className="about-page">
      <h1 className="section-title">ABOUT</h1>
      <div className="about-grid">
        <div className="about-copy">
          <p className="about-lead">
            I'm Yoshihiko Sato an engineer &amp; AI Ops Manager (Esp, Corporate
            PR &amp; Branding) based in Japan, Tokyo.
          </p>
          <p className="about-body">
            I'm skilled at deeply analyzing existing business processes and
            reimagining them with AI integration to create efficient, AI-powered
            workflows that maximize productivity.
          </p>
          <p className="about-body">
           佐藤善彦と申します。日本・東京を拠点とするエンジニア兼AI Opsマネージャーです（特にコーポレートPR・ブランディングにおけるAI活用が得意です）。
           既存のビジネスプロセスを深く分析し、AI統合によって再構築することで、生産性を最大化する効率的なAI活用ワークフローを創り出すことを得意としています。
          </p>
        </div>
        <div className="about-image" aria-hidden="true" />
      </div>
    </section>
  );
}
