'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CardCarouselLabels {
  /** Accessible name for the whole carousel region */
  region: string
  previous: string
  next: string
  /** Prefix for pagination dots, e.g. "Go to slide" → "Go to slide 2" */
  goToSlide: string
}

interface CardCarouselProps {
  /** One rendered card per slide */
  slides: Array<{ key: string; label: string; content: ReactNode }>
  labels: CardCarouselLabels
  /** Tailwind width classes applied to each slide; controls how many cards are visible */
  slideClassName?: string
  className?: string
}

/**
 * Accessible horizontal card carousel.
 *
 * - Native horizontal scrolling with CSS scroll-snap, so touch swipe and
 *   trackpad gestures work without a gesture library.
 * - Previous / next arrows and pagination dots stay in sync with the
 *   scroll position and are hidden automatically when every card fits.
 * - Left / Right / Home / End keys work while focus is inside the carousel.
 * - Honours prefers-reduced-motion for programmatic scrolling.
 */
export default function CardCarousel({
  slides,
  labels,
  slideClassName = 'w-[82%] sm:w-[56%] lg:w-[40%]',
  className = '',
}: CardCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(true)

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const maxScroll = track.scrollWidth - track.clientWidth
    const left = track.scrollLeft
    setHasOverflow(maxScroll > 2)
    setCanPrev(left > 2)
    setCanNext(left < maxScroll - 2)

    // At the far end the last card may never reach the snap start position,
    // so treat "scrolled to the end" as the last slide.
    if (left >= maxScroll - 2 && maxScroll > 2) {
      setActiveIndex(slides.length - 1)
      return
    }

    const children = Array.from(track.children) as HTMLElement[]
    let closest = 0
    let best = Number.POSITIVE_INFINITY
    children.forEach((child, index) => {
      const distance = Math.abs(child.offsetLeft - track.offsetLeft - left)
      if (distance < best) {
        best = distance
        closest = index
      }
    })
    setActiveIndex(closest)
  }, [slides.length])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    track.addEventListener('scroll', onScroll, { passive: true })
    const observer = new ResizeObserver(measure)
    observer.observe(track)

    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [measure])

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = Math.max(0, Math.min(slides.length - 1, index))
      const child = track.children[clamped] as HTMLElement | undefined
      if (!child) return

      const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      track.scrollTo({
        left: child.offsetLeft - track.offsetLeft,
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    },
    [slides.length],
  )

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        scrollToIndex(activeIndex - 1)
        break
      case 'ArrowRight':
        event.preventDefault()
        scrollToIndex(activeIndex + 1)
        break
      case 'Home':
        event.preventDefault()
        scrollToIndex(0)
        break
      case 'End':
        event.preventDefault()
        scrollToIndex(slides.length - 1)
        break
    }
  }

  const arrowClass =
    'flex h-11 w-11 items-center justify-center rounded-lg border border-cosmic-border bg-cosmic-card text-cream transition-colors duration-200 hover:border-gold-light hover:text-gold disabled:pointer-events-none disabled:opacity-35'

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onKeyDown={onKeyDown}
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-6 pt-2 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slide.label} (${index + 1} / ${slides.length})`}
            className={`shrink-0 snap-start ${slideClassName}`}
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/* Controls */}
      {hasOverflow && (
        <div className="mt-2 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={!canPrev}
            aria-label={labels.previous}
            className={arrowClass}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2.5">
            {slides.map((slide, index) => {
              const active = index === activeIndex
              return (
                <button
                  key={slide.key}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  aria-label={`${labels.goToSlide} ${index + 1}: ${slide.label}`}
                  aria-current={active ? 'true' : undefined}
                  className="group flex h-6 items-center justify-center px-0.5"
                >
                  <span
                    className={`block h-2.5 rounded-full transition-all duration-300 ${
                      active
                        ? 'w-8 bg-gold-light'
                        : 'w-2.5 bg-cream/25 group-hover:bg-cream/50'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={!canNext}
            aria-label={labels.next}
            className={arrowClass}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
