const ContextLoader = () => {
    return (
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
                <p className="text-white">Fetching users's location, please wait...</p>
            </div>
    );
};

export default ContextLoader;