type TranslationProps = {
  translation: string;
};

const Translation = (props: TranslationProps) => {
  return <div>{props.translation}</div>;
};

export default Translation;
