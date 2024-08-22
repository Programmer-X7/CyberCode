import React from "react";

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return <div>
    <h3>Login</h3>
    <button onClick={handleGoogleLogin}>Login with Google</button>
  </div>;
};

export default Login;
