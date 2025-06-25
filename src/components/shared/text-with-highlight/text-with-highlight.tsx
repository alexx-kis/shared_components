// %======================== TextWithHighlight ========================% //

type TextWithHighlightProps = {
  text?: string;
  highlightClass: string;
  children?: string;
} & ({ text: string; } | { children: string; });

function TextWithHighlight({ text, children, highlightClass }: TextWithHighlightProps): React.JSX.Element {
  const content = text || children || '';

  const regex = /\\h(.*?)\\h/g;
  const parts = content.split(regex);

  return (
    <>
      {
        parts.map((part, index) => {
          if (index % 2 !== 0) {
            return <span key={index} className={highlightClass}>{part}</span>;
          }
          return part;
        })
      }
    </>
  );
}

export default TextWithHighlight;
