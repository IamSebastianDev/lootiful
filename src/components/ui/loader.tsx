import "./loader.scss";
import menu from "../../assets/images/menu.webp";
import { useClassnames as cls } from "../../hooks/use-classnames";
import { toPercent } from "../../core/math";
import { Html } from "@react-three/drei";

export const loader = (elements: number) => (loaded: number) => {
    return (
        <Html fullscreen={true}>
            <div className="w-full h-full stack ui-loader">
                <img src={menu} className="ui-loader-bg" />
                <div className="ui-loader-progress">
                    <div {...cls("ui-progress-bar")} style={{ "--progress-value": `${toPercent(loaded, elements)}%` }}>
                        Loaded {loaded} of {elements} elements...
                    </div>
                </div>
            </div>
        </Html>
    );
};
