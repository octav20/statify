"use client";

// import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import SongItem from "./song-item";
import { useEffect, useState } from "react";
import axios from "axios";
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";

const SongsContainer = () => {
  const user = useUser();
  const [songs, setSongs] = useState<any>([]);

  const pathName = usePathname();

  useEffect(() => {
    const getSongs = async () => {
      let timeRange = "";
      if (user) {
        try {
          if (pathName === "/songs/short_term") {
            timeRange = "short_term";
          } else if (pathName === "/songs/medium_term") {
            timeRange = "medium_term";
          } else {
            timeRange = "long_term";
          }
          const response = await axios.get(
            `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10&offset=0`,
            {
              headers: {
                //@ts-ignore
                Authorization: `Bearer ${user.accessToken}`,
              },
            }
          );

          const fetchedSongs = response.data.items;
          setSongs(fetchedSongs);
        } catch (error) {
          console.error("Error fetching songs:", error);
        }
      }
    };

    getSongs();
  }, [user]);
  //   const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available</div>;
  }
  return (
    <div
      className="
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-5
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-8
      gap-4
      
      m-4"
    >
      {songs.map((item: Song) => (
        <SongItem
          key={item.id}
          //   onClick={(id: string) => onPlay(id)}
          data={item}
        />
      ))}
    </div>
  );
};

export default SongsContainer;
