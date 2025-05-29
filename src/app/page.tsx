import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { HeroSectionOne } from "@/components/ui/HeroSection";
import { about, products, testimonials } from "@/utils";


const courses=[
  "B. TECH.",
  "BCA",
  "Bsc.(AG)",
  "MBA",
  "MCA",
  "BBA",
  "M. Sc.",
  "M. Tech.",
  "Ph. D."
]
  

export default function Home() {
  return (
    <>
      <title>GIET University</title>
      <div>
        <HeroSectionOne />
        <HeroParallax products={products} />
      </div>
      <div>
        <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
          <h1 className="text-center text-3xl font-bold text-gray-900">
            What our Administrative say
          </h1>
          <p className="mt-2 text-center text-gray-600">
            We are proud to have worked with some of the best in the business.
          </p>
        </div>
        <AnimatedTestimonials testimonials={testimonials} />;
      </div>
      <section className="mx-auto  px-4 py-20 font-sans antialiased md:px-8 lg:px-12">
        <h1 className="text-center text-3xl font-bold text-gray-900"></h1>
        {/* need 6 card to show the number of faculties area covered by the collage and some extra info and students studied bla vbla */}
        <p className="mt-2 text-center text-gray-600"></p>
        <div className="flex flex-wrap justify-center gap-4 mt-8 w-full ">
          {about.map((item, index) => (
            <div
              key={index}
              className="relative flex h-64 items-center justify-center overflow-hidden rounded-lg bg-gray-100  transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-700"
            >
              <div className="w-[12rem]  p-4 text-center flex flex-col justify-around gap-2">
                <h2 className="text-2xl h-1/3 font-semibold">{item.data}</h2>
                <p className="text-gray-800 h-1/3">{item.subtitle} </p>
                <p className="text-gray-500 h-1/3 text-balance">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center mt-8">
          <h1 className="text-center text-3xl font-bold text-gray-900 mt-8">
            Why GIET
          </h1>
          <p className="mt-2 text-center text-gray-600">
            GIET University, Gunupur -A tranquil paradise, away from the noise
            and bustle of an urban area, surrounded by lush greenery and nestled
            in the beautiful foothills of eastern India. This is one of the most
            prestigious universities of Odisha. It has come out as one of the
            toppest in eastern India because of many reasons.
          </p>
          <p>
            <a
              href="https://www.giet.edu/"
              className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Learn More
            </a>
          </p>
        </div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex justify-center items-center flex-col">
            <div>
              <h1 className="text-5xl text-gray-600 font-bold font-sans">Programmes Offered</h1>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {
                courses.map((item,index)=><div key={index} className="w-[20rem] h-20 m-5 text-center flex justify-center items-center rounded-lg shadow-2xl/20 bg-gray-200 hover:bg-blue-100 ease-in-out uppercase flex-wrap shadow-indigo-400">{item}</div>)
              }
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 p-8">
        <div className="flex flex-row justify-between items-center mt-4 mx-auto mb-10">
          <div className="flex gap-2 items-center">
            <h1 className="text-5xl font-bold font-sans tracking-wide text-gray-600">
              <span className="text-7xl">GIET</span>{" "}
              <span className="text-7xl">U</span>niversity
            </h1>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Facebook
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Twitter
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Instagram
            </a>
          </div>
        </div>
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} GIET University. All rights
            reserved.
          </p>
        </div>
        <div className="flex justify-center mt-4"></div>
      </footer>
    </>
  );
}
