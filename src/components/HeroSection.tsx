export default function HeroSection() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">
        Learn Smarter With AI
      </h1>

      <p className="text-xl text-gray-600">
        Your intelligent learning platform for courses, lessons, and AI assistance.
      </p>

      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
        Get Started
      </button>
    </section>
  );
}