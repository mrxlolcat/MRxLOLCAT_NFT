export async function validateFrameMessage(messageBytes: string) {
  if (!process.env.NEYNAR_API_KEY) {
    console.warn("Neynar API Key missing");
    return null;
  }
  try {
    const response = await fetch("https://api.neynar.com/v2/farcaster/frame/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api_key": process.env.NEYNAR_API_KEY
      },
      body: JSON.stringify({ message_bytes_in_hex: messageBytes })
    });
    const result = await response.json();
    if (result.valid) {
      return result;
    }
    return null;
  } catch (error) {
    console.error("Neynar validation error:", error);
    return null;
  }
}
