"use client";

import { FC, useState } from "react";
import { Input } from "@nextui-org/react";
import AuthForm from "@/app/components/AuthForm";
import { useActionState } from 'react';
import { continueWithCredentials } from "@/app/actions/auth";

interface Props {}

const SignUp: FC<Props> = () => {
  const [state, signUnAction] = useActionState(continueWithCredentials,{});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleValidation = () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return false;
    }
    setError(""); // Clear error if validation passes
    return true;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      signUnAction(formData,); // Trigger sign-up action with form data
    }
  };

  return (
    <AuthForm
      action={handleSubmit}
      footerItems={[
        {
          label: "Already have an account",
          linkText: "Sign In",
          link: "/sign-in",
        },
        {
          label: "Having trouble",
          linkText: "Forget password",
          link: "/forget-password",
        },
      ]}
      btnLabel="Sign Up"
      title="Sign Up"
      error={error} // Display validation errors
      message={state.success ? "Please check your email." : ""}
    >
      {/* Input for name */}
      <Input
        name="name"
        id="name"
        type="text"
        value={name}
        placeholder="Luis Paulo"
        onChange={(e) => setName(e.target.value)}
        errorMessage={state.errors?.name?.join(", ")}
        isInvalid={state.errors?.name ? true : false}
        aria-label="Name"
      />
      {/* Input for email */}
      <Input
        name="email"
        id="email"
        type="email"
        value={email}
        aria-label="Email"
        placeholder="lookym@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={state.errors?.email?.join(", ")}
        isInvalid={state.errors?.email ? true : false}
      />
      {/* Input for password */}
      <Input
        name="password"
        id="password"
        type="password"
        value={password}
        aria-label="Password"
        placeholder="********"
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={state.errors?.password?.join(", ")}
        isInvalid={state.errors?.password ? true : false}
      />
    </AuthForm>
  );
};

export default SignUp;