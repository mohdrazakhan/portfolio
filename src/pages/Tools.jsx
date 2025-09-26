import React, { useState } from "react";
import QRCode from "qrcode";

export default function Tools() {
  const [qrText, setQrText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [resizedUrl, setResizedUrl] = useState("");
  const [maxWidth, setMaxWidth] = useState(800);

  async function generateQr() {
    try {
  const url = await QRCode.toDataURL(qrText || " ", { margin: 2, scale: 8 });
      setQrDataUrl(url);
    } catch (err) {
      console.error(err);
    }
  }

  function handleImage(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setImageFile(f);
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (ev) => {
      img.src = ev.target.result;
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
  <h1 id="tools" className="text-3xl font-bold mb-6">Developer Tools</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2">QR Code Generator</h2>
        <div className="flex gap-2">
          <input value={qrText} onChange={(e) => setQrText(e.target.value)} placeholder="Text or URL" className="flex-1 rounded border px-3 py-2" />
          <button onClick={generateQr} className="rounded bg-indigo-600 text-white px-3 py-2">Generate</button>
        </div>
        {qrDataUrl && (
          <div className="mt-4">
            <img src={qrDataUrl} alt="QR" className="w-48 h-48" />
            <button onClick={downloadQr} className="rounded-md bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm font-medium">Download PNG</button>
          </div>
        )}
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2">Other Tools </h2>
        <p className="text-sm">Other Tools Coming Soon</p>
      </section>
    </div>
  );
}
