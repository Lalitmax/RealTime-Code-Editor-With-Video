import { ConnectDB } from "@/lib/config/db";
 
// Connect to the database
export async function LoadDB() {
    try {
        await ConnectDB();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

 