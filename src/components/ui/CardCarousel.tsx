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

/**
 * scrollLeft that puts `child` at the track's snap start, honouring the
 * track's scroll-padding (scroll-px-4 on mobile).
 */
function slideScrollLeft(track: HTMLElement, child: HTMLElement): number {
  const padding = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0
  return (
    child.getBoundingClientRect().left -
    track.getBoundingClientRect().left +
    track.scrollLeft -
    padding
  )
}

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
  // Last slide the track can actually scroll to the start of. When several
  // cards are visible, the final few can never reach the start position, so
  // the arrows, dots and keys only step through 0…lastStop.
  const [lastStop, setLastStop] = useState(slides.length - 1)
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

    const targets = (Array.from(track.children) as HTMLElement[]).map((child) =>
      slideScrollLeft(track, child),
    )
    const firstAtEnd = targets.findIndex((target) => target >= maxScroll - 2)
    const stop = firstAtEnd === -1 ? targets.length - 1 : firstAtEnd
    setLastStop(stop)

    // Scrolled to the far end: that is the last reachable position.
    if (left >= maxScroll - 2 && maxScroll > 2) {
      setActiveIndex(stop)
      return
    }

    let closest = 0
    let best = Number.POSITIVE_INFINITY
    targets.slice(0, stop + 1).forEach((target, index) => {
      const distance = Math.abs(target - left)
      if (distance < best) {
        best = distance
        closest = index
      }
    })
    setActiveIndex(closest)
  }, [])

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
    // slides.length: re-measure when cards are added or removed.
  }, [measure, slides.length])

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = Math.max(0, Math.min(lastStop, index))
      const child = track.children[clamped] as HTMLElement | undefined
      if (!child) return

      const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      track.scrollTo({
        left: slideScrollLeft(track, child),
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    },
    [lastStop],
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
        scrollToIndex(lastStop)
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
            {/* One dot per reachable position, named after its first card. */}
            {slides.slice(0, lastStop + 1).map((slide, index) => {
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
