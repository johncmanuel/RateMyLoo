import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { initFirebaseAdminApp } from "@/utils/initFirebaseAdmin";

initFirebaseAdminApp();
initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Including unused return value to demonstrate codemod
    // eslint-disable-next-line no-unused-vars
    const { user } = await setAuthCookies(req, res, { token: undefined });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ status: true });
};

export default handler;
