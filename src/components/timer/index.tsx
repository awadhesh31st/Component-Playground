import React, { useState, useEffect } from 'react'

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, seconds])

  const startTimer = () => setIsRunning(true)
  const stopTimer = () => setIsRunning(false)
  const resetTimer = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  return (
    <div className="flex gap-4 text-white justify-center items-center">
      <h1 data-testid="timer" className="text-black">
        {seconds} seconds
      </h1>
      {!isRunning ? (
        <button className="px-4 py-1 bg-blue-600" onClick={startTimer} disabled={isRunning}>
          Start
        </button>
      ) : (
        <button className="px-4 py-1 bg-pink-600" onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
      )}
      <button className="px-4 py-1 bg-purple-600" onClick={resetTimer}>
        Reset
      </button>
    </div>
  )
}

export default Timer
