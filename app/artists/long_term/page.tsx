import ArtistsContainer from "../components/components/artists-container";

const LongTerm = () => {
  return (
    <div
      className="h-fit
      flex
      justify-center
          bg-gradient-to-b
          from-emerald-800
          p-6`"
    >
      <div>
        <h1 className="font-bold text-3xl text-center m-16">
          Your Artists (All time)
        </h1>

        <ArtistsContainer />
      </div>
    </div>
  );
};

export default LongTerm;
