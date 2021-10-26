import React, { useEffect, useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/keymap/sublime";
import CodeMirror from "codemirror";
import io from "socket.io-client";
//import { Controlled as ControlledEditor } from "react-codemirror2";
import "./editorStyle.scss";

export const Editor = () => {
  const [users, setUsers] = useState([]);
  const [editorCode, setEditorCode] = useState("");
  //TODO: Use real username or jwt token
  const username = Math.floor(Math.random() * 100 + 1).toString();
  const roomId = "1";

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById("ds"), {
      lineNumbers: true,
      keyMap: "sublime",
      theme: "material-ocean",
      mode: "javascript",
    });

    // const bookMark = editor.setBookmark({ line: 1, pos: 1 }, { widget })
    // widget.onclick = () => bookMark.clear()
    // console.log(editor.getAllMarks())

    const socket = io("http://localhost:3001/", {
      transports: ["websocket"],
    });

    socket.on("CODE_CHANGED", (code) => {
      editor.setValue(code);
      setEditorCode(code)
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
      console.log(users);
    });

    editor.on("change", (instance, changes) => {
      const { origin } = changes;
      // if (origin === '+input' || origin === '+delete' || origin === 'cut') {
      if (origin !== "setValue") {
        setEditorCode(instance.getValue())
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

  return (
    <div className="Editor">
      <textarea className="textInput" id="ds" />
      <div className="runCodeButtonWrapper">
        <button>Run Code</button>
      </div>
    </div>
  );
};
