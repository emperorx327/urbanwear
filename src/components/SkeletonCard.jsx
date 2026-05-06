const SkeletonCard = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-3xl w-full h-64 mb-4"></div>
      <div className="bg-gray-200 rounded h-4 w-3/4 mb-2"></div>
      <div className="bg-gray-200 rounded h-4 w-1/2 mb-2"></div>
      <div className="flex gap-2 mt-2">
        <div className="bg-gray-200 rounded-full w-4 h-4"></div>
        <div className="bg-gray-200 rounded-full w-4 h-4"></div>
        <div className="bg-gray-200 rounded-full w-4 h-4"></div>
      </div>
    </div>
  )
}

export default SkeletonCard