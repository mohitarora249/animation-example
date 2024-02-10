"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

type Props = {
    id: string;
    name?: string;
    className?: string;
    onClickCallback: (ref: any) => void;
}

const Player = ({ id,  name = "Jogn Doe", className = "", onClickCallback }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null);
    // const [show, setShow] = useState(false);
    
    const onClickHandler = () => {
        console.log("onClickHandler");
        // setShow(true);
        onClickCallback(ref);
        // setTimeout(() => {
        //     setShow(false);
        // }, 500);
    }

    return (
        <div ref={ref} id={id} className={cn(className, "flex space-x-2 bg-gray-300 p-1 rounded-full")} onClick={onClickHandler}>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <span>{name}</span>
            {/* {show && <Animate2 src="https://github.com/shadcn.png" x={0} y={0} x1={400} y1={400} /> } */}
        </div>
    )
}

export default Player;
