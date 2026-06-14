export const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL as string) || "";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const j = await res.json();
      msg = (j as { detail?: string; error?: string }).detail || (j as { error?: string }).error || msg;
    } catch {
      /* noop */
    }
    throw new Error(msg);
  }
  return (await res.json()) as T;
}

export const backend = {
  url: BACKEND_URL,
  async health() {
    const r = await fetch(`${BACKEND_URL}/health`);
    return handle<Record<string, unknown>>(r);
  },
  async detectImage(file: File, source = "image", cameraName = "manual_upload") {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("source_type", source);
    fd.append("camera_name", cameraName);
    fd.append("create_challan", "true");
    fd.append("return_image", "true");
    const r = await fetch(`${BACKEND_URL}/detect/image`, { method: "POST", body: fd });
    return handle<DetectImageResponse>(r);
  },
  async detectVideo(file: File, cameraName = "video-upload") {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("source_type", "video");
    fd.append("camera_name", cameraName);
    const r = await fetch(`${BACKEND_URL}/detect/video`, { method: "POST", body: fd });
    return handle<DetectVideoResponse>(r);
  },
  async detectFrame(blob: Blob) {
    const fd = new FormData();
    fd.append("file", new File([blob], "frame.jpg", { type: "image/jpeg" }));
    fd.append("source_type", "webcam");
    fd.append("camera_name", "webcam");
    fd.append("create_challan", "true");
    fd.append("return_image", "true");
    const r = await fetch(`${BACKEND_URL}/detect/frame-fast`, { method: "POST", body: fd });
    return handle<DetectImageResponse>(r);
  },
  async detectIpCamera(cameraUrl: string, cameraName: string) {
    const r = await fetch(`${BACKEND_URL}/detect/ip-camera`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ camera_url: cameraUrl, camera_name: cameraName }),
    });
    return handle<DetectImageResponse>(r);
  },
};

export interface DetectionBox {
  class: string;
  confidence: number;
  bbox?: number[];
}

export interface DetectImageResponse {
  annotated_image?: string | null;
  helmet_violation?: boolean;
  vehicle_number?: string | null;
  ocr_confidence?: number | null;
  ocr_accepted?: boolean;
  duplicate?: boolean;
  evidence_url?: string | null;
  challan?: { challan_number?: string; amount?: number; status?: string } | null;
  challan_block_reason?: string | null;
  helmet_detections?: DetectionBox[];
  plate_detections?: DetectionBox[];
  processing_time_ms?: number;
  message?: string;
  [k: string]: unknown;
}

export interface DetectVideoResponse {
  processed_frames?: number;
  total_results?: number;
  created_challans?: number;
  results?: DetectImageResponse[];
  message?: string;
  [k: string]: unknown;
}
