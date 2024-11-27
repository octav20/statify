"use client";
import { Song } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import PlayButton from "./PlayButton";

interface SongItemProps {
  data: Song;
  //   onClick: (id: string) => void;
}
const SongItem: React.FC<SongItemProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(data.external_urls.spotify)}
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
          src={data.album.images[1].url || "/liked.png"}
          alt="Image"
          fill
          sizes="(max-width: 768px) 100vw"
          priority
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1 ">
        <p className="font-semibold truncate w-full">{data.name}</p>
        <p
          className="
              text-neutral-400
              text-sm
              pb-4
              w-full
              truncate
              "
        >
          {data.artists[0].name}
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

export default SongItem;
