import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

export default function Home() {
  const [value, setValue] = useState("");
  const handleInputChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <div className="w-full h-screen bg-black flex justify-between text-white overflow-hidden font-Lato">
      <div className="border-2 border-gray-500 w-full h-screen outline-none overflow-auto flex flex-col">
        <div className="p-4 text-xl font-bold">
          <h1>Type Here</h1>
        </div>
        <textarea
          className="bg-transparent h-full w-full outline-none resize-none text-white border-0 p-4"
          value={value}
          onChange={handleInputChange}
        />
      </div>
      <div className="border-2 border-gray-500 w-full h-screen outline-none overflow-auto">
        <div className="p-4 text-xl font-bold">
          <h1>Markdown</h1>
        </div>
        <div className="p-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, "")}
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {value}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
