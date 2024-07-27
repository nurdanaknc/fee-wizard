import axios, { AxiosError } from "axios";
import * as https from "https";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const promiseTimeout = (timeout = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(null);
    }, timeout);
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { endpoint } = req.query;

  let url = Array.isArray(endpoint) ? endpoint?.join("/") : endpoint;

  const queryStringParse = req.url!.split("?");

    if (queryStringParse.length > 1) {
      url += "?" + queryStringParse[1];
    }

  if (url) {
    const session: any = await getServerSession(req, res, authOptions);
    const startTime = Date.now();
    const accessToken = req.headers.authorization;

    const headers: any = {
      "Accept-Language": req.headers["accept-language"] || "tr",
    };
    if (accessToken) {
      headers.Authorization = `${accessToken}`;
    }

    await axios
      .request({
        url: url,
        method: req.method,
        data: req.body,
        httpsAgent: httpsAgent,
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: headers,
      })
      .then((response) => {
        if (response.status !== 200) {
          return res.json(response?.data.data);
        }
        return res.status(200).json(response?.data || {});
      })
      .catch((e: AxiosError) => {
        return res.status(e.response?.status || 500).json(e.response?.data);
      });
  } else {
    res.status(404).json({ data: "Api Not Found" });
  }
}
