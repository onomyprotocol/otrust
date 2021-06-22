import * as React from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { useInterval } from 'hooks/useInterval';
import { randomInt } from 'utils/math';

const LoadingBar = forwardRef(
  (
    {
      progress,
      height = 2,
      className = '',
      color = 'red',
      background = 'transparent',
      onLoaderFinished,
      transitionTime = 300,
      loaderSpeed = 500,
      waitingTime = 1000,
      shadow = true,
    },
    ref,
  ) => {
    const [localProgress, localProgressSet] = useState(0);
    const [pressedContinuous, setPressedContinuous] = useState({ active: false, startingValue: 20, refreshRate: 1000 });
    const [usingProps, setUsingProps] = useState(false);

    const [pressedStaticStart, setStaticStartPressed] = useState({ active: false, value: 20 });

    const initialLoaderStyle = {
      height: '100%',
      background: color,
      transition: `all ${loaderSpeed}ms ease`,
      width: '0%',
    };

    const loaderContainerStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      height,
      background,
      zIndex: 99999999999,
      width: 100 + '%',
    };

    const initialShadowStyles = {
      boxShadow: `0 0 10px ${color}, 0 0 10px ${color}`,
      width: '5%',
      opacity: 1,
      position: 'absolute',
      height: '100%',
      transition: `all ${loaderSpeed}ms ease`,
      transform: 'rotate(3deg) translate(0px, -4px)',
      left: '-10rem',
    };

    const [loaderStyle, loaderStyleSet] = useState(initialLoaderStyle);
    const [shadowStyle, shadowStyleSet] = useState(initialShadowStyles);

    useImperativeHandle(ref, () => ({
      continuousStart(startingValue, refreshRate = 1000) {
        if (pressedStaticStart.active) return;
        if (usingProps) {
          console.warn(
            "react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!",
          );
          return;
        }

        const val = startingValue || randomInt(10, 20);
        setPressedContinuous({
          active: true,
          refreshRate,
          startingValue,
        });
        localProgressSet(val);
        checkIfFull(val);
      },
      staticStart(startingValue) {
        if (pressedContinuous.active) return;
        if (usingProps) {
          console.warn(
            "react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!",
          );
          return;
        }

        const val = startingValue || randomInt(30, 50);
        setStaticStartPressed({
          active: true,
          value: val,
        });
        localProgressSet(val);
        checkIfFull(val);
      },
      complete() {
        if (usingProps) {
          console.warn(
            "react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!",
          );
          return;
        }
        localProgressSet(100);
        checkIfFull(100);
      },
    }));

    useEffect(() => {
      loaderStyleSet({
        ...loaderStyle,
        background: color,
      });

      shadowStyleSet({
        ...shadowStyle,
        boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
      });
    }, [color, loaderStyle, shadowStyle]);

    const checkIfFull = React.useCallback(
      _progress => {
        if (_progress >= 100) {
          // now it should wait a little bit
          loaderStyleSet({
            ...loaderStyle,
            width: '100%',
          });
          if (shadow) {
            shadowStyleSet({
              ...shadowStyle,
              left: _progress - 10 + '%',
            });
          }

          setTimeout(() => {
            // now it can fade out
            loaderStyleSet({
              ...loaderStyle,
              opacity: 0,
              width: '100%',
              transition: `all ${transitionTime}ms ease-out`,
              color: color,
            });

            setTimeout(() => {
              // here we wait for it to fade
              if (pressedContinuous.active) {
                // if we have continous loader just ending, we kill it and reset it
                setPressedContinuous({
                  ...pressedContinuous,
                  active: false,
                });
                localProgressSet(0);
                checkIfFull(0);
              }

              if (pressedStaticStart.active) {
                setStaticStartPressed({
                  ...pressedStaticStart,
                  active: false,
                });
                localProgressSet(0);
                checkIfFull(0);
              }

              if (onLoaderFinished) onLoaderFinished();
              localProgressSet(0);
              checkIfFull(0);
            }, transitionTime);
          }, waitingTime);
        } else {
          loaderStyleSet(_loaderStyle => {
            return {
              ..._loaderStyle,
              width: _progress + '%',
              opacity: 1,
              transition: _progress > 0 ? `all ${loaderSpeed}ms ease` : '',
            };
          });

          if (shadow) {
            shadowStyleSet({
              ...shadowStyle,
              left: _progress - 5.5 + '%',
              transition: _progress > 0 ? `all ${loaderSpeed}ms ease` : '',
            });
          }
        }
      },
      [
        color,
        loaderSpeed,
        loaderStyle,
        onLoaderFinished,
        pressedContinuous,
        pressedStaticStart,
        shadow,
        shadowStyle,
        transitionTime,
        waitingTime,
      ],
    );

    useEffect(() => {
      if (ref) {
        if (ref && progress !== undefined) {
          console.warn(
            'react-top-loading-bar: You can\'t use both controlling by props and ref methods to control the bar! Please use only props or only ref methods! Ref methods will override props if "ref" property is available.',
          );
          return;
        }
        checkIfFull(localProgress);
        setUsingProps(false);
      } else {
        if (progress) checkIfFull(progress);

        setUsingProps(true);
      }
    }, [checkIfFull, localProgress, progress, ref]);

    useInterval(
      () => {
        const random = randomInt(10, 20);

        if (localProgress + random < 90) {
          localProgressSet(localProgress + random);
          checkIfFull(localProgress + random);
        }
      },
      pressedContinuous.active ? pressedContinuous.refreshRate : null,
    );

    return (
      <div className={className} style={loaderContainerStyle}>
        <div style={loaderStyle}>{shadow ? <div style={shadowStyle} /> : null}</div>
      </div>
    );
  },
);

export default LoadingBar;
