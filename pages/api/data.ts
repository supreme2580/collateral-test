import { gql } from "@apollo/client"
import client from "../../apollo-client"
import { NextApiRequest, NextApiResponse } from "next"
const convert = require("ether-converter")

// const eth_btc_ratio = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=btc")
//         .then((response: any) => response.json()).then((response: any) => {return response})
//     const result = await client.query({
//         query: gql`
//         {
//             agreementPositions {
//               balance
//             }
//           }
//         `
//     }).catch(e => console.log(e))

async function getBalance() {
    const prices = await fetch("http://api.coinlayer.com/live?access_key=91244bb417e894c175aa47391c8fbeb1")
        .then((response: any) => response.json()).then((response: any) => {return response})
    const eth_btc_ratio = prices.rates.ETH/prices.rates.BTC
    const result = await client.query({
        query: gql`
        {
            agreementPositions {
              balance
            }
          }
        `
    }).catch(e => console.log(e))
    if (result){
        const response = result.data.agreementPositions
        const balanceArray: any[] = []
        response.map((balance: any) => balanceArray.push(balance.balance))
        const balance = balanceArray.reduce(function(a, b){
            return Number(a) + Number(b)
        }, 0)
        const convertedBalance = convert(balance, 'wei').ether * eth_btc_ratio
        return JSON.stringify(convertedBalance)
    }
    else {
        return "{}"
    }
}

export default async function data(req: NextApiRequest, res: NextApiResponse) {
    res.end(await getBalance())
}