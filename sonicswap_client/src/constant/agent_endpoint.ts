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


export {Get_server_Status,Sonic_Swap_url}
