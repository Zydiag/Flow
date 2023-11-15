import Image from "next/image";
import React from "react";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            className="object-contain"
            src="/reading.png"
            alt="Reading"
            fill
          />
        </div>
        <div className="relative w-[400px] h-[400px] hidden md:block">
          <Image
            className=" object-contain"
            src="/book.png"
            alt="Reading"
            fill
          />
        </div>
      </div>
    </div>
  );
};
