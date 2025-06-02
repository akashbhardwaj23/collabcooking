"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Bell } from "lucide-react"

interface TimerProps {
  minutes: number
  onComplete?: () => void
  className?: string
}

export function Timer({ minutes, onComplete, className }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60)
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1
          setProgress(((minutes * 60 - newTime) / (minutes * 60)) * 100)

          if (newTime === 0) {
            setIsActive(false)
            onComplete?.()

            // Audible alert - play notification sound
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Timer Complete! 🍳", {
                body: `Your ${minutes} minute timer has finished.`,
                icon: "/favicon.ico",
              })
            }

            // Visual alert - could add more visual feedback here
            document.title = "⏰ Timer Complete! - CuisineQuest"

            // Reset title after 5 seconds
            setTimeout(() => {
              document.title = "CuisineQuest"
            }, 5000)
          }

          return newTime
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, minutes, onComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const start = () => setIsActive(true)
  const pause = () => setIsActive(false)
  const reset = () => {
    setTimeLeft(minutes * 60)
    setProgress(0)
    setIsActive(false)
  }

  // Request notification permission on first render
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  return (
    <div className={`p-4 bg-white rounded-lg border ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Bell className="h-4 w-4 text-orange-500" />
          <span className="font-medium text-lg">{formatTime(timeLeft)}</span>
        </div>
        <div className="flex space-x-2">
          {!isActive ? (
            <Button
              size="sm"
              onClick={timeLeft === minutes * 60 ? start : start}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Play className="h-3 w-3" />
            </Button>
          ) : (
            <Button size="sm" onClick={pause} variant="outline">
              <Pause className="h-3 w-3" />
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={reset}>
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <Progress value={progress} className="h-2" />
      {timeLeft === 0 && <div className="mt-2 text-center text-green-600 font-medium">Timer Complete! 🎉</div>}
    </div>
  )
}
