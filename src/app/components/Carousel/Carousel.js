"use client";

import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./Carousel.scss";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const isMobile = windowDimensions.width <= 426;
  const parallaxOffset = isMobile ? 0 : 280;

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSwipe = (delta) => {
    const newIndex =
      delta > 0
        ? Math.min(currentIndex + 1, data.length - 1)
        : Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const calculateProperty = (index, property) => {
    let isVisible;

    switch (property) {
      case "opacity":
        isVisible =
          (currentIndex === 0 && index <= 1) ||
          currentIndex === 1 ||
          (currentIndex === 2 && index >= 1);
        return isVisible ? 1 : 0;

      case "width":
        isVisible =
          (currentIndex === 0 && index <= 1) ||
          currentIndex === 1 ||
          currentIndex === 2;
        return isVisible ? "auto" : 0;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="slider__wrapper relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * parallaxOffset}px)`,
          }}
          {...handlers}
        >
          {data.map(({ id }, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{
                marginLeft: !isMobile
                  ? index === 0
                    ? `${250}px`
                    : `${90}px`
                  : 60,
                marginRight: index === data.length - 1 ? `${30}px` : `${-45}px`,
                transform: isMobile
                  ? "scale(1)"
                  : index === currentIndex
                  ? "scale(1.3)"
                  : "scale(.92)",
                transition: "all 0.5s ease-in-out",
                opacity: calculateProperty(index, "opacity"),
                width: isMobile
                  ? index === currentIndex
                    ? "auto"
                    : 0
                  : calculateProperty(index, "width"),
              }}
            >
              <div
                className={classNames("slider__item-wrapper", {
                  "slider__item-wrapper--active": index === currentIndex,
                })}
              >
                <Image
                  key={index}
                  src={`${id}.svg`}
                  alt={`Image ${index + 1}`}
                  width={238}
                  height={198}
                />
              </div>
            </div>
          ))}
        </div>
        {currentIndex > 0 && (
          <div
            className="slider__arrow slider__arrow--left"
            onClick={() => handleSwipe(-1)}
          ></div>
        )}
        {currentIndex < data.length - 1 && (
          <div
            className="slider__arrow slider__arrow--right"
            onClick={() => handleSwipe(1)}
          ></div>
        )}
      </div>
      <div className="slider__text-wrapper">
        <p className="slider__title">{data[currentIndex].title}</p>
        <p className="slider__body">{data[currentIndex].body}</p>
      </div>
      <div className="slider__dots">
        {new Array(data.length).fill("").map((_, index) => (
          <div
            key={index}
            className={classNames("slider__dots__dot", {
              "slider__dots__dot--active": index === currentIndex,
            })}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
