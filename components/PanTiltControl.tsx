// // Disable rule for the entire file
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @next/next/no-img-element */

// "use client";





// Disable rule for the entire file
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

"use client";

import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function PanTiltControls() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Connect to WebSocket server
    const socket = new WebSocket("ws://192.168.68.1:5800");
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      // Register as a frontend client
      socket.send(JSON.stringify({ type: "frontend" }));
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setWs(socket);

    // Cleanup WebSocket connection
    return () => {
      socket.close();
    };
  }, []);

  const sendPanTiltCode = (code: string) => {
    console.log("Sending code:", code);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "pan-tilt", panTilt: code }));
    }
  };

  const onPanTiltChange = (direction: string) => {
    switch (direction) {
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

  const startAction = (direction: string) => {
    if (intervalId) clearInterval(intervalId); // Ensure no overlapping intervals
    const id = setInterval(() => onPanTiltChange(direction), 100); // Call every 100ms
    setIntervalId(id);
  };

  const stopAction = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div className="m-auto grid grid-cols-3 gap-2 bg-purple-200 p-3 rounded-lg">
      <div className="grid-cols-1 flex items-center justify-center">
        <button
          className="rounded-xl bg-white p-3"
          onMouseDown={() => startAction("Left")}
          onMouseUp={stopAction}
          onMouseLeave={stopAction} // Stop when mouse leaves the button
          onTouchStart={() => startAction("Left")}
          onTouchEnd={stopAction}
        >
          <MdKeyboardArrowLeft className="font-bold text-xl" />
        </button>
      </div>
      <div className="grid-cols-1 flex flex-col items-center justify-between gap-6">
        <button
          className="rounded-xl bg-white p-3"
          onMouseDown={() => startAction("Top")}
          onMouseUp={stopAction}
          onMouseLeave={stopAction}
          onTouchStart={() => startAction("Top")}
          onTouchEnd={stopAction}
        >
          <IoIosArrowUp className="font-bold text-lg" />
        </button>
        <button
          className="rounded-xl bg-white p-3"
          onMouseDown={() => startAction("Bottom")}
          onMouseUp={stopAction}
          onMouseLeave={stopAction}
          onTouchStart={() => startAction("Bottom")}
          onTouchEnd={stopAction}
        >
          <IoIosArrowDown className="font-bold text-lg" />
        </button>
      </div>
      <div className="grid-cols-1 flex items-center justify-center">
        <button
          className="rounded-xl bg-white p-3"
          onMouseDown={() => startAction("Right")}
          onMouseUp={stopAction}
          onMouseLeave={stopAction}
          onTouchStart={() => startAction("Right")}
          onTouchEnd={stopAction}
        >
          <MdKeyboardArrowRight className="font-bold text-xl" />
        </button>
      </div>
    </div>
  );
}
















// import { useState, useEffect } from "react";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";



// export default function PanTiltControls() {
//   const [ws, setWs] = useState<WebSocket | null>(null);



//   useEffect(() => {
//     // Connect to WebSocket server
//     const socket = new WebSocket("ws://192.168.158.1:5800");
//     socket.onopen = () => {
//       console.log("Connected to WebSocket server");
//       // Register as a frontend client
//       socket.send(JSON.stringify({ type: "frontend" }));
//     };

//     // socket.onmessage = (event) => {
//     //   try {
//     //     const data = JSON.parse(event.data);
        
//     //   } catch (error: any) {
//     //     console.log(error);
//     //   }
//     // };

//     socket.onclose = () => {
//       console.log("WebSocket connection closed");
//     };

//     setWs(socket);

//     // Cleanup WebSocket connection
//     return () => {
//       socket.close();
//     };
//   }, []);


//   const sendPanTiltCode = (code: string) => {
//     console.log("code")
//     console.log(code)
//     if (ws && ws.readyState === WebSocket.OPEN) {
//       ws.send(JSON.stringify({ type: "pan-tilt", panTilt: code }));
//     }
//   };





//   const onPanTiltChange = (v: any) => {
    
//     switch (v) {
//       case "Right":
//         sendPanTiltCode("4");
//         break;
//       case "Left":
//         sendPanTiltCode("3");
//         break;
//       case "Top":
//         sendPanTiltCode("1");
//         break;
//       case "Bottom":
//         sendPanTiltCode("2");
//         break;
//       default:
//         sendPanTiltCode("0000");
//     }
//   };

//   return (
//     <div className="m-auto grid grid-cols-3 gap-2 bg-purple-200 p-3 rounded-lg">
//       <div className="grid-cols-1 flex items-center justify-center">
//       <button className="rounded-xl bg-white p-3" onClick={()=>onPanTiltChange("Left")}><MdKeyboardArrowLeft className="font-bold text-xl"/></button>
//       </div>
//       <div className="grid-cols-1 flex flex-col items-center justify-between gap-6">
//       <button className="rounded-xl bg-white p-3" onClick={()=>onPanTiltChange("Top")}><IoIosArrowUp className="font-bold text-lg"/></button>
//       <button className="rounded-xl bg-white p-3" onClick={()=>onPanTiltChange("Bottom")}><IoIosArrowDown className="font-bold text-lg"/></button>
//       </div>
//       <div className="grid-cols-1 flex items-center justify-center">
//       <button className="rounded-xl bg-white p-3" onClick={()=>onPanTiltChange("Right")}><MdKeyboardArrowRight className="font-bold text-xl"/></button>
//       </div>
//     </div>
//   );
// }
