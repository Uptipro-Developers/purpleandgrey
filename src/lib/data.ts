/* ---------------------------------------------------------------------------
   Shared domain model for the Purple & Grey platform.
   Every building is called "Purple & Grey" — no matter the state.
   Estates live in different campuses/states; vendors and requests are
   always tied to a location so admin can filter by Unilag, Oye Ekiti, …
--------------------------------------------------------------------------- */

export const categories = [
  "Plumbing",
  "Electrical & HVAC",
  "Laundry",
  "Cleaning & Housekeeping",
  "Food & Kitchen",
  "Furniture & Fixtures",
] as const;

export type ServiceCategory = (typeof categories)[number];

export const priorityLevels = ["Normal", "High", "Urgent"] as const;
export type Priority = (typeof priorityLevels)[number];

/* Requests never disappear — they flow through a visible lifecycle
   handled by admin as the single relay:
   requested (with admin) → time-proposed (admin + vendor agreed, waiting on resident) → slotted → in-progress → resolved */
export const requestStatuses = [
  "requested",
  "time-proposed",
  "slotted",
  "in-progress",
  "resolved",
] as const;

export type RequestStatus = (typeof requestStatuses)[number];

export const statusMeta: Record<RequestStatus, { label: string; tone: "info" | "warning" | "violet" | "neutral" | "success"; hint: string }> = {
  requested: { label: "With admin", tone: "info", hint: "Received by admin. Admin will assign the right service team." },
  "time-proposed": { label: "Time proposed", tone: "warning", hint: "Admin + vendor agreed a time — waiting for the resident to confirm." },
  slotted: { label: "Slot confirmed", tone: "violet", hint: "Resident confirmed. Admin tells the vendor to come at the slotted time." },
  "in-progress": { label: "In progress", tone: "info", hint: "Assigned vendor is on-site. Updates flow via admin." },
  resolved: { label: "Resolved", tone: "success", hint: "Closed by admin and logged to the unit's history." },
};

export const locations = ["Unilag", "Oye Ekiti", "Abuja", "Port Harcourt", "Ibadan"] as const;
export type Location = (typeof locations)[number];

export interface ServiceRequest {
  id: string;
  kind: "service" | "complaint" | "maintenance";
  resident: string;
  room: string;
  location: Location;
  category: ServiceCategory;
  title: string;
  detail: string;
  priority: Priority;
  status: RequestStatus;
  proposed?: string;
  slotted?: string;
  created: string;
  assignedVendorId?: string | null;
}

export interface Vendor {
  id: string;
  name: string;
  category: ServiceCategory;
  location: Location;
  phone: string;
  scope: string[];
  status: "active" | "paused";
  orders: number;
  sla: string;
}

export const vendorsSeed: Vendor[] = [
  { id: "V-01", name: "Chuks Electricals", category: "Electrical & HVAC", location: "Unilag", phone: "0803 111 2044", scope: ["Purple & Grey · Unilag — Block A", "Block B"], status: "active", orders: 14, sla: "35m avg response" },
  { id: "V-02", name: "PipeServe", category: "Plumbing", location: "Oye Ekiti", phone: "0805 220 1188", scope: ["Purple & Grey · Oye Ekiti — All blocks"], status: "active", orders: 9, sla: "28m avg response" },
  { id: "V-03", name: "CleanCo", category: "Cleaning & Housekeeping", location: "Abuja", phone: "0802 774 0933", scope: ["Purple & Grey · Abuja — Phase 1", "Phase 2"], status: "active", orders: 22, sla: "Daily rounds" },
  { id: "V-04", name: "Homestead Kitchen", category: "Food & Kitchen", location: "Port Harcourt", phone: "0701 550 8120", scope: ["Purple & Grey · PH — Kitchen Hall"], status: "active", orders: 34, sla: "45m delivery" },
  { id: "V-05", name: "LumoBright", category: "Furniture & Fixtures", location: "Ibadan", phone: "0906 445 7712", scope: ["Purple & Grey · Ibadan — Block A"], status: "paused", orders: 6, sla: "n/a — paused" },
  { id: "V-06", name: "Spin Dry Laundry", category: "Laundry", location: "Unilag", phone: "0809 335 6623", scope: ["Purple & Grey · Unilag — All blocks"], status: "active", orders: 18, sla: "24h cycle" },
  { id: "V-07", name: "VoltAbuja", category: "Electrical & HVAC", location: "Abuja", phone: "0806 332 1190", scope: ["Purple & Grey · Abuja — All blocks"], status: "active", orders: 11, sla: "40m avg response" },
  { id: "V-08", name: "Aqua Ibadan", category: "Plumbing", location: "Ibadan", phone: "0807 441 2033", scope: ["Purple & Grey · Ibadan — All blocks"], status: "active", orders: 7, sla: "30m avg response" },
];

