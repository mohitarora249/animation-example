import { useRef, useEffect } from 'react';

const Animate = ({ src, sourceRef, destinationRef }: any) => {
  console.log("Animate")
  const imageRef = useRef(null);

  useEffect(() => {
    const sourceRect = sourceRef.current.getBoundingClientRect();
    const destinationRect = destinationRef.current.getBoundingClientRect();
    const imageNode = imageRef.current;

    const deltaX = destinationRect.left - sourceRect.left;
    const deltaY = destinationRect.top - sourceRect.top;

    console.log("data : ", { sourceRect, destinationRect, imageNode, deltaX, deltaY })

    // Set initial position
    imageNode.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    imageNode.style.opacity = 1; // Set initial opacity to 1
    // Animate to destination
    const animation = imageNode.animate(
      [
        { transform: 'translate(0, 0)', opacity: 0 },
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${deltaX}px, ${deltaY}px)`, opacity: 1 }
      ],
      {
        duration: 1000,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );

    return () => {
      // Cleanup on unmount
      animation.cancel();
    };
  }, [src, sourceRef, destinationRef]);

  return <img className='h-4 w-4 rounded-full' ref={imageRef} src={src} alt="AnimatedImage" />;
};

export default Animate;
