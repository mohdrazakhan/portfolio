import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";

/**
 * Tools page
 * - QR generator auto-updates while typing (debounced)
 * - Inputs are theme-friendly and responsive
 * - Image resize preview (responsive)
 */

export default function Tools() {
  const [qrText, setQrText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [resizedUrl, setResizedUrl] = useState("");
  const [maxWidth, setMaxWidth] = useState(800);

  // debounce ref
  const typingRef = useRef(null);

  // generate QR (async)
  async function generateQrFor(text) {
    try {
      // guard against empty text — produce a blank code if empty
      const payload = (text ?? "").trim() || " ";
      const url = await QRCode.toDataURL(payload, { margin: 2, scale: 8 });
      setQrDataUrl(url);
    } catch (err) {
      console.error("QR generation error:", err);
    }
  }

  // debounce typing: update QR while user types (300ms)
  useEffect(() => {
    if (typingRef.current) clearTimeout(typingRef.current);
    typingRef.current = setTimeout(() => {
      generateQrFor(qrText);
    }, 300);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [qrText]);

  // explicit generate button (keeps previous behavior)
  async function generateQr() {
    await generateQrFor(qrText);
  }

  // image handling (responsive preview)
  function handleImage(e) {
    const f = (e.target && e.target.files && e.target.files[0]) || null;
    if (!f) {
      setImageFile(null);
      setResizedUrl("");
      return;
    }
    setImageFile(f);

    const reader = new FileReader();
    const img = new Image();

    reader.onload = (ev) => {
      img.src = ev.target.result;
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setResizedUrl(canvas.toDataURL("image/jpeg", 0.85));
      };
    };

    reader.readAsDataURL(f);
  }

  function downloadQr() {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function downloadResizedImage() {
    if (!resizedUrl) return;
    const link = document.createElement("a");
    link.href = resizedUrl;
    link.download = (imageFile && imageFile.name) || "resized.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-12">
      <h1 id="tools" className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
        Developer Tools
      </h1>

      {/* QR generator */}
      <section className="mb-10 bg-white/6 dark:bg-zinc-900/40 rounded-xl p-4 md:p-6 border dark:border-zinc-800/50">
        <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">QR Code Generator</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
          {/* input */}
          <div className="sm:col-span-2">
            <label htmlFor="qrText" className="sr-only">Text or URL for QR</label>
            <input
              id="qrText"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="Enter text or URL (QR updates as you type)"
              className="w-full rounded-md border px-3 py-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800/60 border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <div className="flex gap-2 mt-3">
              <button
                onClick={generateQr}
                className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
              >
                Generate
              </button>

              <button
                onClick={() => { setQrText(""); setQrDataUrl(""); }}
                className="inline-flex items-center px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-200"
              >
                Clear
              </button>
            </div>
          </div>

          {/* preview & download */}
          <div className="sm:col-span-1 flex flex-col items-center gap-3">
            <div className="w-48 h-48 bg-white rounded-md flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-800">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR code" className="w-full h-full object-contain" />
              ) : (
                <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center px-2">
                  QR will appear here
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={downloadQr}
                disabled={!qrDataUrl}
                className="inline-flex items-center px-3 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download PNG
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Image resize */}
      <section className="mb-10 bg-white/6 dark:bg-zinc-900/40 rounded-xl p-4 md:p-6 border dark:border-zinc-800/50">
        <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">Image Resize (Preview)</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-2">Choose an image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="block w-full text-sm text-zinc-900 dark:text-zinc-100"
            />

            <label className="block text-sm text-zinc-700 dark:text-zinc-300 mt-3">Max width (px)</label>
            <input
              type="range"
              min={200}
              max={2000}
              value={maxWidth}
              onChange={(e) => setMaxWidth(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Current max width: {maxWidth}px</div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={downloadResizedImage}
                disabled={!resizedUrl}
                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download Resized
              </button>

              <button
                onClick={() => { setImageFile(null); setResizedUrl(""); }}
                className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-200"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="md:col-span-1 flex items-start justify-center">
            <div className="w-full max-w-xs bg-white rounded-md p-3 border border-zinc-200 dark:border-zinc-800/60">
              <div className="w-full h-48 bg-zinc-50 dark:bg-zinc-800/60 rounded-md flex items-center justify-center overflow-hidden">
                {resizedUrl ? (
                  <img src={resizedUrl} alt="Resized preview" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                    No preview
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* placeholder for other tools */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">Other Tools</h2>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">More developer utilities will be added here.</p>
      </section>
    </div>
  );
}