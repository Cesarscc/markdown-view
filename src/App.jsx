import { useEffect, useState } from "react";
import "./App.css";
import ExpandIcon from "./assets/ExpandIcon";
import FreeCodeCamp from "./assets/FreeCodeCamp";
import Markdown from "marked-react";
import javascript from "highlight.js/lib/languages/javascript";
import Lowlight from "react-lowlight";
import ContractIcon from "./assets/ContractIcon";

function App() {
  const initialMarkdown = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\\\`\`\`' && lastLine == '\\\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

  const [markDownText, setMarkDownText] = useState(initialMarkdown);

  const handleChange = (e) => {
    setMarkDownText(e.target.value);
  };

  Lowlight.registerLanguage("js", javascript);

  const renderer = {
    code(snippet, lang) {
      return <Lowlight key={this.elementId} language={lang} value={snippet} />;
    },
  };

  const [editorExpand, setEditorExpand] = useState(false);
  const [markdownExpand, setMarkdownExpand] = useState(false);

  const handleExpandEditor = () => {
    setEditorExpand(!editorExpand);
  };

  useEffect(() => {
    const preview = document.getElementById("content-preview");
    const editor = document.getElementById("content-editor");
    if (editorExpand) {
      preview.classList.add("hidden-preview");
      editor.classList.add("full-editor");
    } else {
      preview.classList.remove("hidden-preview");
      editor.classList.remove("full-editor");
    }
  }, [editorExpand]);

  const handleExpandMarkdown = () => {
    setMarkdownExpand(!markdownExpand);
  };

  useEffect(() => {
    const preview = document.getElementById("content-preview");
    const editor = document.getElementById("content-editor");
    if (markdownExpand) {
      editor.classList.add("hidden-editor");
      preview.classList.add("full-preview");
    } else {
      editor.classList.remove("hidden-editor");
      preview.classList.remove("full-preview");
    }
  }, [markdownExpand]);

  return (
    <>
      <main>
        <div id="content-editor" className="content-editor">
          <section className="editor-barra">
            <div className="barra-text-icon">
              <FreeCodeCamp />
              <p>Editor</p>
            </div>
            <div className="expand" onClick={handleExpandEditor}>
              {editorExpand ? <ContractIcon /> : <ExpandIcon />}
            </div>
          </section>
          <textarea
            id="editor"
            value={initialMarkdown}
            onChange={handleChange}
            rows={12}
            cols={77}
          />
        </div>
        <section id="content-preview" className="content-preview">
          <div className="editor-barra">
            <div className="barra-text-icon">
              <FreeCodeCamp />
              <p>Previewer</p>
            </div>
            <div className="expand" onClick={handleExpandMarkdown}>
              {markdownExpand ? <ContractIcon /> : <ExpandIcon />}
            </div>
          </div>
          <div id="preview">
            <Markdown
              breaks
              value={markDownText}
              renderer={renderer}
              openLinksInNewTab
              gfm
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
