import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="p-8">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="font-semibold ">Reviewing Your Quiz Result 🔍</h1>
        <AiOutlineLoading className="animate-spin text-4xl text-primary" />
      </div>
    </div>
  );
};

export default Loading;
