"use client";

import { useEffect, useRef, useState } from 'react';
import './App.css'
import Player from './components/player'
import gsap from 'gsap';
import { cn } from './lib/utils';

function App() {
  const [show, setShow] = useState(false);
  const [showFirework, setShowFirework] = useState(false);
  const [info, setInfo] = useState({x:0, y:0});
  const imageRef = useRef(null);
  const fireworkImageRef = useRef(null);
  

  useEffect(() => {
    const imageNode = imageRef.current;
    if (show) {
      // Set initial position
      gsap.set(imageNode, { x: 0, y: 0, opacity: 1 });
      // Animate to destination
      gsap.to(imageNode, {
        x: info.x,
        y: info.y,
        opacity: 1,
        duration: 4,
        ease: 'power2.inOut',
        onComplete: () => {
          setShow(false);
          setShowFirework(true);
          fireworkImageRef.current.style.top = `${info.y}px`;
          fireworkImageRef.current.style.left = `${info.x}px`
          setTimeout(() => {
            setShowFirework(false);
          }, 2000)
        }
      });
    }
    

    return () => {
      // Cleanup on unmount
      gsap.killTweensOf(imageNode);
    };
  }, [show, showFirework]);

  const onClickCallback = (ref: any) => {
    const {top, left } = ref.current.getBoundingClientRect();
    const srcElem = document.getElementById("player1").getBoundingClientRect();
    setInfo({
      x: left - srcElem.left,
      y: top - srcElem.top
    });
    setShow(true);
  }
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='h-3/5	w-3/5 bg-gray-200 rounded-full relative'>
        <Player onClickCallback={onClickCallback}  id="player1" name="John Doe" className='absolute'/>
        <Player onClickCallback={onClickCallback}  id="player2" name="John Doe 2" className='absolute -right-4'/>
        <Player onClickCallback={onClickCallback}  id="player3" name="John Doe 3" className='absolute bottom-0 -left-4'/>
        <Player onClickCallback={onClickCallback}  id="player4" name="John Doe 4" className='absolute bottom-0 -right-4'/>
        <img className={cn('h-10 w-10', show ? "block" : "hidden")} ref={imageRef}  src={"/rocket.png"} alt="AnimatedImage" />
        <img className={cn("h-36 w-36 absolute", showFirework ?  "block" : "hidden")} ref={fireworkImageRef}  src={"/firework-2.gif"} alt="AnimatedImage"  />
      </div>
    </div>
  )
}

export default App
