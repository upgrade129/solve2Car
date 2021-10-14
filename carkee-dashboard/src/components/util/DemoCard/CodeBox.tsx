import { FC, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import syntaxTheme from './HLTheme';
import CardToolBar from './CardToolbar';

interface CodeBoxProps {
  value: string;
  language?: string;
}

const CodeBox: FC<CodeBoxProps> = ({ value, language }) => {
  const [codeExpand, setCodeExpand] = useState<boolean>(false);

  const exapandCallBack = () => {
    setCodeExpand(!codeExpand);
  };

  return (
    <>
      <CardToolBar
        code={value}
        expand={exapandCallBack}
        isExpand={codeExpand}
      />
      <div
        className={`code-box-highlight ${codeExpand ? 'd-block' : 'd-none'}`}
      >
        <SyntaxHighlighter language={language} style={syntaxTheme}>
          {value}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export default CodeBox;
