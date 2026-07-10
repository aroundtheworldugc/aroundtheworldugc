const stats = [
  { value: "23", label: "Collaborations completed" },
  { value: "5", label: "Countries: Australia, Sri Lanka, Maldives, Thailand, Italy" },
  { value: "10,000+ AUD", label: "In barter value received for content" },
];

const StatsBar = () => {
  return (
    <section className="py-20 md:py-26 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-none mb-3">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
