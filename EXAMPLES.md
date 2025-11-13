# Contoh `curl` Publikasi Telegraph

Gunakan contoh di bawah ini untuk mencoba berbagai skenario pemanggilan `POST /api/telegraph`. Pastikan:

```bash
export BASE_URL="http://localhost:8000"
export BASIC_USER="superuser"
export BASIC_PASS="superpass"
```

## 1. Artikel Markdown Panjang

```bash
curl -X POST "$BASE_URL/api/telegraph" \
  -u "$BASIC_USER:$BASIC_PASS" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Belajar Telegraph Markdown",
    "content": "# Bagian 1\nParagraf pembuka.\n\n## Bagian 2\n- daftar\n- panjang\n\n### Bagian 3\n> kutipan block\n\n**Bold**, _italic_, dan kode `inline`.\n\n```\nfunction hello() {\n  console.log(\"hai telegraph\");\n}\n```",
    "authorName": "Markdown Bot",
    "authorUrl": "https://t.me/markdown_bot",
    "format": "markdown",
    "returnContent": true
  }'
```

## 2. Konten HTML Lengkap

```bash
curl -X POST "$BASE_URL/api/telegraph" \
  -u "$BASIC_USER:$BASIC_PASS" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "HTML Showcase",
    "content": "<h1>Hero Title</h1><p>Paragraf pembuka dengan <a href=\\"https://example.com\\">tautan</a>.</p><figure><img src=\\"https://picsum.photos/800/300\\" /></figure><h3>Iframe</h3><figure><iframe src=\\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\\"></iframe></figure>",
    "authorName": "HTML Bot",
    "format": "html"
  }'
```

## 3. Multiple Section Story

```bash
curl -X POST "$BASE_URL/api/telegraph" \
  -u "$BASIC_USER:$BASIC_PASS" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Catatan Perjalanan 7 Hari",
    "content": "## Hari 1\nTiba di kota, mencicipi kopi lokal.\n\n## Hari 2\nMenjelajah museum.\n\n## Hari 3\nTracking hutan hujan dengan tim.\n\n## Hari 4\nBelajar memasak makanan khas.\n\n## Hari 5\nDiskusi dengan komunitas kreatif setempat.\n\n## Hari 6\nIstirahat total, menulis draf artikel.\n\n## Hari 7\nPublikasi semua catatan ini ke Telegraph!",
    "authorName": "Travel Writer",
    "authorUrl": "https://t.me/travel_writer",
    "returnContent": false
  }'
```

## 4. Meminta Contoh Payload (GET)

```bash
curl "$BASE_URL/api/telegraph" \
  -u "$BASIC_USER:$BASIC_PASS"
```

Sesuaikan `BASE_URL`, kredensial Basic Auth, dan token Telegraph di `.env` sebelum menjalankan contoh di atas.
