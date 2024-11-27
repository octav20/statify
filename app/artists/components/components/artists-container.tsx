"use client";

// import useOnPlay from "@/hooks/useOnPlay";
import { Artist } from "@/types";
import ArtistItem from "./artist-item";
import { useEffect, useState } from "react";
import axios from "axios";
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";

const ArtistsContainer = () => {
  const user = useUser();
  const [artists, setArtists] = useState<any>([]);

  const pathName = usePathname();

  useEffect(() => {
    const getArtists = async () => {
      let timeRange = "";
      if (user) {
        try {
          if (pathName === "/artists/short_term") {
            timeRange = "short_term";
          } else if (pathName === "/artists/medium_term") {
            timeRange = "medium_term";
          } else {
            timeRange = "long_term";
          }
          const response = await axios.get(
            `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=10&offset=0`,
            {
              headers: {
                // @ts-ignore
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
  //   const onPlay = useOnPlay(Artists);
  if (artists.length === 0) {
    return <div className="mt-4 text-neutral-400">No artists available</div>;
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
      {artists.map((item: Artist) => (
        <ArtistItem
          key={item.id}
          //   onClick={(id: string) => onPlay(id)}
          data={item}
        />
      ))}
    </div>
  );
};

export default ArtistsContainer;
