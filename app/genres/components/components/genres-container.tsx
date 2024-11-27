"use client";

// import useOnPlay from "@/hooks/useOnPlay";
import { Artist } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import GenreItem from "./genre-item";

const GenresContainer = () => {
  const user = useUser();
  const [artists, setArtists] = useState<any>([]);
  const [genres, setGenres] = useState<any>([]);

  const pathName = usePathname();

  useEffect(() => {
    const getArtists = async () => {
      let timeRange = "";
      if (user) {
        try {
          if (pathName === "/genres/short_term") {
            timeRange = "short_term";
          } else if (pathName === "/genres/medium_term") {
            timeRange = "medium_term";
          } else {
            timeRange = "long_term";
          }
          const response = await axios.get(
            `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=10&offset=0`,
            {
              headers: {
                //@ts-ignore
                Authorization: `Bearer ${user.accessToken}`,
              },
            }
          );

          const fetchedArtists = response.data.items;
          setArtists(fetchedArtists);
        } catch (error) {
          console.error("Error fetching Artists:", error);
        }
      }
    };

    getArtists();
  }, [user]);

  useEffect(() => {
    const getGenres = async () => {
      let genresMap: Record<string, number> = {};

      await artists.forEach((artist: Artist) => {
        artist.genres.forEach((genre: string) => {
          if (genresMap[genre]) {
            genresMap[genre] += 1;
          } else {
            genresMap[genre] = 1;
          }
        });
      });
      const genresArray = Object.entries(genresMap);
      genresArray.sort((a, b) => b[1] - a[1]);
      setGenres(genresArray);
    };

    getGenres();
  }, [artists]);
  //   const onPlay = useOnPlay(Artists);
  if (artists.length === 0) {
    return <div className="mt-4 text-neutral-400">No genres available</div>;
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
      {genres.map((item: any) => (
        <GenreItem
          key={item[0]}
          //   onClick={(id: string) => onPlay(id)}
          data={item}
        />
      ))}
    </div>
  );
};

export default GenresContainer;
