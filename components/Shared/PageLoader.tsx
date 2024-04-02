import React from "react";

export default function PageLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      {/* <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div> */}
      <div className="flex flex-row space-x-4">
        {/* <div
          className="w-12 h-12 rounded-full animate-spin
                    border-4 border-dashed border-primary border-t-transparent"
        /> */}
        <div className="flex">
          <div className="relative">
            {/* <!-- Outer Ring--> */}
            <div
              className="w-12 h-12 rounded-full absolute
                            border-4 border-dashed border-gray-400"
            ></div>

            {/* <!-- Inner Ring --> */}
            <div
              className="w-12 h-12 rounded-full animate-spin absolute
                            border-4 border-dashed border-primary border-t-transparent"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
