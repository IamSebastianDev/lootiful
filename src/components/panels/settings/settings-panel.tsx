/** @format */

import { Html } from '@react-three/drei';
import { useScene } from '../../../core/scene';
import './settings-panel.scss';
import { Heading } from '../../ui/heading';
export const SettingsPanel = () => {
    const { next } = useScene();

    return (
        <Html fullscreen={true}>
            <div className="stack w-full h-full center">
                <div className="stack options-outer">
                    <div className="options-backdrop" />
                    <div className="options-panel">
                        <Heading size="md">Settings</Heading>
                        <div className="ui-divider"></div>
                        <button className="ui-button" onClick={() => next('menu')}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </Html>
    );
};
