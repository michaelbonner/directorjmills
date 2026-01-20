import groq from "groq";
import { getClient } from "../../lib/sanity";
import { getIsStillsPageEnabled } from "../../functions/getIsStillsPageEnabled";
import { ContactPageClient } from "./contact-client";

async function getData() {
  const about = await getClient().fetch(groq`
    *[_type == "aboutPage"][0]{
      title,
      photo,
      bio,
      representation,
      notableAwards,
      otherAwards,
      seo_title,
      seo_description
    }
  `);

  const isStillsPageEnabled = await getIsStillsPageEnabled();

  return {
    about,
    isStillsPageEnabled,
  };
}

export async function generateMetadata() {
  const { about } = await getData();

  return {
    title: about?.seo_title || "Contact | Director Jeremy Miller",
    description: about?.seo_description || "Contact Director Jeremy Miller",
  };
}

export default async function ContactPage() {
  const { about, isStillsPageEnabled } = await getData();

  return (
    <ContactPageClient
      about={about}
      isStillsPageEnabled={isStillsPageEnabled}
    />
  );
}
