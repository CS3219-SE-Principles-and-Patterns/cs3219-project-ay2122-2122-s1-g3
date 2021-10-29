import "./terminalStyle.scss";
export const Terminal = (props) => {
  const {stdOut} = props
  return (
    <div className="Terminal">
      <div className="stdOutput">
      {stdOut}
      </div>
    </div>
  );
};
