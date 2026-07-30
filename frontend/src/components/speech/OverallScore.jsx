function OverallScore({ score }) {

  return (

    <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-3xl p-10 text-center">

      <h2 className="text-2xl font-bold">

        Overall Performance

      </h2>

      <h1 className="text-7xl font-bold mt-6">

        {score}%

      </h1>

    </div>

  );

}

export default OverallScore;