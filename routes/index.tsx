import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Telegraph API Gateway</title>
      </Head>
      <main class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 class="text-3xl font-semibold">Telegraph Markdown Publisher API</h1>
        <p class="max-w-xl text-slate-300">
          Gunakan endpoint <code>/api/telegraph</code>{" "}
          untuk mempublikasikan konten Markdown ke Telegra.ph melalui Fresh +
          Deno. Lihat <code>README.md</code>{" "}
          untuk instruksi lengkap &amp; contoh{" "}
          <code>
            curl
          </code>.
        </p>
      </main>
    </>
  );
}
