"use client";

import type { VezraUser } from "@/lib/types";

import { useState } from "react";

import AuthDropdownMenu from "./AuthDropdownMenu";

// -=-=-= Types -=-=-= //
type AuthWidgetProps = {
  user: VezraUser;
};

// =-=-=- Main Component =-=-=- //
export default function AuthWidget({ user }: AuthWidgetProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div className="relative flex items-center justify-center">
        <button onClick={() => handleShowDropdown()}>
          <div className=" z-10 group relative mr-4 h-[62px] w-[62px] rounded-full drop-shadow-md">
            <img
              src={
                user.profileImageUrl
                  ? user.profileImageUrl
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="profile avatar"
              className="h-full w-full rounded-full object-cover object-center"
            />
            <span className="absolute bottom-0 right-0 block h-[17px] w-[17px] rounded-full border-[2.5px] border-white bg-green-700" />
          </div>
        </button>
        {user && showDropdown && (
          <AuthDropdownMenu user={user} toggle={handleShowDropdown} />
        )}
      </div>
    </div>
  );
}
