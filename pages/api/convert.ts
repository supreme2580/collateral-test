import { NextApiRequest, NextApiResponse } from "next"

async function getData() {
}

export default async function convert(req: NextApiRequest, res: NextApiResponse) {
    try {
        const eth_btc_ratio: any = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=btc")
        .then((response: any) => response.json()).then((response: any) => {return response})
        console.log("hi")
        res.end(eth_btc_ratio.ethereum.btc.toString())
    } catch (error) {
        console.log(error)
        res.end("0")
    }
}