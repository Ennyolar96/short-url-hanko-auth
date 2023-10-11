import { Logs } from "./dumplog";

const Auth = async (url: string, value: any) => {
  try {
    const req = await fetch(url, {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await req.json();

    return res;
  } catch (error) {
    Logs(error);
  }
};

export default Auth;
