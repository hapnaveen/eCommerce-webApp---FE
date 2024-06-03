import React from 'react';

const TextField = ({ label, type = "text", name, id, value, onChange, required = false, min = 0, placeholder = "", autoComplete = "" }) => {
  return (
    <div className="sm:col-span-3 grid grid-cols-3 items-center">
      <label htmlFor={id} className="col-span-1 block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <div className="col-span-2 mt-2 flex-grow">
        <div className="flex rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            min={min}
            autoComplete={autoComplete}
            placeholder={placeholder}
            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-0"
          />
        </div>
      </div>
    </div>
  );
};

export default TextField;
