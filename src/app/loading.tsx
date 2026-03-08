export default function Loading() {
    return (
        <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
            <div
            key={index}
            className="animate-pulse bg-gray-200 h-48 rounded-md"
            />
        ))}
        </main>
    );
}