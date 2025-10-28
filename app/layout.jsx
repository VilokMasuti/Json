
import "./globals.css";
import LayoutClient from "./Layout-client";

export const metadata = {
  title: "JSON Tree Visualizer",
  description: "Visualize your JSON data beautifully",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Use Tailwind .font-sans which points to General Sans via your CSS or tailwind.config.js */}
      <body className="font-sans antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
