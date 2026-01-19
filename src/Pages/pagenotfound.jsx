import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-primary text-text px-6">
      {/* 404 Number */}
      <h1 className="text-[10rem] md:text-[14rem] font-extrabold text-accent mb-4 drop-shadow-lg">
        404
      </h1>

      {/* Message */}
      <h2 className="text-3xl md:text-5xl font-bold text-text mb-4 text-center">
        Oops! Page Not Found!
      </h2>
      <p className="text-lg md:text-xl text-text opacity-90 text-center max-w-xl mb-8">
        The page you are looking for does not exist or has been moved. 
        Don’t worry, you can go back to the homepage and continue exploring.
      </p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="bg-accent text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
      >
        Go Home
      </Link>
    </div>
  );
}
