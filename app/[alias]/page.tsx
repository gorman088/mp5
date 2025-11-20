import getUrlByAlias from "@/lib/getUrl";
import { redirect } from "next/navigation";

export default async function RedirectPage({params,}: { params: Promise<{ alias: string }>; }) {
    const { alias } = await params;

    console.log("navigating with alias:", alias);

    const destination = await getUrlByAlias(alias);

    if (destination) {
        redirect(destination);
    }

    redirect("/");
}