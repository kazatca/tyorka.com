import * as React from 'react'
import * as b_ from 'b_'
import { useCovers } from '../../../hooks/covers'
import { useDrag } from './hooks'
import {products, Product } from '../consts';


import './index.scss'

const b = b_.with('gallery-admin');


const GalleryAdmin: React.FC = () => {
  const covers = useCovers()
  const [order, setOrder] = React.useState(products)
  const [undo, changeUndo] = React.useState<Product[][]>([
    products,
  ]);

  const reorder = (order: Product[]) => {
    setOrder(order);
    save(order.map(product => product.id));
  } 

  const onChange = (from: string, to: string) => {
    const fromIndex = order.findIndex(({ id }) => from === id)
    const toIndex = order.findIndex(({ id }) => to === id)

    const result = [...order]
    const [item] = result.splice(fromIndex, 1)
    result.splice(toIndex, 0, item)
    changeUndo([...undo, order])
    reorder(result)
  }

  const { dragStart, dragEnter, dragEnd, picked, hovered } = useDrag(onChange)

  const handleKb = (e: KeyboardEvent) => {
    if (e.key === 'z' && e.ctrlKey) {
      const result = undo.pop()
      if (result) {
        reorder(result);
        changeUndo(undo);
      }
    }
  }

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.addEventListener('keyup', handleKb)
    return () => {
      window.removeEventListener('keyup', handleKb)
    }
  })

  return (
    <section className={b()}>
      {order.map(product => (
        <>
          <div
            className={b('drop-zone', {
              active: !!picked,
              hovered: product.id === hovered && hovered !== picked,
            })}
            key={`${product.id}-drop-zone`}
            data-id={product.id}
            onDragEnter={dragEnter}
          />
          <img
            key={product.id}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            data-id={product.id}
            src={covers[product.path].src}
            className={b('item', { picked: picked === product.id })}
          />
        </>
      ))}
    </section>
  )
}

export default GalleryAdmin


const save = (order: string[]) => {
  fetch(`http://localhost:3000/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order),
    credentials: 'include'
  })
}
