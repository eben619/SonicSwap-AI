import { NextRequest, NextResponse } from "next/server";
import { Sonic_Swap_url } from "@/constant/agent_endpoint";

const KEY = process.env.COINGECKO_API_KEY 
const COINGECKO_API = "https://api.coingecko.com/api/v3/coins"
const HEADERS = {
    "accept": "application/json",
    "x-cg-demo-api-key": KEY
}
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
        const token_id = searchParams.get("token_id");

        if (!token_id) {
            return NextResponse.json({ error: "token_id is required" }, { status: 400 });
        }

        const url = `${COINGECKO_API}/${token_id}`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        "accept": "application/json",
        "x-cg-demo-api-key": KEY || ""
            
        },
        });
    


    

    if (!response.ok) {
      throw new Error(`Failed to add transaction: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log("the response is data",responseData)
    return NextResponse.json({ status: 200,data:responseData });
  } catch (error: any) {
    console.error("Error adding transaction:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}