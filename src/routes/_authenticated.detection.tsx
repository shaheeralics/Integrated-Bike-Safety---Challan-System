import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Upload,
  Video,
  Camera,
  Cctv,
  Loader2,
  CheckCircle2,
  XCircle,
  Play,
  Square,
  RefreshCw,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { backend, type DetectImageResponse, type DetectVideoResponse } from "@/lib/backend";
import { supabase } from "@/lib/supabase";
import type { CameraSource } from "@/lib/types";
import { StatusBadge } from "@/components/app/StatCard";

export const Route = createFileRoute("/_authenticated/detection")({
  component: DetectionCenter,
});

function DetectionCenter() {
  return (
    <Tabs defaultValue="image" className="w-full">
      <TabsList>
        <TabsTrigger value="image"><Upload className="h-4 w-4" /> Image</TabsTrigger>
        <TabsTrigger value="video"><Video className="h-4 w-4" /> Video</TabsTrigger>
        <TabsTrigger value="webcam"><Camera className="h-4 w-4" /> Webcam / Mobile</TabsTrigger>
        <TabsTrigger value="ip"><Cctv className="h-4 w-4" /> IP Camera</TabsTrigger>
      </TabsList>
      <TabsContent value="image"><ImageTab /></TabsContent>
      <TabsContent value="video"><VideoTab /></TabsContent>
      <TabsContent value="webcam"><WebcamTab /></TabsContent>
      <TabsContent value="ip"><IpTab /></TabsContent>
    </Tabs>
  );
}

function ResultCard({ r }: { r: DetectImageResponse }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-5">
      {r.annotated_image && (
        <img
          src={r.annotated_image}
          alt="AI annotated detection result"
          className="mb-4 aspect-video w-full rounded-lg border border-border/60 object-contain"
        />
      )}
      <div className="flex flex-wrap items-center gap-2">
        {r.helmet_violation ? (
          <StatusBadge status="error" label="Helmet violation" />
        ) : (
          <StatusBadge status="ok" label="No violation" />
        )}
        {r.duplicate && <StatusBadge status="warn" label="Duplicate (within window)" />}
        {r.vehicle_number && (
          <span className="rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-xs">
            {r.vehicle_number}
          </span>
        )}
        {typeof r.ocr_confidence === "number" && (
          <span className="text-[11px] text-muted-foreground">
            OCR {Math.round(r.ocr_confidence)}%
          </span>
        )}
        {typeof r.ocr_accepted === "boolean" && (
          <StatusBadge status={r.ocr_accepted ? "ok" : "warn"} label={`OCR ${r.ocr_accepted ? "accepted" : "rejected"}`} />
        )}
        {typeof r.processing_time_ms === "number" && (
          <span className="ml-auto text-[11px] text-muted-foreground">
            {Math.round(r.processing_time_ms)} ms
          </span>
        )}
      </div>
      {!r.annotated_image && r.evidence_url && (
        <img
          src={r.evidence_url}
          alt="evidence"
          className="mt-4 max-h-96 w-full rounded-lg border border-border/60 object-contain"
        />
      )}
      {r.challan ? (
        <div className="mt-4 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm">
          <div className="font-semibold text-primary mb-1">Challan Generated Successfully</div>
          <div className="font-mono font-semibold text-primary">{r.challan.challan_number}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Vehicle: {r.vehicle_number} · Amount: PKR {r.challan.amount} · Status: {r.challan.status}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-xs text-muted-foreground">
          {r.challan_block_reason ? (r.challan_block_reason as React.ReactNode) : "Challan status: Not generated"}
        </p>
      )}
      <DetectionLists r={r} />
    </div>
  );
}

function DetectionLists({ r }: { r: DetectImageResponse }) {
  if (!r.helmet_detections?.length && !r.plate_detections?.length) return null;
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div>
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Helmet detections
        </div>
        <ul className="space-y-1 text-xs">
          {(r.helmet_detections || []).map((d, i) => (
            <li key={i} className="flex justify-between rounded border border-border/60 bg-background/40 px-2 py-1">
              <span className="font-mono">{d.class}</span>
              <span className="text-muted-foreground">{Math.round(d.confidence * (d.confidence < 1 ? 100 : 1))}%</span>
            </li>
          ))}
          {!r.helmet_detections?.length && <li className="text-muted-foreground">None</li>}
        </ul>
      </div>
      <div>
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Plate detections
        </div>
        <ul className="space-y-1 text-xs">
          {(r.plate_detections || []).map((d, i) => (
            <li key={i} className="flex justify-between rounded border border-border/60 bg-background/40 px-2 py-1">
              <span className="font-mono">{d.class}</span>
              <span className="text-muted-foreground">{Math.round(d.confidence * (d.confidence < 1 ? 100 : 1))}%</span>
            </li>
          ))}
          {!r.plate_detections?.length && <li className="text-muted-foreground">None</li>}
        </ul>
      </div>
    </div>
  );
}

