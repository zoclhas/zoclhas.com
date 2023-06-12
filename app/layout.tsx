import "@/styles/globals.scss";

import { PageLoad } from "@/components/page-load";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <PageLoad />
                {children}
            </body>
        </html>
    );
}
