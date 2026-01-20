import "../styles/globals.css";
import { GTMInitializer } from "./gtm-initializer";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/gvj6hwn.css" />
      </head>
      <body>
        <GTMInitializer />
        {children}
      </body>
    </html>
  );
}
