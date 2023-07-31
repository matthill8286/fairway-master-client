import { useState, useEffect } from 'react';

const useSlideInAnimation = (linksCount = 3, delay = 100) => {
    const [animationStates, setAnimationStates] = useState(Array(linksCount).fill(false));

    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = [];

        const handleAnimation = (index: number) => () => {
            setAnimationStates((prevStates) => {
                const updatedStates = [...prevStates];
                updatedStates[index] = true;
                return updatedStates;
            });
        };

        const animateLinks = () => {
            for (let i = 0; i < linksCount; i++) {
                timeouts.push(setTimeout(handleAnimation(i), delay * (i + 1)));
            }
        };

        animateLinks();

        return () => {
            timeouts.forEach((timeout) => clearTimeout(timeout));
        };
    }, [linksCount, delay]);

    const areLinksVisible = animationStates.every((state) => state);

    return areLinksVisible;
};

export default useSlideInAnimation; 