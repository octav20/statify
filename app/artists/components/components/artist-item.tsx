"use client";

import { Artist } from "@/types";
import Image from "next/image";
// import PlayButton from "./PlayButton";

interface ArtistItemProps {
  data: Artist;
  //   onClick: (id: string) => void;
}
const ArtistItem: React.FC<ArtistItemProps> = ({ data }) => {
  return (
    <div
      //   onClick={() => onClick(data.id)}
      className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3"
    >
      <div
        className="
            relative
            aspect-square
            w-full
            h-full
            rounded-md
            overflow-hidden"
      >
        <Image
          className="object-cover"
          src={data.images[0].url || "/images/liked.png"}
          fill
          alt="Image"
          sizes="(max-width: 768px) 100vw"
          priority
        />
      </div>
      <div className="flex flex-col items-center w-full pt-4 gap-y-1 ">
        <p className="font-semibold  truncate w-full">{data.name}</p>
        <p
          className="
              text-neutral-400
              text-sm
              pb-4
              w-full
              truncate
              "
        >
          Messi
        </p>
      </div>
      <div
        className="
          absolute
          bottom-24
          right-5"
      >
        {/* <PlayButton /> */}
      </div>
    </div>
  );
};

export default ArtistItem;
