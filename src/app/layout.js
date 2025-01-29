import "./globals.css";

import Body from "./components/body";

export const metadata = {
  title: "Trendify",
  description: "Trendy Finds, Just a Click Away!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Body children={children} />
    </html>
  );
}
