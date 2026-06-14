export interface Violation {
  id: string;
  vehicle_number: string;
  helmet_status: boolean;
  confidence: number | null;
  ocr_confidence: number | null;
  image_url: string | null;
  evidence_filename: string | null;
  source_type: string | null;
  camera_name: string | null;
  timestamp: string;
}

export interface Challan {
  id: string;
  challan_number: string;
  vehicle_number: string;
  violation_id: string | null;
  amount: number;
  status: "Pending" | "Paid" | "Cancelled" | string;
  created_at: string;
  paid_at: string | null;
}

export interface Vehicle {
  id: string;
  vehicle_number: string;
  total_violations: number;
  first_seen: string | null;
  last_seen: string | null;
  created_at: string | null;
}

export interface CameraSource {
  id: string;
  camera_name: string;
  source_type: "webcam" | "mobile" | "ip_camera" | string;
  camera_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface SystemSettings {
  id: string;
  fine_amount: number;
  helmet_threshold: number;
  plate_threshold: number;
  ocr_threshold: number;
  duplicate_window: number;
  frame_interval: number;
}

export interface DetectionLog {
  id: string;
  vehicle_number: string | null;
  source_type: string | null;
  camera_name: string | null;
  confidence: number | null;
  processing_time_ms: number | null;
  timestamp: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
}
