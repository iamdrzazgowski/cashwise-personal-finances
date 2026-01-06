import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'CashWise - Your Financial Partner',
    description:
        'CashWise is your financial partner, helping you manage your money and investments.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className={`${inter.className} `}>
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
