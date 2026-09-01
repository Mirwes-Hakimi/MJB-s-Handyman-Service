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

// WHY: Vercel runs API routes as serverless functions in temporary containers.
// Any file written with fs.writeFile disappears when the container is recycled.
// Local JSON storage only works in development (npm run dev). The email to
// Mark is sent separately, client-side — see lib/notifyLead.ts for why.

const LEADS_FILE = path.join(process.cwd(), "leads.json");

export async function saveLead(lead: Omit<Lead, "receivedAt">): Promise<void> {
  const entry: Lead = { ...lead, receivedAt: new Date().toISOString() };

  // Read existing leads, or start with an empty array if the file doesn't exist yet
  let leads: Lead[] = [];
  if (fs.existsSync(LEADS_FILE)) {
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    leads = JSON.parse(raw);
  }

  leads.push(entry);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}
