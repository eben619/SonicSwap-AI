import { NextRequest, NextResponse } from "next/server";
import { Sonic_Swap_url } from "@/constant/agent_endpoint";



export async function POST(req: NextRequest) {
  try {
    
    const body = await req.json()
    const { connection, action, params=[] } = body
    const data = {
        "connection": connection,
        "action":action,
        "params":params}


    const url = `${Sonic_Swap_url}agent/action`;
    

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
     
    });

    if (!response.ok) {
      throw new Error(`Failed to add transaction: ${response.statusText}`);
    }

    const responseData = await response.json();
    return NextResponse.json({ status: 200 ,data:responseData});
  } catch (error: any) {
    console.error("Error adding transaction:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}