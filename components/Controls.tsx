// Disable rule for the entire file
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

"use client";
import Joystick from "rc-joystick";
import { useState, useEffect } from "react";

export default function Controls() {
  const [ws, setWs] = useState<WebSocket | null>(null);



  useEffect(() => {
    // Connect to WebSocket server
    const socket = new WebSocket("ws://64.227.154.38:5800");
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      // Register as a frontend client
      socket.send(JSON.stringify({ type: "frontend" }));
    };

    // socket.onmessage = (event) => {
    //   try {
    //     const data = JSON.parse(event.data);
        
    //   } catch (error: any) {
    //     console.log(error);
    //   }
    // };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setWs(socket);

    // Cleanup WebSocket connection
    return () => {
      socket.close();
    };
  }, []);

  const sendControlCode = (code: string) => {
    console.log("code")
    console.log(code)
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "control", controlCode: code }));
    }
  };
  const sendPanTiltCode = (code: string) => {
    console.log("code")
    console.log(code)
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "pan-tilt", panTilt: code }));
    }
  };




  const onJoystickChange = (v: any) => {
    const dir: any = v?.direction;
    console.log(dir);
    switch (dir) {
      case "Right":
        sendControlCode("1001");
        break;
      case "Left":
        sendControlCode("0110");
        break;
      case "Top":
        sendControlCode("1010");
        break;
      case "Bottom":
        sendControlCode("0101");
        break;
      default:
        sendControlCode("0000");
    }
  };
  const onPantiltChange = (v: any) => {
    const dir: any = v?.direction;
    console.log(dir);
    switch (dir) {
      case "Right":
        sendPanTiltCode("4");
        break;
      case "Left":
        sendPanTiltCode("3");
        break;
      case "Top":
        sendPanTiltCode("1");
        break;
      case "Bottom":
        sendPanTiltCode("2");
        break;
      default:
        sendPanTiltCode("0000");
    }
  };

  return (
    <div className="m-auto">
      {/* <h1 className="text-2xl font-bold mb-4">ESP8266 Controller</h1>
      <div className="mb-4"> */}
      <Joystick onChange={(v: any) => onJoystickChange(v)} />
      {/* <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onMouseDown={() => handleButtonPress("1010")}
          onMouseUp={handleButtonRelease}
        >
          Forward
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onMouseDown={() => handleButtonPress("0101")}
          onMouseUp={handleButtonRelease}
        >
          Backward
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onMouseDown={() => handleButtonPress("1001")}
          onMouseUp={handleButtonRelease}
        >
          Right
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onMouseDown={() => handleButtonPress("0110")}
          onMouseUp={handleButtonRelease}
        >
          Left
        </button> */}
      {/* </div> */}

      {/* <h2 className="text-xl font-semibold mb-2">Received Data:</h2>
      <ul className="list-disc list-inside">
        {randomNumbers.map((num, index) => (
          <li key={index}>Gas Sensor: {num}</li>
        ))}
      </ul> */}
    </div>
  );
}
