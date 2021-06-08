import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";

export default function App() {
  const responseGoogle = (response: any) => {
    console.log(response);
  };

  // const nodeEnv: string = process.env.REACT_APP_GOOGLE_KEY as string;
  // console.log(nodeEnv);

  return (
    <div>
      <GoogleLogin
        clientId="1037965886564-vu3ot759mb426mkcbo492e6dpgbaha01.apps.googleusercontent.com"
        // clientId={API_KEY}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
