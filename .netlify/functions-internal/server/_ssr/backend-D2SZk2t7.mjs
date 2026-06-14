const BACKEND_URL = "https://neuferaofficial-ibscs-live-backend.hf.space";
async function handle(res) {
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const j = await res.json();
      msg = j.detail || j.error || msg;
    } catch {
    }
    throw new Error(msg);
  }
  return await res.json();
}
const backend = {
  url: BACKEND_URL,
  async health() {
    const r = await fetch(`${BACKEND_URL}/health`);
    return handle(r);
  },
  async detectImage(file, source = "image", cameraName = "manual_upload") {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("source_type", source);
    fd.append("camera_name", cameraName);
    fd.append("create_challan", "true");
    fd.append("return_image", "true");
    const r = await fetch(`${BACKEND_URL}/detect/image`, { method: "POST", body: fd });
    return handle(r);
  },
  async detectVideo(file, cameraName = "video-upload") {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("source_type", "video");
    fd.append("camera_name", cameraName);
    const r = await fetch(`${BACKEND_URL}/detect/video`, { method: "POST", body: fd });
    return handle(r);
  },
  async detectFrame(blob) {
    const fd = new FormData();
    fd.append("file", new File([blob], "frame.jpg", { type: "image/jpeg" }));
    fd.append("source_type", "webcam");
    fd.append("camera_name", "webcam");
    fd.append("create_challan", "true");
    fd.append("return_image", "true");
    const r = await fetch(`${BACKEND_URL}/detect/frame-fast`, { method: "POST", body: fd });
    return handle(r);
  },
  async detectIpCamera(cameraUrl, cameraName) {
    const r = await fetch(`${BACKEND_URL}/detect/ip-camera`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ camera_url: cameraUrl, camera_name: cameraName })
    });
    return handle(r);
  }
};
export {
  BACKEND_URL as B,
  backend as b
};
