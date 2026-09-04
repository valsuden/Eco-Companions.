import { useState, useEffect } from 'react';

export type BreakpointType = 'xs' | 'sm' | 'md' | 'tablet' | 'lg' | 'xl';
export type DeviceLayoutType = 'mobile-compact' | 'mobile' | 'tablet-portrait' | 'tablet-landscape' | 'desktop';

export interface LayoutBreakpointState {
  width: number;
  height: number;
  breakpoint: BreakpointType;
  deviceLayout: DeviceLayoutType;
  isCompactMobile: boolean; // < 380px
  isMobile: boolean;        // < 640px
  isTablet: boolean;        // 640px - 1023px
  isTabletPortrait: boolean; // 768px - 1023px (portrait)
  isTabletLandscape: boolean; // 768px - 1023px (landscape)
  isDesktop: boolean;       // >= 1024px
  orientation: 'portrait' | 'landscape';
  isTouchDevice: boolean;
  aspectRatio: number;
}

function computeBreakpointState(width: number, height: number): LayoutBreakpointState {
  const isTouchDevice = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const orientation = width >= height ? 'landscape' : 'portrait';
  const aspectRatio = width / (height || 1);

  let breakpoint: BreakpointType = 'sm';
  if (width < 380) breakpoint = 'xs';
  else if (width < 640) breakpoint = 'sm';
  else if (width < 768) breakpoint = 'md';
  else if (width < 1024) breakpoint = 'tablet';
  else if (width < 1280) breakpoint = 'lg';
  else breakpoint = 'xl';

  let deviceLayout: DeviceLayoutType = 'mobile';
  if (width < 380) {
    deviceLayout = 'mobile-compact';
  } else if (width < 640) {
    deviceLayout = 'mobile';
  } else if (width < 1024) {
    deviceLayout = orientation === 'portrait' ? 'tablet-portrait' : 'tablet-landscape';
  } else {
    deviceLayout = 'desktop';
  }

  return {
    width,
    height,
    breakpoint,
    deviceLayout,
    isCompactMobile: width < 380,
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isTabletPortrait: width >= 640 && width < 1024 && orientation === 'portrait',
    isTabletLandscape: width >= 640 && width < 1024 && orientation === 'landscape',
    isDesktop: width >= 1024,
    orientation,
    isTouchDevice,
    aspectRatio,
  };
}

export function useLayoutBreakpoint(): LayoutBreakpointState {
  const [state, setState] = useState<LayoutBreakpointState>(() => {
    if (typeof window === 'undefined') {
      return computeBreakpointState(1024, 768);
    }
    return computeBreakpointState(window.innerWidth, window.innerHeight);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: number | null = null;

    const handleResize = () => {
      // Debounce slightly for fluid 60fps rendering without thrashing
      if (timeoutId) cancelAnimationFrame(timeoutId);
      timeoutId = requestAnimationFrame(() => {
        setState(computeBreakpointState(window.innerWidth, window.innerHeight));
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (timeoutId) cancelAnimationFrame(timeoutId);
    };
  }, []);

  return state;
}