export const estates = [
  { id: "unilag", campus: "Unilag", name: "Purple & Grey", city: "Akoka", state: "Lagos State", buildings: ["Block A", "Block B", "Annex"], residents: 3800, blurb: "Mainland core — a 6-minute walk from UNILAG gates. Every block is Purple & Grey." },
  { id: "oye-ekiti", campus: "Oye Ekiti", name: "Purple & Grey", city: "Oye", state: "Ekiti State", buildings: ["Block A", "Block B"], residents: 2200, blurb: "Next to FUOYE — same name, same ops desk, same app — different soil." },
  { id: "abuja", campus: "Abuja", name: "Purple & Grey", city: "Gwagwalada", state: "FCT", buildings: ["Phase 1", "Phase 2", "Studio Wing"], residents: 2900, blurb: "FCT flagship — studios for interns and final-year clusters." },
  { id: "ph", campus: "Port Harcourt", name: "Purple & Grey", city: "Choba", state: "Rivers State", buildings: ["Block A", "Kitchen Hall"], residents: 2400, blurb: "Choba corridor — reliable water and power, fixed by the same teams daily." },
  { id: "ibadan", campus: "Ibadan", name: "Purple & Grey", city: "Agodi", state: "Oyo State", buildings: ["Block A", "Block B"], residents: 1500, blurb: "UI axis — two blocks, one ops desk, one queue. Same name as Lagos." },
] as const;

