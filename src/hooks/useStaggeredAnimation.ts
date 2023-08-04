import { useState, useEffect } from 'react';

const useStaggeredSlideInAnimation = (linksCount = 3, delay = 100) => {
    const [animationStates, setAnimationStates] = useState(Array(linksCount).fill(false));

    useEffect(() => {
        const animateLinks = async () => {
            for (let i = 0; i < linksCount; i++) {
                await new Promise((resolve) => setTimeout(resolve, delay)); // Introduce a delay
                setAnimationStates((prevStates) => {
                    const updatedStates = [...prevStates];
                    updatedStates[i] = true;
                    return updatedStates;
                });
            }
        };

        animateLinks();
    }, [linksCount, delay]);

    const areLinksVisible = animationStates.every((state) => state);

    return areLinksVisible;
};

export default useStaggeredSlideInAnimation;
