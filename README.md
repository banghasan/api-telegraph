# Microservice API Telegra.ph

Microservice API ringan berbasis untuk mempublikasikan tulisan atau artikel atau konten
berbasis Markdown atau HTML ke [Telegra.ph](https://telegra.ph).

## Quick Install

### compose.yml

```
services:
  apitelegraph:
    image: banghasan/api-telegraph
    container_name: apitelegraph
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "8000:8000"
```

### File .env

```
BASIC_AUTH_USERNAME=superuser
BASIC_AUTH_PASSWORD=superpass
TELEGRAPH_TOKEN=your_telegraph_access_token
```

### Telegprah Token

Bisa didapatkan mudah dengan curl

```sh
curl https://api.telegra.ph/createAccount?short_name=botIndonesia&author_name=Anonymous
```

Sesuai [Telegra.ph Api](https://telegra.ph/api#createAccount)

### Menjalankan

```
docker compose up -d
```

## Endpoint

- `POST /api/telegraph` – membuat halaman baru di Telegra.ph dari konten
  Markdown/HTML.
- `GET /api/telegraph` – menampilkan contoh payload (untuk inspeksi cepat).

### Body JSON

| Field           | Tipe    | Wajib | Keterangan                                    |
| --------------- | ------- | ----- | --------------------------------------------- |
| `title`         | string  | ✅    | Judul halaman Telegra.ph                      |
| `content`       | string  | ✅    | Konten dalam Markdown (default) atau HTML     |
| `authorName`    | string  | ❌    | Nama penulis yang tampil di bawah judul       |
| `authorUrl`     | string  | ❌    | URL profil penulis                            |
| `format`        | string  | ❌    | `markdown` (default) atau `html`              |
| `returnContent` | boolean | ❌    | Minta agar konten dikembalikan oleh Telegraph |

Tambahkan header `Authorization: Basic base64(username:password)` sesuai isian
`.env`.

## Contoh `curl`

```bash
curl -X POST http://localhost:8000/api/telegraph \
  -u "superuser:superpass" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Contoh Artikel",
    "content": "# Halo Telegraph\nKonten **Markdown** pertama saya.",
    "authorName": "Codex Bot",
    "authorUrl": "https://t.me/username",
    "format": "markdown"
  }'
```

Respons sukses:

```json
{
  "ok": true,
  "result": {
    "path": "Contoh-Artikel-07-01",
    "...": "field lain dari API Telegraph"
  },
  "url": "https://telegra.ph/Contoh-Artikel-07-01"
}
```

Silakan sesuaikan data di atas sesuai kebutuhan Anda. Pastikan token Telegraph
memiliki izin membuat halaman.

## Komunitas

Diskusi dan support di [Bot Telegram Indonesia](https://t.me/botindonesia)
