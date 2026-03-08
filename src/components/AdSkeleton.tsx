export default function AdSkeleton() {
    return (
        <div className="animate-pulse border rounded-lg p-4 space-y-2 bg-white dark:bg-gray-900">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
    );
}