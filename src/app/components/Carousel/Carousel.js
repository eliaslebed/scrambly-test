"use client";

import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { getWindowDimensions, screens } from "../../utils/index";
import "./Carousel.scss";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const isMobile = windowDimensions.width <= screens.md;

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSwipe = (delta) => {
    const newIndex = (currentIndex + delta + data.length) % data.length;

    // Prevent swiping left from the first slide
    if (delta === -1 && currentIndex === 0) {
      return;
    }

    setCurrentIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const calculateOpacity = (index) => {
    const isVisible =
      (currentIndex === 0 && index <= 1) ||
      currentIndex === 1 ||
      (currentIndex === 2 && index >= 1);

    return isVisible ? 1 : 0;
  };

  const containerWidth = data.length * 600;
  const responsiveScale = isMobile ? "scale(1)" : "scale(1.3)";
  const carouselOffset = 300;
  const mobileCarouselOffset = { offset: 70, shift: 290 };

  return (
    <div className="container mx-auto relative w-full lg:w-3/4 xl:w-2/3 overflow-hidden">
      <div
        className="slider__wrapper relative flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * carouselOffset}px)`,
          width: `${containerWidth}px`,
        }}
        {...handlers}
      >
        {data.map(({ id }, index) => (
          <div
            key={index}
            className="slider__item flex-shrink-0"
            style={{
              left: isMobile
                ? mobileCarouselOffset.offset +
                  index * mobileCarouselOffset.shift
                : carouselOffset + index * carouselOffset,
              transform:
                index === currentIndex ? responsiveScale : "scale(.92)",
              transition: "transform 0.5s ease-in-out",
              opacity: calculateOpacity(index),
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
