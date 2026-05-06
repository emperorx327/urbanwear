const SkeletonProductDetail = () => {
  return (
    <div className="flex gap-20 px-20 py-10 animate-pulse">
      <div className="flex-shrink-0">
        <div className="bg-gray-200 rounded-lg w-[600px] h-[700px]"></div>
        <div className="flex gap-14 mt-4">
          <div className="bg-gray-200 rounded-lg w-[120px] h-[120px]"></div>
          <div className="bg-gray-200 rounded-lg w-[120px] h-[120px]"></div>
          <div className="bg-gray-200 rounded-lg w-[120px] h-[120px]"></div>
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-gray-200 rounded h-4 w-40 mb-4"></div>
        <div className="bg-gray-200 rounded h-10 w-3/4 mb-4"></div>
        <div className="bg-gray-200 rounded h-8 w-32 mb-4"></div>
        <div className="bg-gray-200 rounded h-4 w-48 mb-8"></div>
        <div className="bg-gray-200 rounded h-px w-full mb-6"></div>
        <div className="bg-gray-200 rounded h-4 w-24 mb-3"></div>
        <div className="flex gap-3 mb-6">
          <div className="bg-gray-200 rounded-full w-7 h-7"></div>
          <div className="bg-gray-200 rounded-full w-7 h-7"></div>
          <div className="bg-gray-200 rounded-full w-7 h-7"></div>
        </div>
        <div className="bg-gray-200 rounded h-4 w-24 mb-3"></div>
        <div className="flex gap-2 mb-6">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded w-12 h-12"></div>
          ))}
        </div>
        <div className="bg-gray-200 rounded w-[380px] h-14 mb-3"></div>
        <div className="bg-gray-200 rounded w-[380px] h-14 mb-6"></div>
        <div className="bg-gray-200 rounded h-4 w-full mb-2"></div>
        <div className="bg-gray-200 rounded h-4 w-3/4"></div>
      </div>
    </div>
  )
}

export default SkeletonProductDetail