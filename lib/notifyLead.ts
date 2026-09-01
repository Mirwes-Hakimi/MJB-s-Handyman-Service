// CLIENT-SIDE: Web3Forms's free tier only accepts submissions that come from
// a browser (it 403s server-to-server calls unless you're on a paid plan with
// an allowlisted IP), so this runs from the form/chat widget directly instead
// of being proxied through our own API route. The access key is meant to be
// public — Web3Forms says so on their own setup page.

export type LeadForNotify = {
  name: string;
  phone: string;
  email?: string;
  jobDescription?: string;
  preferredContactTime?: string;
  source: "form" | "chat";
};

export async function notifyLead(lead: LeadForNotify): Promise<void> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.warn("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY not set — skipping lead notification email.");
    return;
  }

  const sourceLabel = lead.source === "chat" ? "website chat" : "contact form";

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: "MJB's Handyman Website",
        subject: `New lead from ${sourceLabel}: ${lead.name}`,
        email: lead.email || undefined, // sets reply-to so Mark can hit reply
        Name: lead.name,
        Phone: lead.phone,
        "Job description": lead.jobDescription || "(not provided)",
        "Preferred contact time": lead.preferredContactTime || "(not provided)",
        Source: sourceLabel,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      console.error("Web3Forms lead email failed:", res.status, data);
    }
  } catch (err) {
    console.error("Web3Forms lead email failed:", err);
  }
}
