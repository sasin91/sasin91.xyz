import React from "react";

function InputError({ message }: { message: string }) {
  return (
    <div>
      <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
}

export default InputError;
