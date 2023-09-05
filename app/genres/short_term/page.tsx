import GenresContainer from "../components/components/genres-container";

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
          Your Genres (Last Month)
        </h1>

        <GenresContainer />
      </div>
    </div>
  );
};

export default ShortTerm;
