import { NextApiRequest, NextApiResponse } from "next"

export default async function convert_eth_to_btc(req: NextApiRequest, res: NextApiResponse) {
    res.end(2)
}