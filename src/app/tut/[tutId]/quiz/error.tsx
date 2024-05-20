"use client";

import { AiOutlineBug } from "react-icons/ai";

const Error = () => {
  return (
    <div className="p-8">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="font-semibold ">
          An Unexpected Error occurred please refresh the page
        </h1>
        <AiOutlineBug className="text-4xl text-primary" />
      </div>
    </div>
  );
};

export default Error;
