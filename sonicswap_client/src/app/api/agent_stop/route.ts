import { NextRequest, NextResponse } from "next/server";
import { Sonic_Swap_url } from "@/constant/agent_endpoint";



export async function POST(req: NextRequest,{ params }: { params: { name: string } }) {
  try {
    
    const {name} = params


    const url = `${Sonic_Swap_url}agent/stop`;
    

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     
    });

    if (!response.ok) {
      throw new Error(`Failed to add transaction: ${response.statusText}`);
    }

    const responseData = await response.json();
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Error adding transaction:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}