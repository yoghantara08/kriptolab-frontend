import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import classNames from "classnames";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

import Button from "@/components/Button/Button";
import usePortfolio from "@/hooks/usePortfolio";
import useWindowSize from "@/hooks/useWindowSize";
import { historyRange } from "@/types";

import usePortoHistory from "../../hooks/usePortoHistory";

const PortfolioChart = () => {
  const { formattedAssetIdrValue } = usePortfolio();
  const { chartData, handleRangeChange, selectedRange } = usePortoHistory();
  const { isMobile } = useWindowSize();
  const { t } = useTranslation();

  const [balance, setBalance] = useState(formattedAssetIdrValue || 0);

  return (
    <section className="rounded-lg border-2 border-borderColor bg-cardBackground p-4 md:p-5">
      <h3 className="text-lg md:text-xl">{t("Total Assets")}</h3>
      <p className="mb-4 mt-2 text-2xl font-semibold md:text-3xl">
        Rp{" "}
        {balance.toLocaleString("id-ID", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </p>

      <div className="flex gap-3">
        {historyRange.map((option) => (
          <Button
            variant={option === selectedRange ? "primary" : "secondary"}
            key={option}
            className={classNames(
              "!h-8 text-xs md:text-sm",
              option !== selectedRange && "bg-transparent",
            )}
            onClick={() => handleRangeChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      {chartData[selectedRange].length !== 0 ? (
        <ResponsiveContainer
          width={"100%"}
          height={isMobile ? 200 : 400}
          className={"mt-2 md:my-4"}
        >
          <AreaChart data={chartData[selectedRange]}>
            <Tooltip
              content={({ active, payload }) => {
                if (!payload?.length) return;

                const value = payload[0].value;
                const timestamp = payload[0].payload.timestamp;

                if (active && value) {
                  setBalance(Number(value));
                } else {
                  const zero = 0;
                  setBalance(zero);
                }
                return (
                  <div className="rounded-lg border-2 border-borderColor bg-cardBackground p-3 px-4 text-sm md:text-base">
                    <p className="text-white">
                      Rp{" "}
                      {Number(value).toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    <p className="text-white">
                      {new Date(timestamp).toLocaleString()}
                    </p>
                  </div>
                );
              }}
              cursor={{ stroke: "#b5b7da" }}
            />

            <Area
              dataKey={"totalInIDR"}
              strokeWidth={2}
              stroke="#579cf0"
              fill="#579cf010"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="my-4 flex h-[200px] items-center justify-center text-gray-500 md:h-[400px]">
          <p className="text-center md:pb-10">
            {t("No data available for the selected time range")}
          </p>
        </div>
      )}
    </section>
  );
};

export default PortfolioChart;
