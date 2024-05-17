type TranslationProps = {
  translation: string;
  original: string;
};

const Translation = (props: TranslationProps) => {
  return (
    <div>
      <p>{props.original}</p>
      <p>{props.translation}</p>
    </div>
  );
};

export default Translation;