export const requestsSeed: ServiceRequest[] = [
  {
    id: "SR-104", kind: "maintenance", resident: "Ada Obi", room: "R214 · Purple & Grey · Unilag · Block A", location: "Unilag",
    category: "Electrical & HVAC", title: "AC dripping into study corner", detail: "Water pools near the desk every few hours. It started after the storm on Sunday.",
    priority: "Urgent", status: "requested", created: "Today · 8:12am", assignedVendorId: null,
  },
  {
    id: "SR-101", kind: "maintenance", resident: "Bryan Eze", room: "R410 · Purple & Grey · Oye Ekiti · Block A", location: "Oye Ekiti",
    category: "Plumbing", title: "Toilet won’t flush properly", detail: "Keeps running overnight — water bill getting silly.",
    priority: "Normal", status: "time-proposed", proposed: "Thu · 10:30am", created: "Yesterday · 6:40pm", assignedVendorId: "V-02",
  },
  {
    id: "SR-098", kind: "service", resident: "Chinedu Okoro", room: "R102 · Purple & Grey · Unilag · Block B", location: "Unilag",
    category: "Electrical & HVAC", title: "Ceiling fan wobbles", detail: "Loud vibration during the last speed setting.",
    priority: "High", status: "slotted", proposed: "Fri · 2:00pm", slotted: "Fri · 2:00pm", created: "Tue · 9:15am", assignedVendorId: "V-01",
  },
  {
    id: "SR-092", kind: "complaint", resident: "Kemi T.", room: "R218 · Purple & Grey · Oye Ekiti · Block B", location: "Oye Ekiti",
    category: "Plumbing", title: "Bathroom sink drains slowly", detail: "Water sits for over an hour after each use. Roommate says it's been a week.",
    priority: "Normal", status: "in-progress", proposed: "Wed · 11:00am", slotted: "Wed · 11:00am", created: "Mon · 3:22pm", assignedVendorId: "V-02",
  },
  {
    id: "SR-088", kind: "service", resident: "Zainab Kabir", room: "R305 · Purple & Grey · Abuja · Phase 1", location: "Abuja",
    category: "Electrical & HVAC", title: "Socket near bed is loose", detail: "Plug slips out easily. Prefer a replacement, not a tape job.",
    priority: "Normal", status: "resolved", proposed: "Mon · 4:00pm", slotted: "Mon · 4:00pm", created: "Sun · 7:05pm", assignedVendorId: "V-07",
  },
  {
    id: "SR-102", kind: "service", resident: "Tunde Yusuf", room: "R114 · Purple & Grey · Port Harcourt · Block A", location: "Port Harcourt",
    category: "Food & Kitchen", title: "Catering for floor study session", detail: "12 people, 7pm Thursday. Wraps + citrus water + brownies.",
    priority: "Normal", status: "requested", created: "Today · 7:58am", assignedVendorId: null,
  },
  {
    id: "SR-096", kind: "service", resident: "Lara Jones", room: "R401 · Purple & Grey · Ibadan · Block A", location: "Ibadan",
    category: "Plumbing", title: "Toilet flapper sticks", detail: "Keeps running overnight — water bill getting silly.",
    priority: "High", status: "time-proposed", proposed: "Thu · 1:00pm", created: "Tue · 11:44am", assignedVendorId: "V-08",
  },
  {
    id: "SR-107", kind: "complaint", resident: "Saminu D.", room: "R118 · Purple & Grey · Unilag · Block A", location: "Unilag",
    category: "Laundry", title: "Pickup delayed", detail: "Bag has been at reception since yesterday morning.",
    priority: "Normal", status: "requested", created: "Today · 9:31am", assignedVendorId: null,
  },
  {
    id: "SR-103", kind: "service", resident: "Aisha Bello", room: "R206 · Purple & Grey · Abuja · Phase 2", location: "Abuja",
    category: "Cleaning & Housekeeping", title: "Lounge 3 sofa stained", detail: "Stain from last night's event. Would love it cleaned before the finals.",
    priority: "Normal", status: "slotted", proposed: "Thu · 9:00am", slotted: "Thu · 9:00am", created: "Yesterday · 5:02pm", assignedVendorId: "V-03",
  },
  {
    id: "SR-099", kind: "service", resident: "Tomisin Ade", room: "R108 · Purple & Grey · Ibadan · Block A", location: "Ibadan",
    category: "Furniture & Fixtures", title: "Wardrobe hinge broken", detail: "Door sags and won’t close properly.",
    priority: "Normal", status: "requested", created: "Tue · 6:18pm", assignedVendorId: null,
  },
];

export const timeSlots = ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm"] as const;

export const complaintKinds = [
  "Noise", "Cleanliness", "Facility", "Infrastructure", "Safety", "Other",
] as const;

export function nextStatus(s: RequestStatus): RequestStatus | null {
  const i = requestStatuses.indexOf(s);
  return i >= 0 && i < requestStatuses.length - 1 ? requestStatuses[i + 1] : null;
}

export function requestsForVendor(requests: ServiceRequest[], vendorId: string) {
  return requests.filter((r) => r.assignedVendorId === vendorId);
}
export function requestsByCategory(requests: ServiceRequest[], category: ServiceCategory) {
  return requests.filter((r) => r.category === category);
}
export function requestsByLocation(requests: ServiceRequest[], location: Location) {
  return requests.filter((r) => r.location === location);
}
export function vendorsByLocation(vendors: Vendor[], location: Location) {
  return vendors.filter((v) => v.location === location);
}
export function unassignedRequests(requests: ServiceRequest[]) {
  return requests.filter((r) => !r.assignedVendorId);
}
