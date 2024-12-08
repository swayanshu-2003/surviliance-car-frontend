// Disable rule for the entire file
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */


"use client";
import React, { useEffect, useState } from "react";

const App = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const socket:any = new WebSocket("ws://64.227.154.38:5900/");

    socket.onmessage = (event:any) => {
      console.log(event);
      if (event) {
        const blob:any = new Blob([event?.data], { type: "image/jpeg" });
        const url: any = URL.createObjectURL(blob);
        setImageSrc(url);
        return () => URL.revokeObjectURL(url);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="text-center">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Streamed"
          className="max-w-full max-h-[90vh] w-full
"
        />
      ) : (
        <p>Waiting for stream...</p>
      )}
    </div>
  );
};

export default App;

// "use client";
// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [imageSrc, setImageSrc] = useState(null);

//   useEffect(() => {
//     const socket = new WebSocket("ws://64.227.154.38:5800/");

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (event?.type === "cam") {
//         const blob = new Blob([event.data], { type: "image/jpeg" });
//         const url: any = URL.createObjectURL(blob);
//         setImageSrc(url);

//         // Revoke previous URLs to free memory
//         return () => URL.revokeObjectURL(url);
//       }
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h1>Real-Time Image Stream</h1>
//       {imageSrc ? (
//         <img
//           src={imageSrc}
//           alt="Streamed"
//           style={{ maxWidth: "100%", maxHeight: "90vh", width: "300px" }}
//         />
//       ) : (
//         <p>Waiting for stream...</p>
//       )}
//     </div>
//   );
// };

// export default App;
