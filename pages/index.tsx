import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

export default function Home() {

  const APIURL = 'https://thegraph.com/hosted-service/subgraph/okhaimie-dev/test-nation3-colleretal-agreem'
  const tokensQuery = `
    query deposits{
      collateralDeposits {
        amount
      }
    }
  `
  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With"
    }
  })
  client
  .query({
    query: gql(tokensQuery),
  })
  .then((data) => console.log('Subgraph data: ', data))
  .catch((err) => {
    console.log('Error fetching data: ', err)
  })
  return(
    <>
      <Head>
        <title>Collateral Test</title>
      </Head>
      <div className="w-full min-h-screen bg-black flex flex-col justify-center">
        <div className="w-full text-center">
          <p className="text-white text-3xl">Total deposit collateral: 500ETH</p>
        </div>
      </div>
    </>
  )
}