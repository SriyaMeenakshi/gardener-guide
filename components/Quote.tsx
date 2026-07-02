export default function Quote() {
  return (
    <section className="relative text-center py-24 px-6 overflow-hidden">
      
      {/* Subtle green ambient glow behind the text */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-900/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        
        <h2 className="text-3xl md:text-5xl font-medium text-gray-200 italic leading-snug relative z-10">
          " To plant a garden is to believe in tomorrow. "
        </h2>

        
        
        <p className="mt-8 text-green-500 font-bold tracking-widest uppercase text-sm md:text-base">
          — Audrey Hepburn
        </p>
      </div>
      
    </section>
  );
}