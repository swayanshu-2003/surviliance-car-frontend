"use client";

import LiveCameraStream from "@/components/Cam";
import Controls from "@/components/Controls";
import PanTiltControls from "@/components/PanTiltControl";


export default function Home() {
  const handleContextMenu = (e:any) => {
    e.preventDefault();
  };
  return (
    <div onContextMenu={handleContextMenu} className="w-screen h-screen bg-gray-100 grid grid-cols-7 gap-3">
      <div className="col-span-2 h-[90hv] bg-red-300 flex flex-col items-center gap-3 p-3">
        <div className="h-[50%] w-full bg-pink-300"></div>
        <div className="h-[50%] w-full bg-pink-300 flex items-center justify-center">
          <Controls />
        </div>
      </div>
      <div className="col-span-3 h-[90hv] bg-green-300 flex flex-col items-center gap-3 p-3">
        <div className="h-[70%] w-full bg-pink-300">
          <LiveCameraStream />
        </div>
        <div className="h-[30%] w-full bg-pink-300"></div>
      </div>
      <div className="col-span-2 h-[90hv] bg-blue-300 flex flex-col items-center gap-3 p-3">
        <div className="h-[50%] w-full bg-pink-300"></div>
        <div className="h-[50%] w-full bg-pink-300 flex items-center justify-center">
          <PanTiltControls/>
        </div>
      </div>
    </div>
  );
}
