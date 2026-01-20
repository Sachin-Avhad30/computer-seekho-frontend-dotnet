const Recruiters = () => {
  const recruiters = [
    {
      id: 1,
      name: "Atos",
      logo: "https://vidyanidhi.com/images/atos.png",
    },
    {
      id: 2,
      name: "Capgemini",
      logo: "https://vidyanidhi.com/images/altair.png",
    },
    {
      id: 3,
      name: "BNP Paribas",
      logo: "https://vidyanidhi.com/images/bnp.png",
    },
    {
      id: 4,
      name: "Tata Power",
      logo: "https://vidyanidhi.com/images/capg.png",
    },
    {
      id: 5,
      name: "Financial Technologies",
      logo: "https://vidyanidhi.com/images/financialtech.png",
    },
    {
      id: 6,
      name: "NSE",
      logo: "https://vidyanidhi.com/images/nse.png",
    },
        {
      id: 7,
      name: "Tata Power",
      logo: "https://vidyanidhi.com/images/tata.png",
    },
        {
      id: 4,
      name: "On Mobile",
      logo: "https://vidyanidhi.com/images/onmobile.png",
    },
  ];

  return (
    <section className="py-12 text-center">

      <h2 className="text-2xl font-semibold text-blue-900 mb-8">
        Major Recruiters
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
        {recruiters.map((r) => (
          <img
            key={r.id}
            src={r.logo}
            alt={r.name}
            className="h-12 grayscale"
          />
        ))}
      </div>

      <button className="mt-10 bg-red-600 text-white px-8 py-3 rounded">
        SEE MORE
      </button>

    </section>
  );
};

export default Recruiters;
