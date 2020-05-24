import * as React from 'react';

export const useDrag = (onChange: ((from: string, to: string) => void)) => {
  const [picked, setPicked] = React.useState<string | undefined>()
  const [hovered, setHovered] = React.useState<string | undefined>()
  const dragStart= (e: React.DragEvent<HTMLImageElement>) => {
    // @ts-ignore
    setPicked(e.target.dataset.id);
  }
  
  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('hovered', e.target)
    // @ts-ignore
    setHovered(e.target.dataset.id)
  }
  
  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    picked && hovered && onChange(picked, hovered)
    setPicked(undefined)
    setHovered(undefined)
  }

  return {
    dragStart,
    dragEnter,
    dragEnd,
    picked,
    hovered,
  }
}