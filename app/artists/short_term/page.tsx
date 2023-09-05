import ArtistsContainer from "../components/components/artists-container";

const ShortTerm = () => {
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
          Your Artists (Last 4 weeks)
        </h1>

        <ArtistsContainer />
      </div>
    </div>
  );
};

export default ShortTerm;
