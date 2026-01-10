
export const scrapData = async (req, res) => {
    
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }



}