import { NextApiRequest, NextApiResponse } from "next"

export default async function conv(req: NextApiRequest, res: NextApiResponse) {
    res.end(JSON.stringify("2"))
}