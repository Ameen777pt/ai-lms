const testimonials = [
  {
    name: "Ameen",
    text: "The AI tutor helped me understand difficult concepts quickly.",
  },
  {
    name: "Sarah",
    text: "Tracking my progress kept me motivated throughout the course.",
  },
  {
    name: "John",
    text: "The platform made learning much more organized.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-black">
        What Students Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6 px-10 ">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="border p-6 rounded-lg bg-white"
          >
            <p className="mb-4 text-black">
              "{testimonial.text}"
            </p>

            <h3 className="font-bold text-black">
              - {testimonial.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}