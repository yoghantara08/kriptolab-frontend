import React from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import Link from "next/link";

import classNames from "classnames";

import Shimmer from "@/components/Loader/Shimmer";
import { PriceChangeResult } from "@/lib/helpers";
import { formatCurrencyValue } from "@/lib/helpers/formatCurrencyValue";
import { ITokenPair, ITokenPrice } from "@/types";

export interface TopCryptoProps {
  tokens: {
    percentage: PriceChangeResult;
    pairDetails: ITokenPair;
    priceDetails?: ITokenPrice;
  }[];
  title: string;
}

const TopCrypto = ({ tokens, title }: TopCryptoProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full rounded-xl border border-borderColor bg-cardBackground/40 py-4 font-sora lg:max-h-[416px] lg:py-5">
      <h3 className="px-4 font-semibold lg:px-6 lg:text-lg">{t(title)}</h3>
      <div className="mt-1 flex flex-col">
        {tokens.length > 0 &&
          tokens.map((token, index) => (
            <Link
              href={`/market/${token.pairDetails?.ticker_id}`}
              key={index}
              className="flex cursor-pointer items-center justify-between gap-0.5 px-4 py-3 hover:bg-secondaryAccent/10 lg:px-6"
            >
              <div className="flex items-center gap-1">
                <span className="w-4 font-inter text-sm text-textSecondary">
                  {index + 1}
                </span>
                <Image
                  src={token.pairDetails.url_logo || ""}
                  alt={token.priceDetails?.name || "Crypto"}
                  className="mr-2 h-6 w-6"
                  width={32}
                  height={32}
                />
                <p className="text-sm font-semibold">
                  {token.priceDetails?.name}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <p className="w-full">
                  {formatCurrencyValue(
                    parseFloat(token.priceDetails?.last || "0"),
                    token.pairDetails?.base_currency?.toUpperCase() || "IDR",
                    true,
                  )}
                </p>
                <p
                  className={classNames(
                    "w-full text-xs",
                    token.percentage.isPositive ? "text-success" : "text-error",
                  )}
                >
                  {token.percentage.formatted}
                </p>
              </div>
            </Link>
          ))}
        {tokens.length === 0 && (
          <div className="flex flex-col items-center justify-between gap-4 pt-3">
            <Shimmer className="h-8 w-[calc(100%-40px)] rounded-xl" />
            <Shimmer className="h-8 w-[calc(100%-40px)] rounded-xl" />
            <Shimmer className="h-8 w-[calc(100%-40px)] rounded-xl" />
            <Shimmer className="h-8 w-[calc(100%-40px)] rounded-xl" />
            <Shimmer className="h-8 w-[calc(100%-40px)] rounded-xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCrypto;
