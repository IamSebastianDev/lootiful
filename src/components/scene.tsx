import React, { PropsWithChildren } from "react";

export type SceneProps = PropsWithChildren & {
    background: string;
};

export const Scene: React.FC<SceneProps> = ({ background, children }) => {
    return (
        <div className="scene" style={{ backgroundImage: `url(${background})` }}>
            {children}
        </div>
    );
};
