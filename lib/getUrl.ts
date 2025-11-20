import getCollection, { LINKS_COLLECTION } from "@/db";

export default async function getUrlByAlias(aliasKey: string): Promise<string | null> {
    if (!aliasKey) {
        return null;
    }

    const links = await getCollection(LINKS_COLLECTION);
    const record = await links.findOne({ alias: aliasKey });

    if (!record) {
        return null;
    }

    return record.url;
}