export default function FaqCardSkeleton({ number }) {
  return (
    Array(number).fill(0).map((_, index) => (
      <div key={index} className="shadow-lg flex flex-col gap-2 p-4 rounded-lg animate-pulse">
        <p className="h-8 bg-gray-300 rounded w-3/4"></p>
        <div>
          <p className="h-6 bg-gray-300 rounded w-full mb-1"></p>
        <p className="h-6 bg-gray-300 rounded w-full"></p>
        </div>
        <p className="h-6 bg-gray-300 rounded w-1/4"></p>
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-gray-300 rounded-lg"></div>
          <div className="h-8 w-16 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    )
    )
  )
}