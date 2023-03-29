import { NextApiRequest, NextApiResponse } from "next"

export default async function convert(req: NextApiRequest, res: NextApiResponse) {
    const eth_btc_ratio: any = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=btc")
        .then((response: any) => response.json()).then((response: any) => {return response})
    if (eth_btc_ratio) {
        res.end(eth_btc_ratio.ethereum.btc.toString())
    }
}