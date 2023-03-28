import { gql } from "@apollo/client"
import client from "../../apollo-client"
import { NextApiRequest, NextApiResponse } from "next"
import convert from "ether-converter"

async function getData() {
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
        const convertedBalance = convert(balance, 'wei')
        return JSON.stringify(convertedBalance.ether)
    }
    else {
        return "{}"
    }
}

export default async function data(req: NextApiRequest, res: NextApiResponse) {
    res.end(await getData())
}