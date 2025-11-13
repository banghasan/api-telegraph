import { Handlers } from "$fresh/server.ts";
import {
  parseHtml,
  parseMarkdown,
  Telegraph,
} from "https://deno.land/x/telegraph@v1.0.0/mod.ts";

const REALM = 'Basic realm="Telegraph API"';

function requireEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

function unauthorized(): Response {
  return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
    status: 401,
    headers: {
      "WWW-Authenticate": REALM,
      "content-type": "application/json; charset=utf-8",
    },
  });
}

function isAuthorized(request: Request, username: string, password: string) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;
  try {
    const decoded = atob(header.replace("Basic ", "").trim());
    const [user, ...rest] = decoded.split(":");
    const pass = rest.join(":");
    return user === username && pass === password;
  } catch {
    return false;
  }
}

type Payload = {
  title?: string;
  content?: string;
  authorName?: string;
  authorUrl?: string;
  format?: "markdown" | "html";
  returnContent?: boolean;
};

function ensurePayload(payload: Payload) {
  if (!payload.title || !payload.content) {
    throw new Error("`title` dan `content` wajib diisi");
  }
  return {
    title: payload.title,
    content: payload.content,
    authorName: payload.authorName,
    authorUrl: payload.authorUrl,
    format: (payload.format ?? "markdown").toLowerCase() as "markdown" | "html",
    returnContent: payload.returnContent ?? true,
  };
}

async function parseRequestBody(request: Request) {
  try {
    return await request.json();
  } catch {
    throw new Error("Body harus berupa JSON valid");
  }
}

export const handler: Handlers = {
  async POST(request) {
    let username: string;
    let password: string;
    let token: string;
    try {
      username = requireEnv("BASIC_AUTH_USERNAME");
      password = requireEnv("BASIC_AUTH_PASSWORD");
      token = requireEnv("TELEGRAPH_TOKEN");
    } catch (error) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );
    }

    if (!isAuthorized(request, username, password)) {
      return unauthorized();
    }

    let payload: ReturnType<typeof ensurePayload>;
    try {
      payload = ensurePayload(await parseRequestBody(request));
    } catch (error) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 422,
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );
    }

    const telegraph = new Telegraph({ accessToken: token });

    let content;
    try {
      content = payload.format === "html"
        ? parseHtml(payload.content)
        : parseMarkdown(payload.content);
      if (!content) {
        throw new Error("Konten tidak boleh kosong setelah parsing");
      }
    } catch (error) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 422,
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );
    }

    try {
      const page = await telegraph.create({
        title: payload.title,
        content,
        author_name: payload.authorName,
        author_url: payload.authorUrl,
        return_content: payload.returnContent,
      });

      return new Response(
        JSON.stringify({
          ok: true,
          result: page,
          url: `https://telegra.ph/${page.path}`,
        }),
        {
          status: 201,
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 502,
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );
    }
  },
  GET() {
    return new Response(
      JSON.stringify({
        ok: true,
        endpoint: "/api/telegraph",
        method: "POST",
        body: {
          title: "Judul artikel",
          content: "# Markdown...",
          authorName: "Opsional",
          authorUrl: "Opsional",
          format: "markdown | html",
          returnContent: true,
        },
      }),
      {
        headers: { "content-type": "application/json; charset=utf-8" },
      },
    );
  },
};
