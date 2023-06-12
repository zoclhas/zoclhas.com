import "@/styles/globals.scss";

import { PageLoad } from "@/components/page-load";
import { NavBar } from "@/components/navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                {/* <PageLoad /> */}
                {children}
            </body>
        </html>
    );
}
