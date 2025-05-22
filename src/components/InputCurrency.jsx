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
      <select
        name={inputName}
        id={inputName}
        className="border p-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-black dark:text-white rounded-xl shadow-md"
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
    </div>
  );
};

export default InputCurrency;
