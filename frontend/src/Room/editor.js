import "./editorStyle.scss";
export const Editor = () => {
  return (
    <div className="Editor">
      <div className="textInput"></div>
      <div className="runCodeButtonWrapper">
        <button>Run Code</button>
      </div>
    </div>
  );
};
