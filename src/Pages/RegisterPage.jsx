import Register from "../components/register/Register";
import Header from "../components/register/Header";
import { useState } from "react";
const RegisterPage = () => {
  const [successMsg, setSuccessMsg] = useState(false);
  return (
    <div className="flex flex-col h-screen w-full justify-center">
      <Header successMsg={successMsg} />
      <Register setSuccessMsg={setSuccessMsg} />
    </div>
  );
};

export default RegisterPage;
