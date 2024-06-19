/** @format */

import { Html } from '@react-three/drei';
import { useScene } from '../../../core/scene';
import './menu-panel.scss';
import { Heading } from '../../ui/heading';
import { Button } from '../../ui/button';
export const MenuPanel = () => {
    const { next } = useScene();

    const buttons = [
        {
            label: 'New Game',
            onClick: () => console.log('New Game'),
        },
        {
            label: 'Continue',
            onClick: () => console.log('New Game'),
        },
        {
            label: 'Settings',
            onClick: () => next('options'),
        },
    ];

    return (
        <Html fullscreen={true}>
            <div className="stack w-full h-full center">
                <div className="stack menu-outer">
                    <div className="menu-backdrop" />
                    <div className="menu-panel">
                        <Heading size="lg">Lootiful</Heading>
                        <div className="ui-divider"></div>
                        {buttons.map(({ label, onClick }) => (
                            <Button bordered={true} details={true} key={label} onClick={onClick} size={'md'}>
                                {label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </Html>
    );
};
