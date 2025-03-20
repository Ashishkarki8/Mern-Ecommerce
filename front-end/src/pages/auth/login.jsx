// import CommonForm from "@/components/common/form";
// import { Button } from "@/components/ui/button";
// import { loginFormControls } from "@/config";
// import { loginUser } from "@/store/auth-slice";
// import { MailOpen } from "lucide-react";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const initialState={
//   email:'',
//   password:'',
// }

// const AuthLogin = () => {
//   const [formData, setFormData] = useState(initialState);
//   console.log("parent component is also rendering")
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

//   console.log("isloading", isLoading ,"isAuthenticated",isAuthenticated,"user",user);

//   const onSubmit = (event) => {
//     console.log("submit processed login ")
//      event.preventDefault(); //page nai refresh huncha so so use garnai p
//     dispatch(loginUser(formData)).then((data) => {  //if fullfilled  if succes true then then runs and later its gets updated in  state.user = action.payload.user || null
//       console.log("data from login",data) //meta plus data plustype sab aaucha
//       if (data?.payload?.success) {
//         toast.success(data.payload.message,{duration:3000})

//       }else {
//         toast.error(data.payload.message || "Registration failed.", {
//           duration: 2000,
//         });
//       }
//     })
//   };
//   const handleGoogleLogin = (event) => {
//     event.preventDefault();
//     window.location.href = "http://localhost:9000/api/auth/google";
//   };

//   return (
//     <section className="bg-white">
//       <div className="flex items-center justify-center px-4 py-10 bg-white border sm:px-6 lg:px-8 sm:py-16 lg:py-24">
//         <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
//           <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
//             Sign In
//           </h2>

//           <p>
//             Dont have account?
//             <Link
//               className="py-2 ml-2 text-blue-700 hover:underline"
//               to="/auth/register"
//             >create
//             </Link>
//           </p>

//           {/* CommonForm manages form data internally with react-hook-form */}
//           <CommonForm
//             formControls={loginFormControls}
//             buttonText={"Login"}
//             formData={formData}
//             setFormData={setFormData}
//             onSubmit={onSubmit}  // Here, you pass onSubmit to handle the form submission
//           />
//           <Button onClick={handleGoogleLogin} className='w-full mt-1' variant="destructive"> <MailOpen /> Login with Email</Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AuthLogin;

import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { MailOpen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const [formData, setFormData] = useState(initialState);
  console.log("parent component is also rendering");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  console.log(
    "isloading",
    isLoading,
    "isAuthenticated",
    isAuthenticated,
    "user",
    user
  );

  const onSubmit = (event) => {
    console.log("submit processed login ");
    event.preventDefault(); //page nai refresh huncha so so use garnai p
    dispatch(loginUser(formData)).then((data) => {
      //if fullfilled  if succes true then then runs and later its gets updated in  state.user = action.payload.user || null
      console.log("data from login", data); //meta plus data plustype sab aaucha
      if (data?.payload?.success) {
        toast.success(data.payload.message, { duration: 3000 });
      } else {
        toast.error(data.payload.message || "Registration failed.", {
          duration: 2000,
        });
      }
    });
  };
  const handleGoogleLogin = (event) => {
    event.preventDefault();
    window.location.href = "http://localhost:9000/api/auth/google";
  };

  return (
    <section className="bg-white">
      <div className="flex items-center justify-center px-4 py-10 bg-white border sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Sign In
          </h2>

          <p>
            Dont have account?
            <Link
              className="py-2 ml-2 text-blue-700 hover:underline"
              to="/auth/register"
            >
              create
            </Link>
          </p>

          {/* CommonForm manages form data internally with react-hook-form */}
          <CommonForm
            formControls={loginFormControls}
            buttonText={"Login"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit} // Here, you pass onSubmit to handle the form submission
          />
          <Button
            onClick={handleGoogleLogin}
            className="w-full mt-1"
            variant="destructive"
          >
            {" "}
            <MailOpen /> Login with Email
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AuthLogin;
