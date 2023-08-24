// Don't worry too much about this, it just means that the component is rendered on the client
// instead of the server. In this case since we are storing information and running effects,
// we have to run on the client.
// If you get an error that says you need to run on the client, just add "use client"; to the
// top of the file.
"use client";

import { Button } from "@/components/common/Button";
import { useEffect, useState } from "react";

export default function Page() {
  // Since this page is techincally a function that React automatically calls whenever it wants
  // to render or rerender the page, there is no way to store variables or information between
  // render calls.

  // To counter this, we ask React to store a variable for us by using the 'useState'
  // hook. useState returns two values, the first is a reference to the current value of
  // the variable, and the second is a function that you can call to update the variable.

  // We also put the default or initial value of the variable in the arguments to useState,
  // in this case the default value is '0'.
  const [count, setCount] = useState<number>(0);

  // If we want to have some code that runs on render calls, but only if some conditions are met,
  // we can use the 'useEffect' hook. The first argument that we give to useEffect is a lambda function
  // that will be called by React when the conditions are met, we call this argument the 'effect'.
  // The second argument is an array of 'dependencies', dependencies are any objects which will
  // cause the effect to be re-run when they are changed.

  // In this case, we only want to run the lambda function once, the very first time the component
  // is 'mounted' (mounted means the component becomes visible, or becomes part of the DOM).

  // This lambda function starts a clock in the background which will run 'setCount(0)' every
  // 2000 milliseconds. We only need to run this code when the component is mounted because after
  // then, the clock will continue in the background without us.

  // The return value of the effect function is the 'cleanup' function, the cleanup function is run
  // in two cases:
  // 1. Before the effect is run again on another render (if one of the dependencies changes).
  // 2. The component is unmounted (becomes invisible or is removed from the DOM).

  // By clearing the interval in the cleanup function, we ensure that when the component is not
  // on the screen, the clock doesn't keep running in the background, wasting computer resources.
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(0);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Below is an example of an effect that is run every time the count is changed.
  // If you open the developer inspector in Google Chrome, and click on the console tab, you
  // can see the messages being sent every time you click the button, or the button resets to zero.
  // This effect does not need a cleanup function because there is nothing to clean up.
  useEffect(() => {
    console.log(count);
  }, [count]);

  // The return value to the component is what actually gets rendered to the screen, we usually use
  // JSX to define the HTML which will be rendered. When writing JSX, you can use any normal HTML elements
  // as well as any custom HTML elements (components) that you want, in this case we are using the
  // custom 'Button' component which we have imported at the top of this file.

  // We write all of our styling using TailwindCSS as classes, TailwindCSS has a huge collection of classes
  // which apply different styles to the element, you can look at their website for more detail.
  return (
    <div className="flex-1 flex flex-col justify-center gap-5">
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Count = {count}
      </Button>
    </div>
  );

  // Some other important hooks (which is what we call useState and useEffect) include
  // 'useCallback' and 'useMemo', these are slightly more complicated because you often don't need them.

  // I'll explain them briefly, 'useCallback' means that you want a function to have the same reference
  // between render calls, normally when you define a lambda function like () => { something here; },
  // it created a completely new object in memory, so if that lambda function is a dependency for a useEffect
  // or other hook, then every time you rerender, the dependency will "change" even though the function is
  // technically the same.

  // By using useCallback, you can make it so that the function actually has the same reference, so no hooks
  // will be confused.

  // 'useMemo' means that you want to store the return value of a function call that doesn't change often,
  // for example you want to store the square root of the count in a variable but only want to calculate
  // it when the count actually changes, in that case you could use code like below:

  // useMemo(() => {
  //   return Math.sqrt(count);
  // }, [count]);

  // Whenever you use a HTML id attribute, make sure you are using the 'useId' hook, otherwise you
  // may have ids duplicated between instances of the component (for example two different buttons using
  // the same ids).
}
