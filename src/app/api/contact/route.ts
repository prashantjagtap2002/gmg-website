import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  mobile?: string;
  email?: string;
  location?: string;
  query?: string;
};

export async function POST(request: Request) {
  let data: ContactPayload;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, mobile, email, location, query } = data;

  if (!name?.trim() || !mobile?.trim() || !email?.trim() || !query?.trim()) {
    return NextResponse.json(
      { error: "Name, mobile, email and query are required." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  // This is where the submission would be emailed, stored in a database,
  // or forwarded to a CRM. For now it is simply logged server-side.
  console.log("[contact-form] New submission:", {
    name,
    mobile,
    email,
    location,
    query,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
