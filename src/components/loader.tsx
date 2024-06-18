export const loader = (elements: number) => (loaded: number) => {
    return (
        <div className="w-full h-full stack center">
            <progress max={elements} value={loaded} />
            <div>
                Loading {loaded} of {elements} elements...
            </div>
        </div>
    );
};
