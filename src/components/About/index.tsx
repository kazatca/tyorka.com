import * as React from 'react'
import * as b_ from 'b_'

import './index.scss'

const b = b_.with('about')

const actualLng = process.env.GATSBY_LNG || 'ru'

export const About = () => (
  <section className={b()}>
    <div className={b('me')} />
    {actualLng === 'ru' && (
      <div className={b('text')}>
        <p>
          Привет! Меня зовут Валентина. Но все называют меня Тёрка, это мой
          творческий псевдоним.
        </p>
        <p>
          Вообще я из России, из маленького городка на востоке, который
          называется Комсомольск-на-Амуре. Но сейчас я живу в Грузии, потихоньку
          обустраиваю тут керамическую мастерскую.
        </p>
        <p>
          Помимо этого я работаю с шерстью. И вообще моя мечта - соединить два
          этих разных материала в своих работах. Надеюсь, у меня получится.
        </p>
      </div>
    )}
    {actualLng === 'en' && (
      <div className={b('text')}>
        <p>
          Hi! I am Valentina but everyone calls me Tyorka and that is my
          creative alias.
        </p>
        <p>
          Originally I'm from Russia, from a small town on the far east, called
          Komsomolsk-na-Amure. But.. Now I live in Georgia and am settling up a
          small ceramic shop here step by step.
        </p>
        <p>
          Apart from that I work with wool and have a dream of conjoining these
          materials together in my art. Hope that it works out.
        </p>
      </div>
    )}
  </section>
)
