"use client";

import React, { useEffect, useMemo, useState } from "react";

type PortfolioData = Record<string, any>;

type ApiOkGet = { ok: true; username: string; data: PortfolioData };
type ApiOkPost = { ok: true; key: string; url?: string };
type ApiErr = { ok?: false; error: string; details?: string };

type ApiGetResponse = ApiOkGet | ApiErr;
type ApiPostResponse = ApiOkPost | ApiErr;

export default function EditorPage() {
  const [username, setUsername] = useState("testuser6");

  // This is the editable portfolio JSON (as text)
  const [jsonText, setJsonText] = useState(
    JSON.stringify(
      {
        name: "Ravi",
        title: "Software Engineer",
      },
      null,
      2
    )
  );

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // ✅ Option A: store curl strings in variables (avoids JSX parsing errors)
  const CURL_POST = useMemo(() => {
    return `curl -X POST http://localhost:3000/api/portfolio -H "Content-Type: application/json" -d '{"username":"${username}","data":{"name":"Ravi"}}'`;
  }, [username]);

  const CURL_GET = useMemo(() => {
    return `curl http://localhost:3000/api/portfolio/${encodeURIComponent(username)}`;
  }, [username]);

  function safeParseJson(text: string): { ok: true; value: PortfolioData } | { ok: false; error: string } {
    try {
      const val = JSON.parse(text);
      if (val === null || typeof val !== "object") {
        return { ok: false, error: "JSON must be an object (example: {\"name\":\"Ravi\"})" };
      }
      return { ok: true, value: val };
    } catch (e: any) {
      return { ok: false, error: e?.message || "Invalid JSON" };
    }
  }

  async function loadPortfolio(u?: string) {
    const user = (u ?? username).trim();
    setErrorMsg("");
    setStatusMsg("");

    if (!user) {
      setErrorMsg("Please enter a username.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/portfolio/${encodeURIComponent(user)}`, {
        method: "GET",
        cache: "no-store",
      });

      const json = (await res.json()) as ApiGetResponse;

      if (!res.ok) {
        // json may or may not include error, so we fallback safely
        const msg = "error" in json ? json.error : `Failed to load (HTTP ${res.status})`;
        setErrorMsg(msg);
        return;
      }

      if ("ok" in json && json.ok) {
        setUsername(json.username);
        setJsonText(JSON.stringify(json.data ?? {}, null, 2));
        setStatusMsg(`Loaded portfolio for "${json.username}".`);
      } else {
        setErrorMsg("Unexpected response while loading.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Load failed.");
    } finally {
      setLoading(false);
    }
  }

  async function savePortfolio() {
    const user = username.trim();
    setErrorMsg("");
    setStatusMsg("");

    if (!user) {
      setErrorMsg("Please enter a username.");
      return;
    }

    const parsed = safeParseJson(jsonText);
    if (!parsed.ok) {
      setErrorMsg(parsed.error);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/portfolio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, data: parsed.value }),
      });

      const json = (await res.json()) as ApiPostResponse;

      if (!res.ok) {
        const msg = "error" in json ? json.error : `Save failed (HTTP ${res.status})`;
        const details = "details" in json && json.details ? ` — ${json.details}` : "";
        setErrorMsg(msg + details);
        return;
      }

      if ("ok" in json && json.ok) {
        const extra = json.key ? ` Key: ${json.key}` : "";
        setStatusMsg(`Saved portfolio for "${user}".${extra}`);
      } else {
        setErrorMsg("Unexpected response while saving.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Save failed.");
    } finally {
      setLoading(false);
    }
  }

  // Optional: auto-load once on open (comment out if you don’t want)
  useEffect(() => {
    // loadPortfolio(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
      <h1 style={{ marginBottom: 8 }}>Portfolio Editor</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Edit JSON and save it to Vercel Blob via <code>/api/portfolio</code>.
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 16, flexWrap: "wrap" }}>
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontWeight: 600 }}>Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="testuser6"
            style={{
              padding: "8px 10px",
              border: "1px solid #ccc",
              borderRadius: 6,
              minWidth: 220,
            }}
          />
        </label>

        <button
          onClick={() => loadPortfolio()}
          disabled={loading}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            background: "white",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loading..." : "Load"}
        </button>

        <button
          onClick={savePortfolio}
          disabled={loading}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #111",
            background: "#111",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {statusMsg ? (
        <div style={{ marginTop: 12, padding: 10, borderRadius: 8, background: "#eef9f1", border: "1px solid #bfe7c9" }}>
          ✅ {statusMsg}
        </div>
      ) : null}

      {errorMsg ? (
        <div style={{ marginTop: 12, padding: 10, borderRadius: 8, background: "#fff1f1", border: "1px solid #f3b6b6" }}>
          ❌ {errorMsg}
        </div>
      ) : null}

      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ marginBottom: 8 }}>Portfolio JSON</h2>
          <button
            onClick={() => {
              const parsed = safeParseJson(jsonText);
              if (!parsed.ok) {
                setErrorMsg(parsed.error);
                return;
              }
              setJsonText(JSON.stringify(parsed.value, null, 2));
              setStatusMsg("Formatted JSON.");
              setErrorMsg("");
            }}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #ccc",
              background: "white",
              cursor: "pointer",
            }}
          >
            Format JSON
          </button>
        </div>

        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: 420,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            fontSize: 13,
            lineHeight: 1.45,
          }}
        />
      </div>

      <div style={{ marginTop: 16, padding: 12, borderRadius: 8, border: "1px solid #ddd", background: "#fafafa" }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Terminal test commands</div>

        <div style={{ marginTop: 6 }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>POST (save)</div>
          <code style={{ display: "block", padding: 10, borderRadius: 8, background: "#111", color: "white", overflowX: "auto" }}>
            {CURL_POST}
          </code>
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>GET (load)</div>
          <code style={{ display: "block", padding: 10, borderRadius: 8, background: "#111", color: "white", overflowX: "auto" }}>
            {CURL_GET}
          </code>
        </div>

        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
          Tip: open <code>/editor</code>, set username, edit JSON, click <b>Save</b>, then click <b>Load</b>.
        </div>
      </div>
    </div>
  );
}