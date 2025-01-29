const Testimonial = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <p className="text-3xl font-medium text-blue-500 ">Featured Product</p>

        <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
          <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div>

          <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
            <img
              className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
              src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="client photo"
            />

            <div className="mt-2 md:mx-6">
              <div>
                <p className="text-xl font-medium tracking-tight text-white">
                  Ema Watson
                </p>
                <p className="text-blue-200 ">Marketing Manager at Stech</p>
              </div>

              <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                {" "}
                “Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tempore quibusdam ducimus libero ad tempora doloribus expedita
                laborum saepe voluptas perferendis delectus assumenda”.
              </p>

              <div className="flex items-center justify-between mt-6 md:justify-start">
                <button
                  title="left arrow"
                  className="p-2 text-white transition-colors duration-300 border rounded-xl rtl:-scale-x-100 hover:bg-blue-400"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Testimonial;
