import { Head } from "$fresh/runtime.ts";

const rows = [
  { label: "Endpoint", value: "POST /api/telegraph" },
  { label: "Auth", value: "Basic (username & password dari .env)" },
  { label: "Body wajib", value: "`title`, `content`" },
  {
    label: "Opsional",
    value: "`authorName`, `authorUrl`, `format`, `returnContent`",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Microservice API Telegra.ph</title>
        <style>
          {`
          :root {
            color-scheme: dark;
            font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          }
          body {
            margin: 0;
            background: radial-gradient(circle at top, #1f2937, #0f172a 65%);
            color: #f8fafc;
          }
          main {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            max-width: 960px;
            margin: 0 auto;
            padding: 4rem 1.5rem 3rem;
          }
          .card {
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 30px 60px rgba(15, 23, 42, 0.65);
          }
          h1 {
            font-size: clamp(2rem, 4vw, 3.2rem);
            margin-bottom: 0.4rem;
          }
          h2 {
            margin-top: 0;
            font-size: 1.35rem;
          }
          .muted {
            color: #cbd5f5;
            line-height: 1.7;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
          }
          .stat {
            padding: 1rem 1.25rem;
            border-radius: 0.9rem;
            background: rgba(148, 163, 184, 0.08);
            border: 1px solid rgba(148, 163, 184, 0.12);
          }
          .stat span {
            display: block;
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #94a3b8;
            margin-bottom: 0.35rem;
          }
          ol {
            margin: 1.1rem 0 0;
            padding-left: 1.1rem;
          }
          code {
            background: rgba(15, 118, 110, 0.22);
            padding: 0.15rem 0.4rem;
            border-radius: 0.35rem;
            font-size: 0.92rem;
            color: #5eead4;
          }
          pre {
            white-space: pre-wrap;
            margin: 0;
          }
          .snippet {
            background: rgba(15, 15, 30, 0.8);
            border: 1px solid rgba(94, 234, 212, 0.3);
            border-radius: 0.9rem;
            padding: 1rem;
            font-size: 0.95rem;
            color: #e2e8f0;
          }
          .footer {
            text-align: center;
            color: #94a3b8;
            font-size: 0.9rem;
          }
        `}
        </style>
      </Head>
      <main>
        <section class="card">
          <p class="muted">Microservice API Telegra.ph</p>
          <h1>Telegraph Publisher API</h1>
          <p class="muted">
            Endpoint aman untuk mempublikasikan Markdown/HTML ke Telegra.ph
            menggunakan token Telegraph. Validasi Basic Auth, parsing, dan
            respons URL halaman semua tertangani di sini.
          </p>
        </section>

        <section class="card">
          <h2>compose.yml</h2>
          <div class="snippet">
            <pre>{`services:
  apitelegraph:
    image: banghasan/api-telegraph
    container_name: apitelegraph
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "8000:8000"`}</pre>
          </div>
        </section>

        <section class="card">
          <h2>File .env</h2>
          <div class="snippet">
            <pre>{`BASIC_AUTH_USERNAME=superuser
BASIC_AUTH_PASSWORD=superpass
TELEGRAPH_TOKEN=your_telegraph_access_token`}</pre>
          </div>
        </section>

        <section class="card">
          <h2>Telegraph Token</h2>
          <p class="muted">
            Bisa didapatkan cepat via <code>curl</code> sesuai{" "}
            <a href="https://telegra.ph/api#createAccount">Telegra.ph API</a>.
          </p>
          <div class="snippet">
            <pre>{`curl "https://api.telegra.ph/createAccount?short_name=botIndonesia&author_name=Anonymous"`}</pre>
          </div>
        </section>

        <section class="card">
          <h2>Menjalankan</h2>
          <div class="snippet">
            <pre>docker compose up -d</pre>
          </div>
        </section>

        <section class="card">
          <h2>Detail Endpoint</h2>
          <div class="grid">
            {rows.map((row) => (
              <article class="stat">
                <span>{row.label}</span>
                <div>{row.value}</div>
              </article>
            ))}
          </div>
        </section>

        <section class="card">
          <h2>Contoh curl</h2>
          <div class="snippet">
            <pre>{`curl -X POST http://localhost:8000/api/telegraph \\
  -u "superuser:superpass" \\
  -H "Content-Type: application/json" \\
  -d '{ "title": "Contoh Artikel", "content": "# Halo \\n Konten **Markdown**" }'`}</pre>
          </div>
          <p class="muted" style="margin-top: 0.9rem;">
            Dokumentasi lengkap ada pada{" "}
            <a href="https://github.com/banghasan/api-telegraph">
              Github Repository
            </a>{" "}
            ini
          </p>
        </section>

        <p class="footer">
          (c) 2025 <a href="https://banghasan.com">bangHasan.com</a>
          <br /> Diskusi dan support di{" "}
          <a href="https://t.me/botindonesia">Telegram Bot Indonesia</a>
        </p>
      </main>
    </>
  );
}
