import { useEffect, useState } from "react";
import { fromEvent, merge, Observable, of, Subscription } from "rxjs";
import { map, startWith, switchMap, throttleTime } from "rxjs/operators";

type Styles = {
  [key: string]: string | number;
};

type AnimationConfig = {
  [key: string]: {
    start: string | number;
    end: string | number;
  };
};

const setStyles = (el: HTMLElement): ((styles: Styles) => void) => {
  return (styles: Styles) => {
    for (let key in styles) {
      el.style[key as any] = styles[key].toString();
    }
  };
};

const animateElement = (
  selector: string,
): ((config: AnimationConfig) => Observable<Styles>) => {
  const setElStyles = setStyles(
    document.querySelector<HTMLElement>(selector)!,
  ) as any;

  return (config: AnimationConfig) => {
    return merge(
      of(0),
      fromEvent(window, "scroll").pipe(throttleTime(10)),
      fromEvent(window, "resize").pipe(throttleTime(10)),
    ).pipe(
      map(() => {
        const scrollPos = window.pageYOffset;
        const { height, top } = document
          .querySelector<HTMLElement>(selector)!
          .getBoundingClientRect();

        const scrollFraction =
          scrollPos /
          (document.documentElement.scrollHeight - window.innerHeight);
        const elFraction = (scrollPos - top) / height;

        return { scrollFraction, elFraction };
      }),
      map(({ scrollFraction, elFraction }) => {
        const newStyles: Styles = {};

        for (let key in config) {
          const { start, end } = config[key];
          newStyles[key] =
            (start as number) +
            ((end as number) - (start as number)) *
            (config.parallax ? elFraction : scrollFraction);
        }

        return newStyles;
      }),
      startWith(config.start),
      switchMap(setElStyles),
    );
  };
};

export const useAnimation = (
  selector: string,
  config: AnimationConfig,
): void => {
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (isReducedMotion) {
      return;
    }

    const animation$ = animateElement(selector)(config);
    const subscription: Subscription = animation$.subscribe();

    return () => subscription.unsubscribe();
  }, [selector, config, isReducedMotion, setIsReducedMotion]);
};

/**
 * @description RXJS Animation library
 * @memberof useAnimation

  const animateTheThing = useAnimation('selector', { 'key': { start: '', end: '' } })

*/