"use client";

import insertUrl from "@/lib/insertUrl";
import { useEffect, useState } from "react";

export default function HomeContent() {
    const [longUrl, setLongUrl] = useState("");
    const [aliasValue, setAliasValue] = useState("");
    const [feedback, setFeedback] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [baseUrl, setBaseUrl] = useState("");
    const [hasCopied, setHasCopied] = useState(false);

    async function handleSubmit() {
        setIsSubmitting(true);
        setFeedback("");
        setHasCopied(false);

        try {
            const validationMessage = await insertUrl({
                url: longUrl,
                alias: aliasValue,
            });

            if (validationMessage.length > 0) {
                setFeedback(validationMessage);
            } else {
                setGeneratedLink(`${baseUrl}/${aliasValue}`);
            }
        } catch (e) {
            console.error(e);
            setFeedback("Unexpected error.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const copyToClipboard = () => {
        if (generatedLink) {
            navigator.clipboard.writeText(generatedLink);
            setHasCopied(true);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setBaseUrl(window.location.origin);
        }
    }, []);

    return (
        <div className="w-full rounded-md border-2 border-white bg-red-400">
            <form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
                <div>
                    <label htmlFor="url" className="text-sm font-medium">
                        Long URL
                    </label>
                    <input
                        placeholder="YOUR URL HERE"
                        name="url"
                        id="url"
                        className="w-full"
                        required
                        disabled={isSubmitting}
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="alias" className="text-sm font-medium">
                        Custom alias
                    </label>
                    <div className="flex items-center">
                        <input
                            placeholder="YOUR ALIAS HERE"
                            name="alias"
                            id="alias"
                            required
                            disabled={isSubmitting}
                            className="w-full"
                            value={aliasValue}
                            onChange={(e) => setAliasValue(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full "
                >
                    {isSubmitting ? "Loading..." : "Generate short URL"}
                </button>

                {feedback && (
                    <div>
                        {feedback}
                    </div>
                )}
            </form>

            {generatedLink && (
                <div className="mt-2 bg-white p-3 text-black">
                    <div className="text-xs text-black mt-4">
                        Short URL created:
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href={generatedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {generatedLink}
                        </a>
                        <button onClick={copyToClipboard}>
                            {hasCopied ? "Copied" : "Copy"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}