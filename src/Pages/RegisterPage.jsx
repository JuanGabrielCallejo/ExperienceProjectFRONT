import Register from "../components/register/Register";
import Header from "../components/register/Header";
import { useState } from "react";
const RegisterPage = () => {
  const [successMsg, setSuccessMsg] = useState(false);
  return (
    <div className="flex flex-col">
      <Header successMsg={successMsg} />
      <Register setSuccessMsg={setSuccessMsg} />
    </div>
  );
};

export default RegisterPage;
