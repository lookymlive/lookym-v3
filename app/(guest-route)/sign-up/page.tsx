"use client";

import { FC, useState } from "react";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import AuthForm from "@/app/components/AuthForm";
import { useActionState } from 'react';
import { continueWithCredentials } from "@/app/actions/auth";

interface Props {}

const SignUp: FC<Props> = () => {
  const [state, signUpAction] = useActionState(continueWithCredentials,{});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [showStoreDetails, setShowStoreDetails] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeType, setStoreType] = useState("");
  const [description, setDescription] = useState("");

  const handleRoleChange = (value: string) => {
    setRole(value);
    setShowStoreDetails(value === 'store');
  };

  const handleValidation = () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return false;
    }
    
    if (role === 'store' && (!storeName || !storeType)) {
      setError("Store details are required");
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
      formData.append("role", role);

      if (role === 'store') {
        formData.append("storeName", storeName);
        formData.append("storeType", storeType);
        formData.append("description", description);
      }

      signUpAction(formData);
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
      error={error}
      message={state.success ? "Please check your email." : ""}
    >
      <Input
        name="name"
        id="name"
        type="text"
        value={name}
        placeholder="Enter your Name"
        onChange={(e) => setName(e.target.value)}
        errorMessage={state.errors?.name?.join(", ")}
        isInvalid={state.errors?.name ? true : false}
        aria-label="Name"
      />
      <Input
        name="email"
        id="email"
        type="email"
        value={email}
        aria-label="Email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={state.errors?.email?.join(", ")}
        isInvalid={state.errors?.email ? true : false}
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
        isInvalid={state.errors?.password ? true : false}
      />
      <Select
        label="Account Type"
        placeholder="Select your account type"
        selectedKeys={[role]}
        onChange={(e) => handleRoleChange(e.target.value)}
      >
        <SelectItem key="user" value="user">Regular User</SelectItem>
        <SelectItem key="store" value="store">Store Owner</SelectItem>
      </Select>

      {showStoreDetails && (
        <div className="space-y-4">
          <Input
            name="storeName"
            label="Store Name"
            placeholder="Enter your store name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <Select
            label="Store Type"
            placeholder="Select store type"
            value={storeType}
            onChange={(e) => setStoreType(e.target.value)}
          >
            <SelectItem key="clothing" value="clothing">Clothing Store</SelectItem>
            <SelectItem key="shoes" value="shoes">Shoe Store</SelectItem>
            <SelectItem key="other" value="other">Other</SelectItem>
          </Select>
          <Textarea
            label="Store Description"
            placeholder="Describe your store"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      )}
    </AuthForm>
  );
};

export default SignUp;