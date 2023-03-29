import { gql } from "@apollo/client"
import client from "../../apollo-client"
import { NextApiRequest, NextApiResponse } from "next"
const convert = require("ether-converter")

async function getData() {
    const eth_btc_ratio: any = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=btc").then((response: any) => response.json()).then((response: any) => {return response})
    const result = await client.query({
        query: gql`
        {
            agreementPositions {
              balance
            }
          }
        `
    }).catch(e => console.log(e))
    if (result && eth_btc_ratio){
        const response = result.data.agreementPositions
        const balanceArray: any[] = []
        response.map((balance: any) => balanceArray.push(balance.balance))
        const balance = balanceArray.reduce(function(a, b){
            return Number(a) + Number(b)
        }, 0)
        const convertedBalance = convert(balance, 'wei').ether * eth_btc_ratio.ethereum.btc
        return JSON.stringify(convertedBalance)
    }
    else {
        return "{}"
    }
}

export default async function data(req: NextApiRequest, res: NextApiResponse) {
    res.end(await getData())
}