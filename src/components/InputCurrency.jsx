import React from "react";

const InputCurrency = ({ label, inputName, action, value, data }) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputName}
        className="text-lg text-neutral-600 dark:text-neutral-200"
      >
        {label}
      </label>
      <div className="relative">
        <select
          name={inputName}
          id={inputName}
          className="w-full appearance-none border p-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-black dark:text-white rounded-xl shadow-md"
          onChange={action}
          value={value}
        >
          <option value="" disabled>
            Choose Currency
          </option>
          {data &&
            data.data &&
            Object.entries(data.data).map(([code, details], index) => {
              return (
                <option key={index} value={code}>
                  {code} ({details.name})
                </option>
              );
            })}
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 9l-7 7-7-7"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InputCurrency;
