export default function StoreCardSkeleton({ number }) {
  return (
    Array(number).fill(0).map((_, index) => (
      <div key={index} className="shadow-lg rounded-lg overflow-x-auto hover:bg-gray-50 animate-pulse">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="w-full h-10 bg-gray-300 rounded-t-lg"></div>
            <div className="px-3 py-2">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-6 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-6 bg-gray-300 rounded w-2/3 mb-1"></div>
              <div className="h-6 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
          <div className="flex items-center gap-2 py-2 px-3">
            <div className="h-8 w-16 bg-gray-300 rounded-lg"></div>
            <div className="h-8 w-16 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    ))

  )
}