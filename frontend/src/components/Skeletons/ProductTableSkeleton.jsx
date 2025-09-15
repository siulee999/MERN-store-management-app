export default function ProductTableSkeleton({ rowNumber }) {
  return (
    <div className="overflow-x-auto animate-pulse">
      <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 w-1/12">
              <div className="bg-gray-300 rounded td"></div>
            </th>
            <th className="py-3 px-4 w-2/12">
              <div className="bg-gray-300 rounded td"></div>
            </th>
            <th className="py-3 px-4 w-1/12">
              <div className="bg-gray-300 rounded td"></div>
            </th>
            <th className="py-3 px-4 w-1/12">
              <div className="bg-gray-300 rounded td"></div>
            </th>
            <th className="py-3 px-4 ">
              <div className="bg-gray-300 rounded td"></div>
            </th>
            <th className="py-3 px-4 w-1/12">
              <div className="bg-gray-300 rounded td"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(rowNumber).fill(0).map((_, index) => (
            <tr key={index}>
              <td className="py-3 px-4">
                <div className="h-6 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-4">
                <div className="h-6 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-4">
                <div className="h-6 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-4">
                <div className="h-6 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-4">
                <div className="h-6 bg-gray-300 rounded"></div>
              </td>
              <td className="py-3 px-4">
                <div className="h-6 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}