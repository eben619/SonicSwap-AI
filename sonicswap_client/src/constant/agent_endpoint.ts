const Sonic_Swap_url = "http://0.0.0.0:8000/";

const Get_server_Status = async (): Promise<number | null |string> => {
    try {
        const response = await fetch("/api/server_status");
        console.log("the response is",response.status)
        
        if (!response.ok) {
            console.error("Server responded with an error:", response.status);
            return "Agent_down";
        }

        
        
        return  response.status === 200? "Agent_running":"Agent_down"
    } catch (error) {
        console.error("Error fetching server status:", error);
        return "Retry again";
    }
};


const List_agents = async()=>{
    try{
        const response = await fetch("/api/list_agents");
        if(!response.ok){
            console.error("Server responded with an error:", response.status);
            return "Agent_down";
            }
            const result = await response.json()
        return result.data
    }catch(err){
        console.error("Error fetching agents:", err);
        return "Retry again";

    }
}

const Load_agent = async(name:string)=>{
    try{

        const response = await fetch(`/api/load_agent/${encodeURIComponent(name)}`);
        if(!response.ok){
            console.error("Server responded with an error:", response.status);
            return "Agent_down";
            }
            const result = await response.json()
            return result.data
    }catch(err){
        console.error("Error loading agent:", err);
        return "Retry again";
    }
   

}

interface AgentAction{
    action: string;
    connection:string;
    params:string[];
}

const Agent_Action = async({action,connection,params}:AgentAction)=>{
    try{
        const response = await fetch("/api/agent_action", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                connection: connection,
                action: action,
                params: params 
            })
        });
        if(!response.ok){
            console.error("Server responded with an error:", response.status);
            return "Agent_down";
        }
    }catch(error){
        console.error("Error fetching agent action:", error);
        return "Retry again";
    }
}

export {Get_server_Status,List_agents,Sonic_Swap_url,Load_agent,Agent_Action}
