import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMenu } from "react-icons/io5";

import Image from "next/image";
import Link from "next/link";

import classNames from "classnames";

import { GithubIcon } from "@/assets/icons";
import Button from "@/components/Button/Button";
import Drawer from "@/components/Drawer/Drawer";
import useAuth from "@/features/auth/hooks/useAuth";
import openPage from "@/lib/helpers/openPage";

import TokenSearchBar from "./TokenSearchBar/TokenSearchBar";
import ChangeLanguage from "./ChangeLanguage";
import { NavbarProps } from "./Navbar";
import UserDropdown from "./UserDropdown";

const MobileNavbar = ({}: NavbarProps) => {
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  const [menu, setMenu] = useState(false);

  return (
    <nav
      className={classNames(
        "sticky top-0 flex h-[72px] w-full items-center justify-between gap-4 px-4",
        "z-20 border-b-2 border-b-borderColor bg-background",
      )}
    >
      <div className="flex items-center gap-3">
        <Link href={"/"} className="h-8 w-8">
          <Image
            alt="KriptoLab"
            src={"/images/logo/kriptolab.svg"}
            width={200}
            height={200}
            className="h-full w-full"
            priority
          />
        </Link>
        <div
          className="flex cursor-pointer items-center gap-0.5 text-textSecondary"
          onClick={() => setMenu(true)}
        >
          <IoMenu className="h-7 w-7" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <TokenSearchBar />
        <ChangeLanguage />
        {!isLoggedIn ? (
          <Link href={"/auth/login"}>
            <Button variant="secondary" className="h-9 pb-0.5 text-sm">
              {t("Login")}
            </Button>
          </Link>
        ) : (
          <UserDropdown />
        )}
      </div>

      <Drawer
        isOpen={menu}
        onClose={() => setMenu(false)}
        position="left"
        containerClassName="!rounded-none w-[70%]"
      >
        <Link href={"/"}>
          <Image
            alt="KriptoLab"
            src={"/images/logo/kriptolab-full.svg"}
            width={200}
            height={200}
            className="mb-5 h-20 w-40"
          />
        </Link>
        <div className="flex flex-col gap-14 pt-2 text-lg font-semibold text-textSecondary">
          <Link
            href={"/market"}
            // onClick={() => setMenu(false)}
            className="hover:text-primaryAccent"
          >
            Market
          </Link>

          <Link
            href={"/tutorial"}
            // onClick={() => setMenu(false)}
            className="hover:text-primaryAccent"
          >
            Tutorial
          </Link>
        </div>

        <div className="absolute bottom-10 flex items-center gap-6 text-white">
          <GithubIcon
            className="h-8 w-8 cursor-pointer hover:text-success lg:h-9 lg:w-9"
            onClick={(e) => openPage(e, "https://github.com/yoghantara08")}
          />
        </div>
      </Drawer>
    </nav>
  );
};

export default MobileNavbar;
