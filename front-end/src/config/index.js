

export const loginFormControls=[
  { name: "email",
    label: "Email",
    placeholder: "Enter your email name",
    componentType: "input",
    type: "email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password ",
    componentType: "input",
    type: "password",
    validation: {
      required: "Password is required",
       minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
    },
  },
]
  
   
