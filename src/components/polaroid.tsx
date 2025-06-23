import React from 'react';
import '../styles/polaroid.css';

type PolaroidProps = {
    index: number;
    image: string;
    onClick: () => void;
    transforms: {
        x: number;
        y: number;
        rotation: number;
    };
};

const PolaroidDiv: React.FC<PolaroidProps> = ({index, image, onClick, transforms}) => {
    const handleClick = () => {
        console.log(`Polaroid ${index} clicked`);
        onClick();
        const polaroidElement = document.getElementById(`polaroid-${index}`);
        if (polaroidElement) {
            
        }
    };

    const customStyle = {
        '--x': `${transforms.x}px`,
        '--y': `${transforms.y}px`,
        transform: `translate(var(--x), var(--y)) rotate(${transforms.rotation}deg)`,
    };

    return (
        <div
            className="item"
            id={`item-${index}`}
            style={customStyle}
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
