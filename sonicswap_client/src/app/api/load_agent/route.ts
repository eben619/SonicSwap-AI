import { NextRequest, NextResponse } from "next/server";
import { Sonic_Swap_url } from "@/constant/agent_endpoint";



export async function POST(req: NextRequest) {
  try {
    
    const { name } = await req.json();
    //check if name is present
    if (!name) {
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          },
    })}
          


    const url = `${Sonic_Swap_url}agents/${name}/load`;
    

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
    return NextResponse.json( { status: 200, data:responseData });
  } catch (error: any) {
    console.error("Error adding transaction:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}