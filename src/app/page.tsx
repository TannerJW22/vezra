import Image from "next/image";

import SignInForm from "./SignInForm";

import kha from "public/img/kha-login-page.png";

// =-=-=- Main Component =-=-=- //
export default function SignInPage() {
  return (
    <main>
      <div className="flex justify-center w-full h-screen min-h-[400px] min-w-[525px]">
        <div className="h-full w-full min-w-[600px] bg-primary-500" />
        <div className=" shrink h-full w-full">
          <Image
            className="object-cover w-full h-full"
            src={kha}
            alt="vezra logo"
            width={1150}
            height={500}
          />
        </div>
      </div>
      <SignInForm />
    </main>
  );
}
