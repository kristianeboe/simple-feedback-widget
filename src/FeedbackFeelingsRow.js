import React from 'react'
import { ReactComponent as Sad } from './assets/sad.svg'
import { ReactComponent as MostlySad } from './assets/mostly_sad.svg'
import { ReactComponent as Neutral } from './assets/neutral.svg'
import { ReactComponent as MostlyHappy } from './assets/mostly_happy.svg'
import { ReactComponent as Happy } from './assets/happy.svg'
const filterOut = ['mostly_sad', 'mostly_happy']
const feelings = [
  { key: 'sad', component: Sad },
  { key: 'mostly_sad', component: MostlySad },
  { key: 'neutral', component: Neutral },
  { key: 'mostly_happy', component: MostlyHappy },
  { key: 'happy', component: Happy },
].filter(feeling => !filterOut.find(f => f === feeling.key))

// const HappyComp = () => <Happy />

const SVGFace = ({ key, component: Face }, onClick, feedbackFeeling) => (
  <Face
    key={key}
    onClick={onClick}
    style={{
      height: '5rem',
      fill: feedbackFeeling === key ? '#d00' : '#000',
      cursor: 'pointer',
    }}
  />
)

export const FeedbackFeelingsRow = ({ feedbackFeeling, setFeeling }) => {
  return (
    <div>
      {feelings.map(feeling =>
        SVGFace(
          feeling,
          () =>
            setFeeling(feedbackFeeling === feeling.key ? null : feeling.key),
          feedbackFeeling
        )
      )}

      {/* <Sad />
      <Neutral />
      <Happy /> */}

      <style jsx>
        {`
          div {
            display: flex;
            justify-content: space-around;
            transition: all 1s;
            margin-top: 3em;
            ${feedbackFeeling && 'transform: scale(0.7);'}
            ${feedbackFeeling && 'margin-top: 1em;'}
          }
        `}
      </style>
    </div>
  )
}
