function Testimonials() {
  return (
    <section className="py-24 px-8">

      <h2 className="text-center text-5xl font-bold mb-16">
        Success Stories
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
          <p>
            "This platform helped me crack my software engineer interview."
          </p>
          <h4 className="mt-4 font-bold">Rahul Sharma</h4>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
          <p>
            "The AI feedback improved my confidence significantly."
          </p>
          <h4 className="mt-4 font-bold">Priya Singh</h4>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
          <p>
            "Resume analysis was extremely accurate."
          </p>
          <h4 className="mt-4 font-bold">Aman Gupta</h4>
        </div>

      </div>

    </section>
  );
}

export default Testimonials;