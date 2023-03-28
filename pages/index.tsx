import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("")
  async function getData() {
    const res = await fetch("/api/data").then((response: any) => response.json()).then((response: any) => {return response})
    return res
  }
  useEffect(() => {
    async function getResponse(){
      const res: any = await getData()
      console.log(res)
      return setData(res)
    }
    getResponse()
  }, [])
  return(
    <>
      <Head>
        <title>Collateral Test</title>
      </Head>
      <div className="w-full min-h-screen bg-black flex flex-col justify-center">
        <div className="w-full text-center">
          <p className="text-white text-3xl">Total deposit collateral: {data}ETH</p>
        </div>
      </div>
    </>
  )
}