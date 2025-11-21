"use server";

import getCollection, { LINKS_COLLECTION } from "@/db";
import getUrlByAlias from "./getUrl";
import { LinkProps } from "@/types/LinkProps";

export default async function insertUrl(entry: LinkProps): Promise<string> {
    const { url, alias } = entry;

    if (!url || !alias) {
        return "Both the URL and alias are required.";
    } else if (
        url.startsWith("https://mp5-lnih.vercel.app/") ||
        url.startsWith("http://localhost:3000")
    ) {
        return "Invalid URL: you cannot shorten this site itself.";
    } else if (encodeURIComponent(alias) !== alias) {
        return "Invalid alias: only URL-safe characters are allowed.";
    }
    try {
        const response = await fetch(url);
        if (response.status < 200 || response.status >= 500) {
            console.log("invalid url response", response.status);
            return "Invalid URL: received status " + response.status;
        }
    } catch {
        console.log("failed to fetch");
        return "Could not verify the URL. Please try again.";
    }

    const existing = await getUrlByAlias(alias);
    if (existing) {
        return "Invalid alias: this alias is already in use.";
    }

    const linksCollection = await getCollection(LINKS_COLLECTION);
    const result = await linksCollection.insertOne({
        alias,
        url,
    });

    return result.acknowledged
        ? ""
        : "Something went wrong while saving. Please try again.";
}