import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Slide {
  title: string;
  description: string;
  image: string;
}

const Carousel: React.FC = () => {
  const slides: Slide[] = [
    {
      title: "Fully Furnished Homes",
      description: "Move into premium, fully furnished homes tailored to your needs.",
      image: "/assets/hero.png",
    },
    {
      title: "Hassle-Free Rent Agreements",
      description: "Skip the court visits – we handle your rent agreements entirely.",
      image: "/assets/hero.png",
    },
    {
      title: "Online Property Selection",
      description: "Browse and book properties online with ease and transparency.",
      image: "/assets/hero.png",
    },
    {
      title: "Doorstep Key Delivery",
      description: "Receive your keys at your pinned location, whenever you need.",
      image: "/assets/hero.png",
    },
    {
      title: "24/7 Support",
      description: "Experience seamless support anytime, anywhere.",
      image: "/assets/hero.png",

    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[70vh] bg-gray-50">
      <div className="relative h-full overflow-hidden">
        {/* Slide Content */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            display: "flex",
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="h-full w-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <p className="text-gray-200">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-3 rounded-full hover:bg-gray-700"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-3 rounded-full hover:bg-gray-700"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>
        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentSlide ? "bg-blue-600" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
