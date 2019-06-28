import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { FeedbackFeelingsRow } from './FeedbackFeelingsRow'
const __WEB__ = typeof window !== 'undefined'

const initialState = {
  expanded: true,
  flipped: false,
  feeling: null,
  submitted: false,
}

export const FeedbackWidget = ({ trackFeedback }) => {
  const [expanded, setExpanded] = useState(false)
  const [flipped, setflipped] = useState(false)
  const [feedbackFeeling, setFeeling] = useState(null)
  const [state, setState] = useState(initialState)
  const [feedbackText, setFeedbackText] = useState('')

  return (
    <div
      className={classNames('wrapper', { 'slide-out-right': state.submitted })}
    >
      {expanded && (
        <section
          className={classNames('flip-card', {
            'fade-in-bottom': expanded && !feedbackFeeling,
            'fade-out-bottom': !expanded,
          })}
        >
          <div className="flip-card-inner">
            <div className="front">
              <div className="front-content">
                <h2>Hva synes du om den nye VG+ siden?</h2>
                <FeedbackFeelingsRow
                  feedbackFeeling={feedbackFeeling}
                  setFeeling={setFeeling}
                />

                <textarea
                  className="swing-in-top-fwd"
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                />

                <button
                  onClick={() => {
                    if (!feedbackFeeling) {
                      return
                    }
                    setflipped(true)
                    trackFeedback({ feedbackFeeling, feedbackText })
                    setTimeout(
                      () => setState({ ...state, submitted: true }),
                      1000
                    )
                  }}
                >
                  SEND SVAR
                </button>
              </div>
            </div>
            <div
              className="back"
              onClick={() => {
                setExpanded(false)
              }}
            >
              <h2>TAKK</h2>
            </div>
          </div>
        </section>
      )}
      <div
        className="trigger"
        onClick={() => {
          console.log('Trigger')
          setExpanded(!expanded)
        }}
      >
        <h4>GI FEEDBACK</h4>
      </div>
      <style jsx>
        {`
          h2 {
            order: 0;
            font-size: 1.5rem;
          }
          .wrapper {
            position: fixed;
            background-color: transparent;
            z-index: 99999998;
            bottom: 12px;
            right: 0px;
            text-align: left;
            font-weight: 500;
            margin: 1em;
          }

          .trigger {
            display: flex;
            position: absolute;
            right: 0px;
            bottom: 0px;
            -webkit-box-align: center;
            align-items: center;
            font-weight: 400;
            color: #fff;
            white-space: nowrap;
            cursor: pointer;
            font-size: 14px;
            box-shadow: rgba(34, 44, 79, 0.1) 0px 3px 12px 1px;
            background: #d00;
            padding: 12px 1.25em;
            transition: box-shadow 0.3s ease 0s, transform 0.2s ease-in 0s,
              color 0.2s ease 0s;
          }
          .trigger h4 {
            font-family: 'Druk Web';
          }

          .flip-card {
            background-color: transparent;
            width: 20rem;
            height: 20rem;
            perspective: 1000px;

            display: block;
            animation: 0.4s ease 0s 1 normal both running fgdAWv;
            position: relative;
            z-index: 999999999;
            bottom: 65px;
            right: 0px;
            border-radius: 4px;
            animation: 0.4s ease 0s 1 normal both running cryAyx;
          }

          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s;
            transform-style: preserve-3d;
            ${!flipped ? 'box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);' : ''}

            ${flipped ? 'transform: rotateY(180deg);' : ''}
          }

          .flip-card:focus {
            outline: 0;
          }

          .front,
          .back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
          }

          textarea {
            height: 5rem;
            font-size: 20px;
            resize: none;
          }
          .front {
            background: white;
            color: black;
            z-index: 2;
          }

          .back {
            background: #d00;
            transform: rotateY(180deg);
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .back h2 {
            color: white;
            font-family: 'Druk Web';
          }

          .front-content {
            margin: 5%;
            height: 90%;
            display: flex;
            flex-direction: column;
          }

          .swing-in-top-fwd {
            ${!feedbackFeeling ? 'visibility: hidden;' : ''}
            -webkit-animation: swing-in-top-fwd 0.5s
              cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
            animation: swing-in-top-fwd 0.5s
              cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
            animation-delay: 1s;
          }

          @-webkit-keyframes swing-in-top-fwd {
            0% {
              -webkit-transform: rotateX(-100deg);
              transform: rotateX(-100deg);
              -webkit-transform-origin: top;
              transform-origin: top;
              opacity: 0;
            }
            100% {
              -webkit-transform: rotateX(0deg);
              transform: rotateX(0deg);
              -webkit-transform-origin: top;
              transform-origin: top;
              opacity: 1;
            }
          }
          @keyframes swing-in-top-fwd {
            0% {
              -webkit-transform: rotateX(-100deg);
              transform: rotateX(-100deg);
              -webkit-transform-origin: top;
              transform-origin: top;
              opacity: 0;
            }
            100% {
              -webkit-transform: rotateX(0deg);
              transform: rotateX(0deg);
              -webkit-transform-origin: top;
              transform-origin: top;
              opacity: 1;
            }
          }

          /**
 * ----------------------------------------
 * animation slide-out-right
 * ----------------------------------------
 */
          @-webkit-keyframes slide-out-right {
            0% {
              -webkit-transform: translateX(0);
              transform: translateX(0);
              opacity: 1;
            }
            100% {
              -webkit-transform: translateX(1000px);
              transform: translateX(1000px);
              opacity: 0;
            }
          }
          @keyframes slide-out-right {
            0% {
              -webkit-transform: translateX(0);
              transform: translateX(0);
              opacity: 1;
            }
            100% {
              -webkit-transform: translateX(1000px);
              transform: translateX(1000px);
              opacity: 0;
            }
          }

          .slide-out-right {
            -webkit-animation: slide-out-right 0.5s
              cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
            animation: slide-out-right 0.5s
              cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
          }

          .fade-in-bottom {
            -webkit-animation: fade-in-bottom 0.6s
              cubic-bezier(0.39, 0.575, 0.565, 1) both;
            animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
              both;
          }

          @-webkit-keyframes fade-in-bottom {
            0% {
              -webkit-transform: translateY(50px);
              transform: translateY(50px);
              opacity: 0;
            }
            100% {
              -webkit-transform: translateY(0);
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fade-in-bottom {
            0% {
              -webkit-transform: translateY(50px);
              transform: translateY(50px);
              opacity: 0;
            }
            100% {
              -webkit-transform: translateY(0);
              transform: translateY(0);
              opacity: 1;
            }
          }

          .fade-out-bottom {
            -webkit-animation: fade-out-bottom 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
            animation: fade-out-bottom 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              both;
          }

          @-webkit-keyframes fade-out-bottom {
            0% {
              -webkit-transform: translateY(0);
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              -webkit-transform: translateY(50px);
              transform: translateY(50px);
              opacity: 0;
            }
          }
          @keyframes fade-out-bottom {
            0% {
              -webkit-transform: translateY(0);
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              -webkit-transform: translateY(50px);
              transform: translateY(50px);
              opacity: 0;
            }
          }

          button {
            color: #fff;
            cursor: pointer;
            font-size: 18px;
            background: #000;
            padding: 12px 1.25em;
            border-color: black;
            font-family: 'Austin News Headline';
            width: 50%;
            margin: auto auto 0 auto;
          }
        `}
      </style>
    </div>
  )
}
