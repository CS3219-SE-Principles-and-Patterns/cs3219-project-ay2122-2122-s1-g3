import React, { useEffect, useState } from "react";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/mode/python/python";
import "codemirror/keymap/sublime";
import CodeMirror from "codemirror";
import io from "socket.io-client";
import { Terminal } from "./terminal";
import "./editorStyle.scss";
require("dotenv").config();

let socket;
export const Editor = (props) => {
  const [users, setUsers] = useState([]);
  const [stdOut, setStdOut] = useState("");
  const language = "py";
  const [editorCode, setEditorCode] = useState("");
  //TODO: Use real username or jwt token
  const username = Math.floor(Math.random() * 100000).toString();
  const { roomId, handleExit } = props;

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById("ds"), {
      lineNumbers: true,
      keyMap: "sublime",
      theme: "material-ocean",
      mode: "python",
    });

    // const bookMark = editor.setBookmark({ line: 1, pos: 1 }, { widget })
    // widget.onclick = () => bookMark.clear()
    // console.log(editor.getAllMarks())

    // socket = io(process.env.EDITOR_URL, {
    //   transports: ["websocket"],
    // });

    socket = io("http://35.244.49.105:3002/", {
      transports: ["websocket"],
    });

    socket.on("CODE_CHANGED", (code) => {
      editor.setValue(code);
      setEditorCode(code);
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("connect", () => {
      socket.emit("CONNECTED_TO_ROOM", { roomId, username });
    });

    socket.on("disconnect", () => {
      socket.emit("DISSCONNECT_FROM_ROOM", { roomId, username });
    });

    socket.on("ROOM:CONNECTION", (users) => {
      setUsers(users);
    });

    socket.on("ROOM:PARTNER_DISCONNECTED", () => {
      console.log("partner exited");
      handleExitEditor();
    });

    editor.on("change", (instance, changes) => {
      const { origin } = changes;
      // if (origin === '+input' || origin === '+delete' || origin === 'cut') {
      if (origin !== "setValue") {
        setEditorCode(instance.getValue());
        socket.emit("CODE_CHANGED", instance.getValue());
      }
    });
    editor.on("cursorActivity", (instance) => {
      // console.log(instance.cursorCoords())
    });

    return () => {
      socket.emit("DISSCONNECT_FROM_ROOM", { roomId, username });
    };
  }, []);
  const handleSubmit = async () => {
    const payload = {
      language: language,
      code: editorCode,
    };
    console.log(payload);
    try {
      setStdOut("");
      const { data } = await axios.post("http://34.93.87.89:5000/run", payload);
      setStdOut(data.output);
    } catch ({ response }) {
      const errMsg = response.data.err.stderr;
      setStdOut(errMsg);
    }
  };
  const handleExitEditor = () => {
    socket.disconnect()
    handleExit()
  };
  return (
    <>
      <div className="codeHeader">
        <div className="nextButtonWrapper">
          <button onClick={handleExitEditor}>Exit</button>
        </div>
        <div className="questionTitle">Your Code</div>
      </div>
      <div className="Editor">
        <textarea className="textInput" id="ds" />
        <div className="runCodeButtonWrapper">
          <button onClick={handleSubmit}>Run Code</button>
        </div>
      </div>
      <div className="terminalHeader">Standard Output</div>
      <Terminal stdOut={stdOut} />
    </>
  );
};
