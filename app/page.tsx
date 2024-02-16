"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [zip, setZip] = useState<any>("");
  const [phone, setPhone] = useState<any>("");

  const [errorText, setErrorText] = useState<any>("");

  const router = useRouter();

  const isPhoneValid = (phone: any) => {
    const finalPhone = phone
      .split(" ")
      .join("")
      .split("(")
      .join("")
      .split(")")
      .join("")
      .split(".")
      .join("");

    if (finalPhone.toString().length < 10) {
      setErrorText("Phone length too small");
      return;
    }

    if (
      finalPhone.length > 10 &&
      finalPhone[0] != "+" &&
      finalPhone[1] != "1"
    ) {
      console.log("invalid");
      setErrorText("Invalid country code");
      return;
    }

    return true;
  };

  const submitForm = (e: any) => {
    e.preventDefault();

    if (!name) {
      setErrorText("Name is required");
      return;
    }

    if (zip.toString().length > 5) {
      setErrorText("Invalid ZIP");
      return;
    }

    if (password.length < 6) {
      setErrorText("Invalid password");
      return;
    }

    if (!isPhoneValid(phone.trim())) {
      setErrorText("Invalid phone");
      return;
    }

    router.push(`/article?name=${name}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="p-4 max-w-full border rounded-md flex flex-col h-[400px] w-[600px]">
        <div className="mb-1 flex items-center justify-center">
          <span className="mx-3">Name</span>
          <input
            onChange={(e: any) => setName(e.target.value.trim())}
            className="w-full px-3 py-6 h-6 "
            placeholder="Enter name"
          />
        </div>
        <div className="mb-1 flex items-center justify-center">
          <span className="mx-3">Password</span>
          <input
            onChange={(e: any) => setPassword(e.target.value.trim())}
            type="password"
            className="w-full px-3 py-6 h-6 "
            placeholder="Enter password"
          />
        </div>
        <div className="mb-1 flex items-center justify-center">
          <span className="mx-3">Phone</span>
          <input
            onChange={(e: any) => setPhone(e.target.value.trim())}
            className="w-full px-3 py-6 h-6 "
            placeholder="Enter phone"
          />
        </div>
        <div className="mb-1 flex items-center justify-center">
          <span className="mx-3">Zip</span>
          <input
            onChange={(e: any) => setZip(e.target.value.trim())}
            type="number"
            className="w-full px-3 py-6 h-6 "
            placeholder="Enter zip"
          />
        </div>
        <div className="w-full mt-4 flex gap-4 justify-center items-center">
          <button
            onClick={(e: any) => submitForm(e)}
            className="px-6 py-3 border rounded-md"
          >
            Submit
          </button>
          <button className="px-6 py-3 border rounded-md">Clear</button>
        </div>
        {errorText && (
          <div className="text-red-400 w-full flex text-center justify-center mt-4">
            {errorText}
          </div>
        )}
      </form>
    </main>
  );
}
