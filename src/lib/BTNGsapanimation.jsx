import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useHeaderExportButtonAnimation = (headerRef, exportButtonRef) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef?.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (exportButtonRef?.current) {
        gsap.fromTo(
          exportButtonRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.2,
          }
        );

        gsap.to(exportButtonRef.current, {
          scale: 1.04,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 1,
        });
      }
    });

    return () => ctx.revert();
  }, [headerRef, exportButtonRef]);
};

export const useUserStatsCardsAnimation = (cardsContainerRef) => {
  useEffect(() => {
    if (!cardsContainerRef?.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = cardsContainerRef.current.children;
      if (!cards || !cards.length) {
        return;
      }

      gsap.from(cards, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.1,
      });
    }, cardsContainerRef);

    return () => ctx.revert();
  }, [cardsContainerRef]);
};

export const useUserFiltersAnimation = (filtersContainerRef) => {
  useEffect(() => {
    if (!filtersContainerRef?.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const elements = filtersContainerRef.current.children;
      if (!elements || !elements.length) {
        return;
      }

      gsap.from(elements, {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.15,
      });
    }, filtersContainerRef);

    return () => ctx.revert();
  }, [filtersContainerRef]);
};

export const useCommissionAnalyticsAnimation = (containerRef) => {
  useEffect(() => {
    if (!containerRef?.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const counters = containerRef.current.querySelectorAll("[data-counter]");
      counters.forEach((counter) => {
        const targetValue = Number(counter.getAttribute("data-target") || "0");
        if (Number.isNaN(targetValue)) {
          return;
        }
        const state = { value: 0 };
        timeline.to(
          state,
          {
            value: targetValue,
            duration: 1.2,
            ease: "power3.out",
            onUpdate: () => {
              counter.textContent = Math.round(state.value).toLocaleString("en-IN");
            },
          },
          0,
        );
      });

      const lines = containerRef.current.querySelectorAll("[data-line-series]");
      lines.forEach((line, index) => {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        timeline.to(
          line,
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: "power3.out",
          },
          0.2 + index * 0.1,
        );
      });

      const bars = containerRef.current.querySelectorAll("[data-bar]");
      if (bars.length) {
        timeline.from(
          bars,
          {
            scaleY: 0,
            transformOrigin: "center bottom",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.06,
          },
          0.4,
        );
      }

      const donutSegments = containerRef.current.querySelectorAll(
        "[data-donut-segment]",
      );
      donutSegments.forEach((segment, index) => {
        const length = segment.getTotalLength();
        gsap.set(segment, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        timeline.to(
          segment,
          {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power3.out",
          },
          0.3 + index * 0.1,
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};

export const useDashboardHeaderAnimation = (
  headerRef,
  refreshButtonRef,
  refreshToken,
) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef?.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
        );
      }

      if (refreshButtonRef?.current) {
        gsap.fromTo(
          refreshButtonRef.current,
          { opacity: 0, y: -10, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 0.1,
          },
        );
      }
    });

    return () => ctx.revert();
  }, [headerRef, refreshButtonRef, refreshToken]);
};

export const useDashboardStatsAnimation = (cardsContainerRef, refreshToken) => {
  useEffect(() => {
    if (!cardsContainerRef?.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = cardsContainerRef.current.children;
      if (!cards || !cards.length) {
        return;
      }

      gsap.from(cards, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.05,
      });
    }, cardsContainerRef);

    return () => ctx.revert();
  }, [cardsContainerRef, refreshToken]);
};

export const useDashboardChartCardAnimation = (cardRef, refreshToken) => {
  useEffect(() => {
    if (!cardRef?.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, [cardRef, refreshToken]);
};

export const useDashboardMeetingsAnimation = (cardRef, refreshToken) => {
  useEffect(() => {
    if (!cardRef?.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, [cardRef, refreshToken]);
};

export const useDashboardStaggeredListAnimation = (listRef, refreshToken) => {
  useEffect(() => {
    if (!listRef?.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = listRef.current.querySelectorAll("[data-index]");
      if (!items.length) {
        return;
      }

      gsap.from(items, {
        opacity: 0,
        x: -16,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
      });
    }, listRef);

    return () => ctx.revert();
  }, [listRef, refreshToken]);
};

export const useDashboardQuickActionsAnimation = (cardRef, refreshToken) => {
  useEffect(() => {
    if (!cardRef?.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.6,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, [cardRef, refreshToken]);
};

export const useLayoutBackgroundAnimation = (containerRef) => {
  useEffect(() => {
    if (!containerRef?.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.to(containerRef.current, {
        backgroundPosition: "100% 0%",
        duration: 24,
        ease: "linear",
        repeat: -1,
        yoyo: true,
      });

      const badges = containerRef.current.querySelectorAll("[data-floating-badge]");
      if (badges.length) {
        badges.forEach((badge, index) => {
          gsap.fromTo(
            badge,
            { opacity: 0.12, y: -8, x: 0 },
            {
              opacity: 0.3,
              y: 8,
              x: index % 2 === 0 ? 10 : -10,
              duration: 8 + index * 1.5,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: 0.4 * index,
            },
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
};

export default useHeaderExportButtonAnimation;
