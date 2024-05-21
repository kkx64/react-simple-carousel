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

## Examples

For examples see the [CodeSandbox](https://codesandbox.io/p/sandbox/kkx64-react-simple-carousel-examples-z6ccm7).

## Components

The library exports three components: `Carousel`, `CarouselDots` and `CarouselArrows`. They can all be used in combination or by themselves, depending on your needs. The `Carousel` component contains the other two components by default, unless they are overridden.

## Carousel

### CarouselProps

- **shownSlides**: `number`  
  The number of slides to be displayed simultaneously. You can also put decimal numbers to have the next slides be slightly visible.

- **transitionDuration**: `number`  
  The duration (in seconds) of the slide transition animation.

- **containerClassName**: `string`  
  **Additional** CSS class names for the carousel container.

- **trackClassName**: `string`  
  **Additional** CSS class names for the carousel track.

- **slideClassName**: `string`  
   **Additional** CSS class names for individual slides.  
   You also have access to two extra classes:

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
  -- slide (has data-index="" property, if needed)
  -- slide
  - track
  container
  ```

- **disableTranslate**: `boolean`  
  Boolean indicating whether to disable CSS translation for slide animations.

- **dotsGradient**: `boolean`  
  Whether to fade out dots at the edges. Default is on - overrides to off when `dotsFixed = true`.

- **dotsFixed**: `boolean`  
  Set to `true` to disable dot scrolling and switch to fixed dot layout. Also disables dot fade gradient.

- **centered**: `boolean`
  If set to true, will place the active slide in the center of the carousel. Does nothing when `noActiveSlide` is true.
  **Default: `false`**

- **noActiveSlide**: `boolean`
  If set to true acts like a normal carousel without "active" slides - has enough pages to just view all slides.
  **Default: `false`**

- **autoPlay**: `boolean`  
  Whether to automatically move between slides.  
  **Default: `false`**

- **autoPlayInterval**: `number`  
  Time between automatically moving between slides (s).  
  **Default: `3`**

- **fitHeight**: `boolean`  
  Have the Carousel fit around the contents instead of fill the parent.  
  **Default: `false`**

- **dotRender**: `({dot: number, isActive: boolean, ref: (element: HTMLElement) => void, onDotClick?: (index: number) => void }) => ReactNode`
  Custom dot rendering function, to render special dots without completely removing the scrolling dots feature.

- **customDots**: `((props: { dots: number; activeDot: number; onDotClick?: (index: number) => void; }) => JSX.Element) | null`  
  A function that renders custom navigation dots, in place of the CarouselDots component.  
  You can still use the existing `CarouselDots` component here, if you want to just override simple styles in the default layout.  
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

- **setSlide**: `(index: number) => void`  
  A function to set the current slide.

## CarouselDots

### CarouselDotsProps

- **onDotClick**: `(dot: number) => void`  
  A callback function invoked when a dot is clicked. Receives the index of the clicked dot as an argument.

- **dotRender**: `({dot: number, isActive: boolean, ref: (element: HTMLElement) => void }) => ReactNode`  
  Custom dot rendering function, to render special dots without completely removing the scrolling dots feature.

- **dots**: `number`  
  The total number of dots to be rendered.

- **activeDot**: `number`  
  The index of the active dot.

- **transitionDuration**: `number`
  Transition duration for the sliding dots (in seconds). Passed down from `Carousel` if using default dots.

- **containerClassName**: `string`  
  **Additional** CSS class names for the container of the dots.

- **wrapperClassName**: `string`  
  **Additional** CSS class names for the wrapper of the dots.

- **trackClassName**: `string`  
  **Additional** CSS class names for the track of the dots.

- **dotClassName**: `string`  
  **Additional** CSS class names for individual dots.
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
  **Additional** CSS class names for the container of the arrows.

- **arrowClassName**: `string`  
   **Additional** CSS class names for individual arrows.  
   You have access to two additional classes:

  ```css
  .yourClass--prev{
   // left arrow
  }
  .yourClass--next{
    // right arrow
  }
  ```

- **wrapperClassName**: `string`  
   **Additional** CSS class names for the wrapper of the arrows.

  Structure:

  ```text
  wrapper
  - container
    -- arrow
    -- arrow
  - container
  wrapper
  ```
