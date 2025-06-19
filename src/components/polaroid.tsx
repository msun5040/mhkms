import React from 'react';
import '../styles/polaroid.css';

type PolaroidProps = {
    index: number;
    image: string;
    onClick: () => void;
};

const PolaroidDiv: React.FC<PolaroidProps> = ({index, image, onClick}) => {
    const handleClick = () => {
        console.log(`Polaroid ${index} clicked`);
        onClick();
    };

    const transforms = {
                x: Math.random() * 20 - 10,
                y: Math.random() * 20 - 10,
                rotation: Math.random() * 20 - 10};
    return (
        <div
            className="item"
            id={`item-${index}`}
            style={{
                transform: `translate(${transforms.x}px, ${transforms.y}px) rotate(${transforms.rotation}deg)`,
            }}
            onClick={handleClick}
        >
            <div className="polaroid" id={`polaroid-${index}`}>
                <img
                    className="polaroid-image"
                    src={image}
                    alt='Polaroid'
                />
            </div>
        </div>
    );
};

export default PolaroidDiv;
