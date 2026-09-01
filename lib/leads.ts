// SERVER-ONLY: this file uses Node.js fs — never import it in a Client Component
import fs from "fs";
import path from "path";

export type Lead = {
  name: string;
  phone: string;
  email?: string;
  jobDescription?: string;
  preferredContactTime?: string;
  // 'form' = contact page form; 'chat' = chatbot capture
  source: "form" | "chat";
  // ISO timestamp set automatically by saveLead
  receivedAt: string;
};

// WHY: Vercel runs API routes as serverless functions with a read-only
// filesystem (writable only under /tmp, which doesn't persist between
// invocations anyway). This local JSON file is a dev-only convenience — the
// real delivery to Mark is the client-side email in lib/notifyLead.ts — so a
// write failure here is swallowed rather than failing the whole request.

const LEADS_FILE = path.join(process.cwd(), "leads.json");

export async function saveLead(lead: Omit<Lead, "receivedAt">): Promise<void> {
  const entry: Lead = { ...lead, receivedAt: new Date().toISOString() };

  try {
    // Read existing leads, or start with an empty array if the file doesn't exist yet
    let leads: Lead[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      const raw = fs.readFileSync(LEADS_FILE, "utf-8");
      leads = JSON.parse(raw);
    }

    leads.push(entry);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    // Expected in production (read-only filesystem) — not fatal, just skip local logging.
    console.warn("Could not write leads.json (expected in production):", err);
  }
}
