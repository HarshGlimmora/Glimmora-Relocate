export function DossierSkeleton() {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="bg-canvas border border-rule p-8">
        <div className="shimmer h-3 w-32 mb-6" />
        <div className="shimmer h-10 w-full max-w-2xl" />
        <div className="shimmer h-10 w-full max-w-xl mt-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-canvas border border-rule p-6">
            <div className="shimmer h-3 w-24 mb-4" />
            <div className="shimmer h-10 w-16" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-canvas border border-rule p-6">
          <div className="shimmer h-3 w-36 mb-6" />
          <div className="shimmer h-4 w-full mb-2" />
          <div className="shimmer h-4 w-11/12 mb-2" />
          <div className="shimmer h-4 w-4/5" />
        </div>
        <div className="bg-canvas border border-rule p-6">
          <div className="shimmer h-3 w-24 mb-6" />
          <div className="shimmer h-40 w-40 mx-auto rounded-full" />
        </div>
      </div>
    </div>
  );
}
