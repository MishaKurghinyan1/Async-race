export const startUiCarAnimation = (carElement: HTMLElement, durationMs: number) => {
  const animation = carElement.animate(
    [{ transform: 'translateX(0px)' }, { transform: `translateX(calc(100% + 10px))` }],
    {
      duration: durationMs,
      fill: 'forwards',
      easing: 'linear',
    },
  );

  return animation;
};
