import { ComponentPropsWithoutRef, useEffect, useId, useState } from "react";

// Todo: modify to use @property rules and css animation / css houdini instead of js animation.

export function ProgressCircle({
  initialValue,
  targetValue,
  updateMillis,
  pidGain,
  progressColor,
  backgroundColor,
  ...divProps
}: {
  initialValue: number;
  targetValue: number;
  updateMillis: number;
  progressColor: string;
  backgroundColor: string;
  pidGain: number;
} & ComponentPropsWithoutRef<"div">) {
  const [value, setValue] = useState<number>(initialValue);
  const gradientId = useId();
  const maskId = useId();

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => v + (targetValue - v) * pidGain);
    }, updateMillis);

    return () => {
      clearInterval(interval);
    };
  }, [pidGain, targetValue, updateMillis]);

  const progressGradient = {
    background: `conic-gradient(${progressColor} ${value}%, ${backgroundColor} 0%)`,
  };

  return (
    <>
      <div {...divProps}>
        <div className="relative">
          <svg
            className="w-full h-full"
            width="1000px"
            height="1000px"
            viewBox="0 0 1000 1000"
          >
            <defs>
              <radialGradient id={gradientId}>
                <stop offset="90%" stopColor="black" />
                <stop offset="90.5%" stopColor="white" />
                <stop offset="99.5%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </radialGradient>
            </defs>

            <mask id={maskId}>
              <rect
                x="0%"
                y="0%"
                width="1000px"
                height="1000px"
                fill={`url(#${gradientId})`}
              />
            </mask>

            <foreignObject
              x="0%"
              y="0%"
              width="1000px"
              height="1000px"
              mask={`url(#${maskId})`}
            >
              <div className="w-full h-full" style={progressGradient} />
            </foreignObject>
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-white text-2xl">{Math.round(value)}/100</span>
          </div>
        </div>
      </div>
    </>
  );
}
