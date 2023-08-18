"use client";

// import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import SongItem from "./song-item";
import { useEffect, useState } from "react";
import axios from "axios";
import useUser from "@/hooks/useUser";

const SongsContainer = () => {
  const user = useUser();
  const [songs, setSongs] = useState<any>([]);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0",
          {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        );

        const fetchedSongs = response.data.items;
        setSongs(fetchedSongs);
        console.log(fetchedSongs);
      } catch (error) {
        console.error("Error fetching songs:", error);
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
      mt-4"
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
