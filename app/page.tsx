import HomeContent from "@/components/HomeContent";
import "@/app/globals.css"

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center py-10 text-black">
            <section className="text-center">
                <div>
                    <h1 className="text-lg font-bold text-white tracking-tight">
                        URL Shortener Tool
                    </h1>
                    <p className="text-white text-lg">
                        Transform long, messy URLs into short links you can share anywhere.
                    </p>
                </div>
                <HomeContent />
            </section>
        </main>
    );
}