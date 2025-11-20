import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body className={`antialiased min-h-screen`}>
                <Header />
                {children}
            </body>
        </html>
    );
}