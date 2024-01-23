import { Menu } from "../components/Menu";
import Register from "../components/register/Register";

const RegisterPage = () => {

  return (
    <>
      <Menu />
      <Register />
    </>
  );
};

export default RegisterPage;

// import React from 'react';
// import { useForm } from "react-hook-form";

// function RegisterPage() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const onSubmit = data => console.log(data);
//   // {"email":"abc@gmail.com"}

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
//       {errors.email?.type === 'required' && <span> This field is required</span>}
//       {errors.email?.type === 'pattern' && <span> Invalid email</span>}

//       <button type="submit">submit</button>
//     </form>
//   );
// }

// export default RegisterPage;
