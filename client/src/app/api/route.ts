import { LoadDB } from "@/lib/config/connectDb";
import { NextResponse } from "next/server";
 
(async () => {
    try {
        const client = await LoadDB();
    } catch (error) {
        console.error(error);
    }
})();


export async function GET(request: Request) {
    return NextResponse.json({ todos: "df" })
}
