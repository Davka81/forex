import axios from "axios";

// const GOOGLE_IDENTITY_URL = "https://oauth2.googleapis.com/tokeninfo";
const GOOGLE_IDENTITY_URL = "https://www.googleapis.com/oauth2/v3/userinfo";
const GOOGLE_REVOKE_URL = "https://oauth2.googleapis.com/revoke";

const SECRET_KEY = "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";

export default class Google {
  public async authorize(idToken: string) {
    const googleOAuth = await axios.request({
      method: "GET",
      url: `${GOOGLE_IDENTITY_URL}`,
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const { name, given_name, family_name, email } = googleOAuth.data;

    return { name, given_name, family_name, email };
  }

  public async revoke(idToken: string) {
    try {
      await axios.post(GOOGLE_REVOKE_URL, {
        token: idToken,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}