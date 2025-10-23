export default function ProductCardSkeleton({ number }) {
  return (
    Array(number).fill(0).map((_, index) => (
      <div key={index} className="shadow-md rounded-lg animate-pulse">
            <div className='flex justify-between items-center rounded-t-lg py-2 px-3'>
              <span className="h-7 w-14 rounded bg-gray-300"></span>
              <div className="flex justify-center items-center gap-2">
                <div className="h-7 w-9 bg-gray-300 rounded-lg"></div>
                <div className="h-7 w-9 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
      
            <div className="px-2 flex flex-col gap-1 mb-2">
              <div className="h-7 bg-gray-300 rounded p-1 pt-2"></div>
              <div className="h-7 bg-gray-300 rounded p-1 pt-2"></div>
              <div className="h-7 bg-gray-300 rounded p-1 pt-2"></div>
              <div className="h-7 bg-gray-300 rounded p-1 pt-2"></div>
            </div>
          </div>
    ))
  )
}