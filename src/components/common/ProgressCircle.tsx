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
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <radialGradient id={gradientId}>
                <stop offset="90%" stop-color="black" />
                <stop offset="91%" stop-color="white" />
                <stop offset="99%" stop-color="white" />
                <stop offset="100%" stop-color="black" />
              </radialGradient>
            </defs>

            <mask id={maskId}>
              <rect
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                fill={`url(#${gradientId})`}
              />
            </mask>

            <foreignObject
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              mask={`url(#${maskId})`}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={progressGradient}
              />
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
