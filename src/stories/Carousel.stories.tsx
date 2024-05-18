import "./Carousel.stories.scss";

import { Meta, StoryObj } from "@storybook/react";
import clsx from "classnames";

import Carousel, { CarouselProps, CarouselRef } from "../Carousel";
import CarouselDots from "../CarouselDots";

import { useRef, useState } from "react";
import building from "./assets/building.webp";
import coffee from "./assets/coffee.webp";
import coffee2 from "./assets/coffee2.webp";
import flower from "./assets/flower.webp";

const meta: Meta<typeof Carousel> = {
  title: "Carousel",
  component: Carousel,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
    shownSlides: {
      type: "number",
      description: "Number of slides to show",
      control: { type: "number" },
    },
    transitionDuration: {
      type: "number",
      description: "Duration of the slide transition",
      control: { type: "number" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const BasicCarousel: Story = {
  args: {
    children: [
      <div className="CarouselStory__slide">
        <img src={building} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={flower} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={coffee} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={coffee2} />
      </div>,
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomizedDots: Story = {
  args: {
    children: [
      <div className="CarouselStory__slide">
        <img src={building} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={flower} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={coffee} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={coffee2} />
      </div>,
    ],
    customDots: (props) => (
      <CarouselDots
        wrapperClassName="CustomizedDots"
        dotClassName="CustomizedDots__dot"
        {...props}
      />
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: 400 }}>
        <Story />
      </div>
    ),
  ],
};

const images = [building, flower, coffee, coffee2];

const CustomDotComponent = ({
  activeDot,
  onDotClick,
}: {
  dots: number;
  activeDot: number;
  onDotClick?: (index: number) => void;
}) => (
  <div className="CustomDots">
    {images.map((image, index) => (
      <div
        key={index}
        className={clsx("CustomDots__dot", {
          "CustomDots__dot--active": activeDot === index,
        })}
        onClick={() => onDotClick?.(index)}
      >
        <img src={image} />
      </div>
    ))}
  </div>
);

export const CustomDots: Story = {
  args: {
    children: [
      <div className="CarouselStory__slide">
        <img src={building} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={flower} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={coffee} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={coffee2} />
      </div>,
    ],
    customDots: (props) => <CustomDotComponent {...props} />,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const ActiveSlideStyle: Story = {
  args: {
    shownSlides: 3,
    transitionDuration: 0.5,
    children: [
      <div className="CarouselStory__slide">
        <img src={building} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={flower} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={coffee} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={coffee2} />
      </div>,
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: 400 }} className="ActiveSlideStyle">
        <Story />
      </div>
    ),
  ],
};

const CarouselWithSeparateDots = (props: CarouselProps) => {
  const carouselRef = useRef<CarouselRef>(null);
  const [slide, setSlide] = useState(0);
  return (
    <>
      <Carousel onSlideChange={setSlide} ref={carouselRef} {...props}>
        {props.children}
      </Carousel>
      <div className="DotsArrowsOutside__container">
        <button
          onClick={() => {
            carouselRef.current?.prevSlide();
          }}
          className="DotsArrowsOutside__button"
        >
          Prev
        </button>
        <div className="DotsArrowsOutside__slideCount">{slide}</div>
        <button
          onClick={() => {
            carouselRef.current?.nextSlide();
          }}
          className="DotsArrowsOutside__button"
        >
          Next
        </button>
      </div>
    </>
  );
};

export const DotsArrowsOutside: Story = {
  args: {
    shownSlides: 3,
    transitionDuration: 0.5,
    customArrows: null,
    customDots: null,
    children: [
      <div className="CarouselStory__slide">
        <img src={building} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={flower} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={coffee} />
      </div>,
      <div className="CarouselStory__slide">
        <img src={coffee2} />
      </div>,
    ],
  },
  render: (props) => <CarouselWithSeparateDots {...props} />,
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: 400 }} className="DotsArrowsOutside">
        <Story />
      </div>
    ),
  ],
};

const StylizedCarouselComponent = (props: CarouselProps) => {
  const [slide, setSlide] = useState(0);
  return (
    <>
      <Carousel
        disableTranslate
        onSlideChange={setSlide}
        trackClassName="StylizedCarousel__track"
        slideClassName="StylizedCarousel__carouselSlide"
        {...props}
      >
        {images.map((image, index) => {
          let rot = 0;
          if (index > slide) {
            rot = (index - slide) * 5 + 60; // Rotate right for next slides
          } else if (index < slide) {
            rot = (slide - index) * -5 - 60; // Rotate left for previous slides
          }
          return (
            <div
              key={index}
              className="CarouselStory__slide StylizedCarousel__slide"
              style={{
                rotate: `${rot}deg`,
              }}
            >
              <img src={image} />
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export const StylizedCarousel: Story = {
  args: {
    shownSlides: 3,
    transitionDuration: 0.5,
  },
  render: (props) => <StylizedCarouselComponent {...props} />,
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: 400 }} className="StylizedCarousel">
        <Story />
      </div>
    ),
  ],
};
