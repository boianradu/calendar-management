import { Request, Response, Router } from "express";
import { WalletManager } from "../controller/manager";


const router = Router();
const walletManager = new WalletManager();

//  
router.get("/calendars/:id", async (req: Request, res: Response) => {
    try {
        const walletId = req.params.id;
        if (!isUUID(walletId)) {
            res.status(500).send({ error: "Not accepting UUID" });
        }
        const [transactionId, version, currentBalance] = await walletManager.getLatestDetails(walletId);
        const answer = { transactionId: transactionId, version: version, coins: currentBalance }
        res.status(200).json(answer);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: "No wallet found" });
    }
});

export default router;
