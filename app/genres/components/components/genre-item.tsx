"use client";

import Image from "next/image";
import { createClient } from "pexels";
import { useEffect, useState } from "react";

// import PlayButton from "./PlayButton";

interface ArtistItemProps {
  data: [genre: string, app: number];
  //   onClick: (id: string) => void;
}
const GenreItem: React.FC<ArtistItemProps> = ({ data }) => {
  //   const imagePath = useLoadImage(data);
  const [imagePath, setImagePath] = useState<string | null>(null);
  useEffect(() => {
    const loadImage = async (genre: string) => {
      const client = createClient(process.env.NEXT_PUBLIC_API_KEY_PEXELS || "");
      const response = await client.photos.search({
        query: `${genre}`,
        per_page: 1,
      });
      //@ts-ignore
      const image = response.photos[0];
      setImagePath(image?.src?.tiny);
    };

    loadImage(data[0]);
  }, [data]);

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
        {!imagePath ? (
          <div className=" flex bg-rose-50 bg-gradient-to-br object-cover w-full h-full">
            <div className="flex flex-col text-center self-center items-center w-full p-4 gap-y-1">
              <p className="font-semibold text-xl text-black w-full uppercase">
                {data[0]}
              </p>
            </div>
          </div>
        ) : (
          <Image
            className="object-cover"
            src={imagePath || ""}
            fill
            alt="Image"
            sizes="(max-width: 768px) 100vw"
            priority
          />
        )}
      </div>
      <div className="flex flex-col items-center w-full pt-4 gap-y-1 ">
        <p className="font-semibold text-white w-full uppercase">{data[0]}</p>

        <p
          className="
              
              font-semibold
              text-xl
              pb-4
              w-full
              truncate
              "
        >
          #1
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

export default GenreItem;
