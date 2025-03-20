import { setPassword } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner"; // For notifications

const SetPassword = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

     dispatch(setPassword({password})).then((data) => {  //if fullfilled  if succes true then then runs and later its gets updated in  state.user = action.payload.user || null
          console.log("data from login",data) //meta plus data plustype sab aaucha
          if (data?.payload?.success) {
            toast.success(data.payload.message,{duration:3000})
            window.location.href = "/shop/home"; 
          }else {
            toast.error(data.payload.message || "Registration failed.", {
              duration: 2000,
            });
          }
        })
  
  };

  return (
    <div>
      <h2>Set Your Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPasswordValue(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Setting..." : "Set Password"}
        </button>
      </form>
    </div>
  );
};

export default SetPassword;