/* IMAGE TAB */
function ImageTab() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<DetectImageResponse | null>(null);

  const m = useMutation({
    mutationFn: (f: File) => backend.detectImage(f, "image", "manual_upload"),
    onSuccess: (data) => {
      setResult(data);
      if (data.helmet_violation && data.challan) {
        toast.success(`Challan ${data.challan.challan_number} created`);
      } else if (data.helmet_violation && data.duplicate) {
        toast.warning("Violation detected — duplicate within window");
      } else if (!data.helmet_violation) {
        toast("No helmet violation detected");
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-border/60 bg-card/60 p-5">
        <h3 className="text-sm font-semibold">Upload an image</h3>
        <p className="mt-1 text-xs text-muted-foreground">JPG / PNG, max 20MB.</p>
        <label className="mt-4 flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-background/40 transition hover:border-primary/50">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0] || null;
              setFile(f);
              setPreview(f ? URL.createObjectURL(f) : null);
              setResult(null);
            }}
          />
          {preview ? (
            <img src={preview} alt="preview" className="max-h-full max-w-full object-contain" />
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              <Upload className="mx-auto mb-2 h-6 w-6" />
              Click to select an image
            </div>
          )}
        </label>
        <div className="mt-4 flex gap-2">
          <Button disabled={!file || m.isPending} onClick={() => file && m.mutate(file)}>
            {m.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Run detection
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setFile(null);
              setPreview(null);
              setResult(null);
            }}
          >
            Reset
          </Button>
        </div>
      </div>
      <div>
        {result ? (
          <ResultCard r={result} />
        ) : (
          <div className="grid h-full place-items-center rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-sm text-muted-foreground">
            Results will appear here.
          </div>
        )}
      </div>
    </div>
  );
}

