import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Called by a Sanity webhook whenever a document is published, updated or
// deleted. The site is small and most pages share data (work items, the stills
// toggle in the menu), so we purge every page rather than tracking which page
// depends on which document.
export async function POST(req) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return new NextResponse("Missing SANITY_REVALIDATE_SECRET", { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody(req, secret);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, type: body?._type ?? null });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, { status: 500 });
  }
}
