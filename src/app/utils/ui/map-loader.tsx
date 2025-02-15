const MapLoader = () => {
    return (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center pt-60">
            <div className="text-gray-400 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4"></div>
                <p>Loading map, please wait...</p>
            </div>
        </div>
    );
};

export default MapLoader;