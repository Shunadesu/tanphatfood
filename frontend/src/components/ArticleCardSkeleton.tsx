'use client'

interface ArticleCardSkeletonProps {
  count?: number
}

const ArticleCardSkeletonItem = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse">
    {/* Image */}
    <div className="relative w-full flex-[1.4] bg-gray-200 min-h-[240px]">
      {/* Logo Badge */}
      <div className="absolute top-0 left-0 bg-gray-300 rounded-br-3xl px-3 py-2 shadow-md z-10 w-16 h-16" />
    </div>

    {/* Content */}
    <div className="bg-white p-5 md:p-6 flex flex-col flex-1">
      {/* Category badge */}
      <div className="mb-2">
        <div className="inline-block px-3 py-1 bg-gray-200 rounded-full w-20 h-5" />
      </div>

      {/* Title */}
      <div className="mb-2 space-y-1">
        <div className="h-5 bg-gray-200 rounded w-full" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
      </div>

      {/* Description */}
      <div className="space-y-1 mb-4 flex-grow">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between gap-4 mt-auto pt-2">
        <div className="h-8 bg-gray-200 rounded-lg w-24" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
    </div>
  </div>
)

const ArticleCardSkeleton = ({ count = 3 }: ArticleCardSkeletonProps) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <ArticleCardSkeletonItem key={i} />
    ))}
  </>
)

export default ArticleCardSkeleton
