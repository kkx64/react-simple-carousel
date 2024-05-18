# Simple React Carousel

A simple, lightweight, performant & easy to modify carousel component for React. Built for simplicity and ease of use.  
Works on desktop with arrows and dragging on mobile.

See the [Storybook](https://kkx64.github.io/react-simple-carousel/?path=/story/carousel--basic-carousel) for demos.

## Installation

You can install the package using your package manager of choice:

```bash
pnpm add @kkx64/react-simple-carousel
yarn add @kkx64/react-simple-carousel
npm install @kkx64/react-simple-carousel
```

## Usage

### Basic Setup

Setting up the carousel is super simple, just make sure that your wrapping element has a set height, as the `<Carousel/>` component has width and height set to `100%`:

```tsx
import Carousel from "@kkx64/react-simple-carousel";

const MyCarousel = () => {
  return (
    <Carousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>
  );
};

export default MyCarousel;
```

## Components

The library exports three components: `Carousel`, `CarouselDots` and `CarouselArrows`. They can all be used in combination or by themselves, depending on your needs. The `Carousel` component contains the other two components by default, unless they are overridden.

## Carousel

### CarouselProps

- **shownSlides**: `number`  
  The number of slides to be displayed simultaneously.

- **transitionDuration**: `number`  
  The duration (in seconds) of the slide transition animation.

- **containerClassName**: `string`  
  **Replacement** CSS class names for the carousel container.

- **trackClassName**: `string`  
  **Replacement** CSS class names for the carousel track.

- **slideClassName**: `string`  
   **Replacement** CSS class names for individual slides.  
   When you replace this class, you also have access to two extra classes:

  ```css
  .yourClass--active {
    // controls the style of the active item
  }
  .yourClass--dragging {
    // applied while the slide is being dragged
  }
  ```

  Structure:

  ```text
  container
  - track
  -- slide
  -- slide
  - track
  container
  ```

- **disableTranslate**: `boolean`  
  Boolean indicating whether to disable CSS translation for slide animations.

- **customDots**: `((props: { dots: number; activeDot: number; onDotClick?: (index: number) => void; }) => JSX.Element) | null`  
  A function that renders custom navigation dots.  
  You can use the existing `CarouselDots` component here, if you want to just override simple styles in the default layout.  
  If you don't want to render any dots, pass `null` as a prop.

- **customArrows**: `((props: { onNextClick: () => void; onPrevClick: () => void; }) => JSX.Element) | null`  
  A function that renders custom navigation arrows.  
  You can use the existing `CarouselArrows` component here, if you want to just override simple styles in the default layout.  
  If you don't want to render any arrows, pass `null` as a prop.

- **onSlideChange**: `(index: number) => void`  
  A callback function invoked when the active slide changes.

### CarouselRef

- **nextSlide**: `() => void`  
  A function to navigate to the next slide.

- **prevSlide**: `() => void`  
  A function to navigate to the previous slide.

## CarouselDots

### CarouselDotsProps

- **onDotClick**: `(dot: number) => void`  
  A callback function invoked when a dot is clicked. Receives the index of the clicked dot as an argument.

- **dots**: `number`  
  The total number of dots to be rendered.

- **activeDot**: `number`  
  The index of the active dot.

- **containerClassName**: `string`  
  **Replacement** CSS class names for the container of the dots.

- **wrapperClassName**: `string`  
  **Replacement** CSS class names for the wrapper of the dots.

- **trackClassName**: `string`  
  **Replacement** CSS class names for the track of the dots.

- **dotClassName**: `string`  
  **Replacement** CSS class names for individual dots.
  Access the active dot with:

  ```css
  .yourClass--active {
    // your styles
  }
  ```

  Structure:

  ```text
  wrapper
  - container
   -- track
   --- dot
   --- dot
   -- track
  - container
  wrapper
  ```

## CarouselArrows

### CarouselArrowsProps

- **onNextClick**: `() => void`  
  A callback function invoked when the next arrow is clicked.

- **onPrevClick**: `() => void`  
  A callback function invoked when the previous arrow is clicked.

- **containerClassName**: `string`  
  **Replacement** CSS class names for the container of the arrows.

- **arrowClassName**: `string`  
   **Replacement** CSS class names for individual arrows.  
   If you replace this class, you have access to two additional classes:

  ```css
  .yourClass--prev{
   // left arrow
  }
  .yourClass--next{
    // right arrow
  }
  ```

- **wrapperClassName**: `string`  
   **Replacement** CSS class names for the wrapper of the arrows.

  Structure:

  ```text
  wrapper
  - container
    -- arrow
    -- arrow
  - container
  wrapper
  ```

## Examples

### Basic

```tsx
import React from "react";
import Carousel from "./Carousel"; // Import your Carousel component
import building from "./building.jpg"; // Import your image files
import flower from "./flower.jpg";
import coffee from "./coffee.jpg";
import coffee2 from "./coffee2.jpg";

// Important: the container of the Carousel needs to have a set height

const BasicCarousel = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <Carousel shownSlides={1} transitionDuration={0.5}>
        <img src={building} alt="Building" />
        <img src={flower} alt="Flower" />
        <img src={coffee} alt="Coffee" />
        <img src={coffee2} alt="Coffee 2" />
      </Carousel>
    </div>
  );
};

export default BasicCarousel;
```

```scss
.Carousel {
  &__slide {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
```

### Customize Dots

```tsx
import React from "react";
import Carousel from "./Carousel";

import building from "./building.jpg";
import flower from "./flower.jpg";
import coffee from "./coffee.jpg";
import coffee2 from "./coffee2.jpg";

const CustomizedDotsCarousel = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <Carousel
        dotClassName="CustomDot"
        shownSlides={1}
        transitionDuration={0.5}
        customDots={(props) => (
          <CarouselDots
            wrapperClassName="CustomizedDots"
            dotClassName="CustomizedDots__dot"
            {...props}
          />
        )}
      >
        <img src={building} alt="Building" />
        <img src={flower} alt="Flower" />
        <img src={coffee} alt="Coffee" />
        <img src={coffee2} alt="Coffee 2" />
      </Carousel>
    </div>
  );
};

export default CustomizedDotsCarousel;
```

```scss
.CustomizedDots {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 200px;
  background-color: transparent;
  z-index: 2;

  &__dot {
    height: 10px;
    width: 10px;
    border-radius: 24px;
    background-color: white;
    &--active {
      background-color: orange;
    }
  }
}
```

### Custom Dots

```tsx
import React from "react";
import Carousel from "./Carousel";

import building from "./building.jpg";
import flower from "./flower.jpg";
import coffee from "./coffee.jpg";
import coffee2 from "./coffee2.jpg";

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

const CustomDotsCarousel = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <Carousel
        dotClassName="CustomDot"
        shownSlides={1}
        transitionDuration={0.5}
        customDots={(props) => <CustomDotComponent {...props} />}
      >
        <img src={building} alt="Building" />
        <img src={flower} alt="Flower" />
        <img src={coffee} alt="Coffee" />
        <img src={coffee2} alt="Coffee 2" />
      </Carousel>
    </div>
  );
};

export default CustomDotsCarousel;
```

```scss
.CustomDots {
  position: absolute;
  padding: 16px;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(16px);
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
  align-items: center;

  &__dot {
    width: 100px;
    height: 50px;
    overflow: hidden;
    border-radius: 8px;
    transition: opacity 0.1s ease-in-out;
    opacity: 0.5;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &--active {
      opacity: 1;
    }
  }
}
```

### Active Item Styles

```tsx
import React from "react";
import Carousel from "./Carousel"; // Import your Carousel component
import building from "./building.jpg"; // Import your image files
import flower from "./flower.jpg";
import coffee from "./coffee.jpg";
import coffee2 from "./coffee2.jpg";

const StyledActiveCarousel = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <Carousel shownSlides={1} transitionDuration={0.5}>
        <img src={building} alt="Building" />
        <img src={flower} alt="Flower" />
        <img src={coffee} alt="Coffee" />
        <img src={coffee2} alt="Coffee 2" />
      </Carousel>
    </div>
  );
};

export default StyledActiveCarousel;
```

```scss
.Carousel__slide {
  border-radius: 16px;
  opacity: 0.8;
  transform: scale(0.9);

  transition-property: transform, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;

  &--active {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Dots & Arrows Outside

```tsx
import React from "react";
import Carousel from "./Carousel"; // Import your Carousel component
import building from "./building.jpg"; // Import your image files
import flower from "./flower.jpg";
import coffee from "./coffee.jpg";
import coffee2 from "./coffee2.jpg";

const CarouselWithSeparateDots = (props: CarouselProps) => {
  const carouselRef = useRef<CarouselRef>(null);
  const [slide, setSlide] = useState(0);
  return (
    <div style={{ width: "100%", height: 400 }} className="DotsArrowsOutside">
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
    </div>
  );
};

export default CarouselWithSeparateDots;
```

```scss
.DotsArrowsOutside {
  display: flex;
  flex-direction: column;
  font-family: system-ui, sans-serif;
  overflow: hidden;
  border-radius: 24px;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    padding: 16px 20px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(50px);
    color: white;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
    margin-top: -16px;
  }

  &__button {
    border: none;
    background-color: transparent;
    font-size: 10px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    color: white;
  }
}
```
