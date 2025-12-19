export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 animate-fade-in">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-primary-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-primary-600 animate-spin"></div>
      </div>
      <p className="text-dark-600 font-medium">Loading...</p>
    </div>
  );
};
