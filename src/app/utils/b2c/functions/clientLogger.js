/**
 * @param {string} action 
 * @param {object} data 
 */
export async function clientLogger(action, data) {
    try {
        await fetch("http://localhost:3000/api/logger/write", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: action ?? "log",
                data: data,
                userIP: null,
                timestamp: new Date().toISOString(),
            }),
        });
    } catch (error) {
        console.error("Error logging action:", error);
    }
}