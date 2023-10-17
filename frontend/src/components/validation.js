//email validator
export function isValidEmail(email) {
  // Regular expression for a valid email address
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Test the email against the regex pattern
  return emailRegex.test(email);
}

export const formAction = ({ states, onChangeHandler }) => {
  const { signupData } = states;

  // console.log(onclick)
  const attributes = [
    {
      label: "Full Name",
      name: "name",
      type: "text",
      value: signupData.name,
      onChange: onChangeHandler,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      value: signupData.email,
      onChange: onChangeHandler,
      error: Boolean(states.emailError),
      helperText: states.emailError,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "number",
      value: signupData.phone,
      onChange: onChangeHandler,
      error: Boolean(states.phoneError),
      helperText: states.phoneError,
    },
    {
      label: "Your Address",
      name: "address",
      type: "text",
      value: signupData.address,
      onChange: onChangeHandler,
    },
    {
      label: "department",
      labelId: "demo-simple-select-label",
      id: "demo-simple-select",
      type: "select-department",
      name: "department",
      onChange: onChangeHandler,
      value:signupData.department
    },
    {
      label: "role",
      labelId: "demo-simple-select-label",
      id: "demo-simple-select",
      type: "select-role",
      name: "role",
      onChange: onChangeHandler,
      value:signupData.role
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      value: signupData.password,
      onChange: onChangeHandler,
      error: Boolean(states.passwordError),
      helperText: states.passwordError,
    },
    {
      label: "Confirm Password",
      name: "co_password",
      type: "password",
      value: signupData.co_password,
      onChange: onChangeHandler,
      error: Boolean(states.matchError),
      helperText: states.matchError,
    },
  ];

  return attributes;
};
