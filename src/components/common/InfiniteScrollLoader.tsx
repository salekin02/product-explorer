import type { RefObject } from 'react';

interface InfiniteScrollTriggerProps {
  observerRef: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function InfiniteScrollLoader({
  observerRef,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollTriggerProps) {
  if (!hasNextPage) return null;

  return (
    <div ref={observerRef} className="mt-6 text-center py-4">
      {isFetchingNextPage && (
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading more products...</span>
        </div>
      )}
    </div>
  );
}
