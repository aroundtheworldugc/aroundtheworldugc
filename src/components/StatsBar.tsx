const stats = [
  { value: "150+", label: "Contents delivered across accommodations, tours, restaurants and products" },
  { value: "5", label: "Countries explored and documented:\nAustralia, Maldives, Sri Lanka, Thailand, Italy" },
];

const StatsBar = () => {
  return (
    <section className="py-20 md:py-26 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full border border-muted-foreground/30 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-5">
                <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-none">
                  {stat.value}
                </p>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed whitespace-pre-line">
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
