"use client";
import { FC, useState } from "react";
import { Input } from "@nextui-org/react";
import AuthForm from "@/app/components/AuthForm";
import {useActionState } from "react";
import { continueWithCredentials } from "@/app/actions/auth";

interface Props {}

const SignIn: FC<Props> = () => {
  const [state, signInAction] = useActionState(continueWithCredentials, {});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleValidation = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }
    setError(""); // Clear error message if validation passes
    return true;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      signInAction(formData); // Pass FormData to signInAction
    }
  };

  return (
    <AuthForm
      footerItems={[
        { label: "Create an account", linkText: "Sign Up", link: "/sign-up" },
        {
          label: "Having trouble",
          linkText: "Forget password",
          link: "/forget-password",
        },
      ]}
      btnLabel="Sign In"
      title="Log In"
      action={handleSubmit} // This will now be a valid submit handler
      error={error} // Display error message in AuthForm
      
    >
      <Input 
        name="email" 
        id="email"
        type="text"
        value={email} 
        aria-label="Email"
        placeholder="lookym@gmail.com" 
        onChange={(e) => setEmail(e.target.value)} 
        errorMessage={state.errors?.name?.join(", ")}
        isInvalid={state.errors?.name? true : false}
      />
      <Input
        name="password"
        id="password"
        type="password"
        value={password}
        aria-label="Password"
        placeholder="********"
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={state.errors?.password?.join(", ")}
        isInvalid={state.errors?.password? true : false}
      />
    </AuthForm>
  );
};

export default SignIn;
