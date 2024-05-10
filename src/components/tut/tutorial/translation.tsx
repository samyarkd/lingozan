import { translate } from "@vitalets/google-translate-api";
import { use } from "react";

const Translation = () => {
  const res = use(translate("Привет мир"));

  return <div>{res.text}</div>;
};

export default Translation;
