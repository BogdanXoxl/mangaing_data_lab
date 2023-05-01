"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
  tabs: {
    [key: string]: ReactNode;
  };
};

export const Tabs = ({ tabs }: Props) => {
  const [currentTab, setCurrentTab] = useState<keyof Props["tabs"]>(Object.keys(tabs)?.[0]);

  return (
    <div>
      <div className="mx-auto flex w-full max-w-2xl justify-start gap-x-2 py-2.5">
        {Object.keys(tabs).map((tab) => (
          <button
            className={`
              min-w-[100px] rounded-md  p-2 
              ${tab === currentTab ? "bg-primary text-white" : "border-2 border-gray-200"}
            `}
            type="button"
            key={tab}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabs[currentTab]}
    </div>
  );
};
