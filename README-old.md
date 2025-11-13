# Telegraph Markdown API (Fresh + Deno)

API ringan berbasis [Fresh](https://fresh.deno.dev) untuk mempublikasikan konten
Markdown ke [Telegra.ph](https://telegra.ph) menggunakan library
[`dcdunkan/telegraph`](https://github.com/dcdunkan/telegraph).

## Persiapan

1. **Salin variabel lingkungan**
   ```bash
   cp .env.example .env
   ```
2. **Isi `.env`** dengan kredensial Anda:
   - `BASIC_AUTH_USERNAME` & `BASIC_AUTH_PASSWORD`: digunakan untuk Basic Auth
     di endpoint API.
   - `TELEGRAPH_TOKEN`: access token Telegraph yang bisa dibuat lewat Bot
     @telegraph.

## Docker compose

### compose

Buat file `compose.yml`

```compose.yml
services:
  apitelegraph:
    image: banghasan/api-telegraph
    container_name: apitelegraph
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "8000:8000"
    networks:
      - hasanNet
      
networks:
  hasanNet:
    external: true
```

### env

Buat file .env 

```.env
BASIC_AUTH_USERNAME=superuser
BASIC_AUTH_PASSWORD=superpass
TELEGRAPH_TOKEN=your_telegraph_access_token
```

## Menjalankan

```bash
deno task dev   # mode pengembangan dengan auto-reload
deno task start # menjalankan server produksi
```

Server default berjalan di `http://localhost:8000`.

### Docker

```bash
docker build -t banghasan/api-telegraph .
docker run --rm -p 8000:8000 --env-file .env banghasan/api-telegraph
```

Atau gunakan `docker-compose`:

```bash
docker compose up --build
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