/* VIDEO TAB */
function VideoTab() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<DetectVideoResponse | null>(null);

  const m = useMutation({
    mutationFn: (f: File) => backend.detectVideo(f, "video-upload"),
    onSuccess: (data) => {
      setResult(data);
      toast.success(`Processed ${data.processed_frames ?? 0} frames`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-border/60 bg-card/60 p-5">
        <h3 className="text-sm font-semibold">Upload a video</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Backend samples every 5th frame for performance.
        </p>
        <label className="mt-4 flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-background/40 transition hover:border-primary/50">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setResult(null);
            }}
          />
          <div className="text-center text-sm text-muted-foreground">
            <Video className="mx-auto mb-2 h-6 w-6" />
            {file ? file.name : "Click to select a video"}
          </div>
        </label>
        <div className="mt-4 flex gap-2">
          <Button disabled={!file || m.isPending} onClick={() => file && m.mutate(file)}>
            {m.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Process video
          </Button>
        </div>
      </div>
      <div className="rounded-xl border border-border/60 bg-card/60 p-5">
        {!result && (
          <div className="grid h-full place-items-center text-sm text-muted-foreground">
            Summary will appear here.
          </div>
        )}
        {result && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-3">
              <Mini label="Frames" value={result.processed_frames ?? 0} />
              <Mini label="Results" value={result.total_results ?? 0} />
              <Mini label="Challans" value={result.created_challans ?? 0} />
            </div>
            {result.results && result.results.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Per-frame results
                </div>
                <div className="max-h-96 space-y-2 overflow-auto">
                  {result.results.slice(0, 50).map((r, i) => (
                    <div key={i} className="rounded border border-border/60 bg-background/40 p-2 text-xs">
                      <div className="flex items-center gap-2">
                        {r.helmet_violation ? (
                          <XCircle className="h-3.5 w-3.5 text-destructive" />
                        ) : (
                          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                        )}
                        <span className="font-mono">{r.vehicle_number || "—"}</span>
                        {r.challan && (
                          <span className="ml-auto font-mono text-primary">
                            {r.challan.challan_number}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-mono text-lg font-semibold">{value}</div>
    </div>
  );
}

/* WEBCAM TAB */
function WebcamTab() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<DetectImageResponse | null>(null);
  const [frameStatus, setFrameStatus] = useState<"idle" | "sending" | "received" | "error">("idle");
  const [frameError, setFrameError] = useState<string | null>(null);
  const sending = useRef(false);
  const runningRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function listDevices() {
    try {
      const permissionStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const d = (await navigator.mediaDevices.enumerateDevices()).filter((x) => x.kind === "videoinput");
      permissionStream.getTracks().forEach((track) => track.stop());
      setDevices(d);
      if (!deviceId && d[0]) setDeviceId(d[0].deviceId);
    } catch (e) {
      toast.error("Camera permission denied");
    }
  }

  useEffect(() => {
    listDevices();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function start() {
    if (!deviceId) {
      toast.error("Select a camera first");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        if (videoRef.current.readyState < HTMLMediaElement.HAVE_METADATA) {
          await new Promise<void>((resolve) => {
            videoRef.current?.addEventListener("loadedmetadata", () => resolve(), { once: true });
          });
        }
        await videoRef.current.play();
      }
      runningRef.current = true;
      setRunning(true);
      setFrameError(null);
      setFrameStatus("idle");
      scheduleFrame(0);
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  function stop() {
    runningRef.current = false;
    setRunning(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    sending.current = false;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setFrameStatus("idle");
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  function scheduleFrame(delay = 2000) {
    if (!runningRef.current) return;
    timerRef.current = setTimeout(() => void sendFrame(), delay);
  }

  async function sendFrame() {
    if (!runningRef.current || sending.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
      scheduleFrame(250);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFrameError("Browser could not create the frame canvas.");
      setFrameStatus("error");
      scheduleFrame();
      return;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    sending.current = true;
    setFrameStatus("sending");

    try {
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (value) => value ? resolve(value) : reject(new Error("Could not encode camera frame.")),
          "image/jpeg",
          0.82,
        );
      });
      const response = await backend.detectFrame(blob);
      setResult(response);
      setFrameError(null);
      setFrameStatus("received");
      if (response.helmet_violation && response.challan) {
        toast.success(`Challan ${response.challan.challan_number}`);
      }
    } catch (error) {
      if (!runningRef.current) return;
      const message = error instanceof Error ? error.message : "Frame request failed";
      setFrameError(message);
      setFrameStatus("error");
    } finally {
      sending.current = false;
      if (runningRef.current) scheduleFrame();
    }
  }

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-border/60 bg-card/60 p-5">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[200px] flex-1">
            <Label className="text-xs">Camera</Label>
            <Select value={deviceId} onValueChange={setDeviceId}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {devices.map((d) => (
                  <SelectItem key={d.deviceId} value={d.deviceId}>
                    {d.label || `Camera ${d.deviceId.slice(0, 6)}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="icon" onClick={listDevices} title="Refresh devices">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border border-border/60 bg-black">
          <video ref={videoRef} className="aspect-video w-full" muted playsInline />
        </div>
        <canvas ref={canvasRef} className="hidden" />
        <div className="mt-4 flex gap-2">
          {!running ? (
            <Button onClick={start}><Play className="h-4 w-4" /> Start</Button>
          ) : (
            <Button variant="destructive" onClick={stop}><Square className="h-4 w-4" /> Stop</Button>
          )}
          {running && <StatusBadge status="ok" label="Live" />}
          {running && frameStatus === "sending" && <StatusBadge status="warn" label="Sending frame…" />}
          {running && frameStatus === "received" && <StatusBadge status="ok" label="AI response received" />}
          {running && frameStatus === "error" && <StatusBadge status="error" label="Frame failed" />}
        </div>
        {frameError && (
          <p className="mt-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            Backend: {frameError}
          </p>
        )}
      </div>
      <div>
        {result ? (
          <ResultCard r={result} />
        ) : (
          <div className="grid h-full min-h-72 place-items-center rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-center text-sm text-muted-foreground">
            Start the camera to see the latest AI processed snapshot.
          </div>
        )}
      </div>
    </div>
  );
}

/* IP CAMERA TAB */
function IpTab() {
  const [cameraId, setCameraId] = useState<string>("");
  const [cameraUrl, setCameraUrl] = useState("");
  const [cameraName, setCameraName] = useState("");
  const [result, setResult] = useState<DetectImageResponse | null>(null);

  const list = useQuery({
    queryKey: ["camera_sources", "ip"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("camera_sources")
        .select("*")
        .eq("source_type", "ip_camera");
      if (error) throw error;
      return (data || []) as CameraSource[];
    },
  });

  const m = useMutation({
    mutationFn: () => {
      const url = cameraUrl.trim();
      const name = cameraName.trim() || "ip-camera";
      if (!url) throw new Error("Camera URL required");
      return backend.detectIpCamera(url, name);
    },
    onSuccess: (r) => {
      setResult(r);
      if (r.helmet_violation && r.challan) toast.success(`Challan ${r.challan.challan_number}`);
      else if (!r.helmet_violation) toast("No helmet violation detected");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function pickSaved(id: string) {
    setCameraId(id);
    const c = list.data?.find((x) => x.id === id);
    if (c) {
      setCameraUrl(c.camera_url || "");
      setCameraName(c.camera_name);
    }
  }

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-border/60 bg-card/60 p-5 space-y-3">
        <h3 className="text-sm font-semibold">IP / RTSP camera</h3>

        <div>
          <Label className="text-xs">Saved camera (optional)</Label>
          <Select value={cameraId} onValueChange={pickSaved}>
            <SelectTrigger><SelectValue placeholder="— manual entry —" /></SelectTrigger>
            <SelectContent>
              {(list.data || []).map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.camera_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Camera name</Label>
          <Input value={cameraName} onChange={(e) => setCameraName(e.target.value)} placeholder="Gate-1" />
        </div>
        <div>
          <Label className="text-xs">Camera URL (RTSP or HTTP)</Label>
          <Input
            value={cameraUrl}
            onChange={(e) => setCameraUrl(e.target.value)}
            placeholder="rtsp://user:pass@host:554/stream"
            className="font-mono"
          />
        </div>
        <Button disabled={m.isPending} onClick={() => m.mutate()}>
          {m.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Capture & detect
        </Button>
      </div>
      <div>
        {result ? <ResultCard r={result} /> : (
          <div className="grid h-full place-items-center rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-sm text-muted-foreground">
            Results will appear here after capturing a frame from the IP camera.
          </div>
        )}
      </div>
    </div>
  );
}
