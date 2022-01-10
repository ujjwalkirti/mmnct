function TopMoments() {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 px-2 pb-2 mt-6">
      <div className="flex justify-between items-center">
        <p className="text-white font-bold text-4xl mx-2 py-4 italic">
          Top moment in the games!
        </p>
        <button className="bg-red-700 text-white font-bold h-10 w-auto p-2 shadow-xl rounded-md mr-6">
          View All
        </button>
      </div>
      <div className="my-4 mx-2 flex">
        <img
          src="carousel/c-5.jpg"
          className=" w-1/4 mx-2 rounded-lg hover:shadow-lg sizeIncrease"
        />
        <img
          src="carousel/c-5.jpg"
          className=" w-1/4 mx-2 rounded-lg hover:shadow-lg sizeIncrease"
        />
        <img
          src="carousel/c-5.jpg"
          className=" w-1/4 mx-2 rounded-lg hover:shadow-lg sizeIncrease"
        />
        <img
          src="carousel/c-5.jpg"
          className=" w-1/4 mx-2 rounded-lg hover:shadow-lg sizeIncrease"
        />
      </div>
    </div>
  );
}

export default TopMoments;
