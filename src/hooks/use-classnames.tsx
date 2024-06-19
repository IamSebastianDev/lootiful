/** @format */

export const useClassnames = (...classes: (string | string[] | null | undefined | { [key: string]: boolean })[]) => {
    return {
        className: classes
            .flatMap((cls) => {
                if (typeof cls === 'string') {
                    return cls;
                } else if (Array.isArray(cls)) {
                    return cls;
                } else if (cls && typeof cls === 'object') {
                    return Object.entries(cls)
                        .filter(([_, value]) => value)
                        .map(([key, _]) => key);
                }
                return [];
            })
            .filter(Boolean)
            .join(' '),
    };
};
