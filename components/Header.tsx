import Link from "next/link";

export default function Header() {
    return (
        <header className="">
            <div className="">
                <Link href="/" className="text-lg font-semibold">
                    CS391 URL Shortener
                </Link>
            </div>
        </header>
    );
}