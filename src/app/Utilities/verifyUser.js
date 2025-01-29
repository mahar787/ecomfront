import React from "react";
import postReq from "./postReq";
async function verifyUser(token) {
  try {
    let result = await postReq(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/verify`,
      {
        token,
      }
    );
    if (result.statusCode == 200) {
      return { id: result.response.data.id, fullResult: result };
    } else {
      return res.response.data;
    }
  } catch (error) {
    console.log("error", error);
  }
}
export default verifyUser;
