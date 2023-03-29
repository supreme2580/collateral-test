import { NextApiRequest, NextApiResponse } from "next"

async function getData() {
    try {
        const eth_btc_ratio: any = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=btc")
        .then((response: any) => response.json()).then((response: any) => {return response})
        return eth_btc_ratio.ethereum.btc.toString()
    } catch (error) {
        console.log(error)
    }
}

export default async function convert(req: NextApiRequest, res: NextApiResponse) {
    res.end(await getData())
}