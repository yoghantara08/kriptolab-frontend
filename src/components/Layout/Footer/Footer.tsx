import React from "react";
import { useTranslation } from "react-i18next";

import Link from "next/link";

import classNames from "classnames";

import { GithubIcon } from "@/assets/icons";

import { footerLinks } from "./footerdata";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="px-5 lg:px-10">
      <section
        className={classNames(
          "flex flex-col gap-5 border-b-2 border-borderColor pb-6",
          "lg:flex-row lg:items-start lg:justify-between",
        )}
      >
        <div className="order-2 flex items-center gap-6 text-white lg:order-1">
          <Link
            href="https://github.com/yoghantara08"
            target="_blank"
            rel="noreferrer"
            title="Github"
          >
            <GithubIcon className="size-11 cursor-pointer hover:text-primaryAccent md:size-12" />
          </Link>
          {/* <TwitterIcon className="h-8 w-8 cursor-pointer hover:text-secondaryAccent lg:h-9 lg:w-9" />
          <DiscordIcon className="h-8 w-8 cursor-pointer hover:text-primaryAccent lg:h-9 lg:w-9" /> */}
        </div>

        <div className="order-1 grid grid-cols-2 gap-4 lg:order-2 lg:flex lg:gap-16">
          {footerLinks.map((footer) => (
            <div key={footer.title}>
              <h3 className="font-sora font-semibold text-white lg:text-lg">
                {t(footer.title)}
              </h3>
              <ul className="mt-2 flex flex-col gap-y-1 text-sm lg:text-base">
                {footer.links.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-textSecondary hover:text-white"
                    >
                      {t(item.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col justify-between gap-1 pb-7 pt-4 sm:flex-row sm:items-center">
        <div className="text-sm">© 2024 - KriptoLab</div>
        <Link
          href={"#"}
          className="cursor-pointer text-sm text-textSecondary hover:text-white"
        >
          {t("Privacy Policy")}
        </Link>
      </section>
    </footer>
  );
};

export default Footer;
