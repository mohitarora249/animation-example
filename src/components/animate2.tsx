import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Animate2 = ({ src, x, y, x1, y1 }: any) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageNode = imageRef.current;
    console.log("here")
    // Set initial position
    gsap.set(imageNode, { x, y, opacity: 1 });

    // Animate to destination
    gsap.to(imageNode, {
      x: x1,
      y: y1,
      opacity: 1,
      duration: 4,
      ease: 'power2.inOut'
    });

    return () => {
      // Cleanup on unmount
      gsap.killTweensOf(imageNode);
    };
  }, [src, x, y, x1, y1]);

  return <img className='h-8 w-8 rounded-full absolute' ref={imageRef} src={src} alt="AnimatedImage" />;
};

export default Animate2;
