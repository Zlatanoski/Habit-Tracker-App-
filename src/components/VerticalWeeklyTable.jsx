"use client"

import { useState, useEffect } from "react"
import {
    CheckCircleIcon,
    XMarkIcon,
    PlusIcon,
    ClockIcon,
    SunIcon,
    CloudIcon,
    MoonIcon,
    SparklesIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid"
import ChooseHabitDialog from "./ChooseHabitDialog"
import { supabase } from "../supabaseClient"

const periodColors = {
    morning: {
        bg: "from-amber-500/10 to-amber-600/5",
        border: "border-amber-500/30",
        text: "text-amber-400",
        icon: SunIcon,
    },
    noon: {
        bg: "from-orange-500/10 to-orange-600/5",
        border: "border-orange-500/30",
        text: "text-orange-400",
        icon: CloudIcon,
    },
    evening: {
        bg: "from-purple-500/10 to-purple-600/5",
        border: "border-purple-500/30",
        text: "text-purple-400",
        icon: MoonIcon,
    },
}

function makeEmptyBoard() {
    return {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    }
}

export default function VerticalWeeklyTable({ user }) {
    const [habitsByDay, setHabitsByDay] = useState(makeEmptyBoard)
    const [openedDialog, setOpenedDialog] = useState(false)
    const [userName, setUserName] = useState("")
    const [completed, setCompleted] = useState({})
    const [skipped, setSkipped] = useState({})
    const [selectedDay, setSelectedDay] = useState(null)
    const [currentWeekStart, setCurrentWeekStart] = useState(0) // For mobile navigation

    useEffect(() => {
        const fetchUserNames = async () => {
            try {
                const { data, error } = await supabase.auth.getUser()
                if (error) {
                    console.error("Failed to fetch user data.")
                    setUserName("David") // Fallback for demo
                    return
                }
                const user = data.user
                const name = user?.user_metadata?.name
                if (name) {
                    setUserName(name)
                } else {
                    setUserName("David") // Fallback
                }
            } catch (err) {
                console.error("Error fetching user:", err)
                setUserName("David") // Fallback for demo
            }
        }
        fetchUserNames()
    }, [])

    async function fetchHabits() {
        try {
            const { data, error } = await supabase.from("habits").select("*")

            if (error) {
                console.error("Fetch failed:", error)
                return
            }

            const grouped = {
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: [],
                Sunday: [],
            }

            data.forEach((habit) => {
                if (grouped[habit.day]) grouped[habit.day].push(habit)
            })

            setHabitsByDay(grouped)
        } catch (err) {
            console.error("Error fetching habits:", err)
            // Set demo data for preview
            setHabitsByDay({
                Monday: [
                    { name: "Morning Workout", time: "07:00", period: "morning" },
                    { name: "Read Book", time: "20:00", period: "evening" },
                ],
                Tuesday: [{ name: "Meditation", time: "06:30", period: "morning" }],
                Wednesday: [
                    { name: "Water Intake", time: "09:00", period: "morning" },
                    { name: "Lunch Walk", time: "13:00", period: "noon" },
                ],
                Thursday: [{ name: "Gym Session", time: "18:00", period: "evening" }],
                Friday: [{ name: "Team Meeting", time: "10:00", period: "morning" }],
                Saturday: [
                    { name: "Yoga", time: "08:00", period: "morning" },
                    { name: "Journal Writing", time: "21:00", period: "evening" },
                ],
                Sunday: [{ name: "Family Time", time: "15:00", period: "noon" }],
            })
        }
    }

    useEffect(() => {
        if (user) {
            fetchHabits()
        } else {
            fetchHabits() // Still fetch for demo purposes
        }
    }, [user])

    const handleCompleted = (day, idx) => {
        const key = `${day}-${idx}`
        if (completed[key] || skipped[key]) return

        setCompleted((prev) => ({
            ...prev,
            [key]: true,
        }))
        console.log("Task completed")
    }

    async function handleSaveHabit(habitData) {
        const row = {
            name: habitData.task,
            time: habitData.time,
            period: habitData.period,
            day: habitData.day, // Now comes from the dialog
        }

        try {
            const { data, error } = await supabase.from("habits").insert([row], { returning: "minimal" })

            console.log("Insert response:", { data, error })
            if (error) {
                console.error("Insert failed:", error)
            } else {
                await fetchHabits()
                setOpenedDialog(false)
                setSelectedDay(null)
            }
        } catch (err) {
            console.error("Error saving habit:", err)
            // For demo purposes, just close the dialog
            setOpenedDialog(false)
            setSelectedDay(null)
        }
    }

    const handleSkipped = (day, idx) => {
        const key = `${day}-${idx}`
        if (completed[key] || skipped[key]) return

        setSkipped((prev) => ({
            ...prev,
            [key]: true,
        }))
    }

    const dayNames = Object.keys(habitsByDay)
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" })

    // Mobile navigation functions
    const nextDays = () => {
        setCurrentWeekStart((prev) => Math.min(prev + 3, dayNames.length - 3))
    }

    const prevDays = () => {
        setCurrentWeekStart((prev) => Math.max(prev - 3, 0))
    }

    return (
        <div className="space-y-6">
            {/* Header with Add Habit Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
                        Hello, {userName}!
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base">Here are your habits for the week</p>
                </div>

                {/* Prominent Add Habit Button */}
                <button
                    onClick={() => {
                        setSelectedDay(null) // Don't pre-select a day
                        setOpenedDialog(true)
                    }}
                    className="group relative px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="relative">
                            <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                            <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 absolute -top-1 -right-1 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="text-sm sm:text-lg">Add New Habit</span>
                    </div>

                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
            </div>

            {/* Mobile Navigation (visible on small screens) */}
            <div className="flex items-center justify-between sm:hidden mb-4">
                <button
                    onClick={prevDays}
                    disabled={currentWeekStart === 0}
                    className="p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeftIcon className="w-5 h-5 text-slate-300" />
                </button>
                <span className="text-slate-400 text-sm">
          {dayNames.slice(currentWeekStart, currentWeekStart + 3).join(" • ")}
        </span>
                <button
                    onClick={nextDays}
                    disabled={currentWeekStart >= dayNames.length - 3}
                    className="p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRightIcon className="w-5 h-5 text-slate-300" />
                </button>
            </div>

            {/* Weekly Grid - Responsive */}
            <div className="w-full">
                {/* Large Desktop View - All 7 days in columns (1920px+) */}
                <div className="hidden 2xl:grid 2xl:grid-cols-7 gap-4">
                    {dayNames.map((day) => {
                        const isToday = day === today
                        const dayHabits = habitsByDay[day] || []

                        return (
                            <div key={day} className="flex flex-col min-h-[400px]">
                                {/* Day Header */}
                                <div
                                    className={`text-center p-3 rounded-xl mb-4 ${
                                        isToday
                                            ? "bg-blue-600/20 border border-blue-500/30 text-blue-400"
                                            : "bg-slate-700/30 border border-slate-600/30 text-slate-300"
                                    }`}
                                >
                                    <div className="font-semibold text-sm">{day}</div>
                                    {isToday && <div className="text-xs text-blue-400 mt-1">Today</div>}
                                </div>

                                {/* Habits Container */}
                                <div className="flex-1 space-y-3">
                                    {dayHabits.map((habit, idx) => (
                                        <HabitCard
                                            key={idx}
                                            habit={habit}
                                            day={day}
                                            idx={idx}
                                            isToday={isToday}
                                            completed={completed}
                                            skipped={skipped}
                                            onComplete={handleCompleted}
                                            onSkip={handleSkipped}
                                            layout="column"
                                        />
                                    ))}

                                    {/* Empty State */}
                                    {dayHabits.length === 0 && <EmptyState />}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Vertical Layout for Medium to Large screens (768px - 1919px) */}
                <div className="hidden sm:block 2xl:hidden space-y-6">
                    {dayNames.map((day) => {
                        const isToday = day === today
                        const dayHabits = habitsByDay[day] || []

                        return (
                            <div key={day} className="w-full">
                                {/* Day Header */}
                                <div
                                    className={`flex items-center justify-between p-4 rounded-xl mb-4 ${
                                        isToday
                                            ? "bg-blue-600/20 border border-blue-500/30 text-blue-400"
                                            : "bg-slate-700/30 border border-slate-600/30 text-slate-300"
                                    }`}
                                >
                                    <div>
                                        <div className="font-semibold text-lg">{day}</div>
                                        {isToday && <div className="text-sm text-blue-400 mt-1">Today</div>}
                                    </div>
                                    <div className="text-sm text-slate-400">
                                        {dayHabits.length} habit{dayHabits.length !== 1 ? "s" : ""}
                                    </div>
                                </div>

                                {/* Habits Container - Horizontal layout */}
                                {dayHabits.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {dayHabits.map((habit, idx) => (
                                            <HabitCard
                                                key={idx}
                                                habit={habit}
                                                day={day}
                                                idx={idx}
                                                isToday={isToday}
                                                completed={completed}
                                                skipped={skipped}
                                                onComplete={handleCompleted}
                                                onSkip={handleSkipped}
                                                layout="row"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8">
                                        <EmptyState />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Mobile View - 1 column, with navigation */}
                <div className="sm:hidden space-y-6">
                    {dayNames.slice(currentWeekStart, currentWeekStart + 3).map((day) => {
                        const isToday = day === today
                        const dayHabits = habitsByDay[day] || []

                        return (
                            <div key={day} className="flex flex-col">
                                {/* Day Header */}
                                <div
                                    className={`text-center p-4 rounded-xl mb-4 ${
                                        isToday
                                            ? "bg-blue-600/20 border border-blue-500/30 text-blue-400"
                                            : "bg-slate-700/30 border border-slate-600/30 text-slate-300"
                                    }`}
                                >
                                    <div className="font-semibold text-base">{day}</div>
                                    {isToday && <div className="text-xs text-blue-400 mt-1">Today</div>}
                                </div>

                                {/* Habits Container */}
                                <div className="space-y-3">
                                    {dayHabits.map((habit, idx) => (
                                        <HabitCard
                                            key={idx}
                                            habit={habit}
                                            day={day}
                                            idx={idx}
                                            isToday={isToday}
                                            completed={completed}
                                            skipped={skipped}
                                            onComplete={handleCompleted}
                                            onSkip={handleSkipped}
                                            layout="mobile"
                                        />
                                    ))}

                                    {/* Empty State */}
                                    {dayHabits.length === 0 && <EmptyState />}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Dialog */}
            <ChooseHabitDialog
                open={openedDialog}
                onSave={handleSaveHabit}
                onClose={() => {
                    setOpenedDialog(false)
                    setSelectedDay(null)
                }}
            />
        </div>
    )
}

// Separate HabitCard component for reusability
function HabitCard({ habit, day, idx, isToday, completed, skipped, onComplete, onSkip, layout = "column" }) {
    const key = `${day}-${idx}`
    const isCompleted = completed[key]
    const isSkipped = skipped[key]
    const periodStyle = periodColors[habit.period] || periodColors.morning
    const PeriodIcon = periodStyle.icon

    let statusStyle = ""
    if (isCompleted) {
        statusStyle = "bg-emerald-500/20 border-emerald-500/40"
    } else if (isSkipped) {
        statusStyle = "bg-red-500/20 border-red-500/40"
    } else {
        statusStyle = `bg-gradient-to-br ${periodStyle.bg} ${periodStyle.border}`
    }

    return (
        <div
            className={`border rounded-xl p-4 transition-all duration-300 ${!isToday ? "hover:scale-[1.02]" : ""} ${statusStyle}`}
        >
            {/* Habit Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <PeriodIcon className={`w-4 h-4 ${periodStyle.text}`} />
                    <span className="font-medium text-white text-sm">{habit.name}</span>
                </div>
                {(isCompleted || isSkipped) && (
                    <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isCompleted ? "bg-emerald-500" : "bg-red-500"
                        }`}
                    >
                        {isCompleted ? (
                            <CheckCircleIcon className="w-3 h-3 text-white" />
                        ) : (
                            <XMarkIcon className="w-3 h-3 text-white" />
                        )}
                    </div>
                )}
            </div>

            {/* Time */}
            <div className="flex items-center space-x-2 mb-3">
                <ClockIcon className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-400">{habit.time}</span>
            </div>

            {/* Action Buttons */}
            {!isCompleted && !isSkipped && (
                <div className="space-y-2">
                    <button
                        onClick={() => onComplete(day, idx)}
                        className="w-full px-2 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/30 hover:border-emerald-500/50 transition-all duration-300 text-xs font-medium text-center"
                    >
                        Complete
                    </button>
                    <button
                        onClick={() => onSkip(day, idx)}
                        className="w-full px-2 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 hover:border-red-500/50 transition-all duration-300 text-xs font-medium text-center"
                    >
                        Skip
                    </button>
                </div>
            )}

            {/* Status Message */}
            {isCompleted && <div className="text-center text-emerald-400 text-xs font-medium">✓ Completed</div>}
            {isSkipped && <div className="text-center text-red-400 text-xs font-medium">✗ Skipped</div>}
        </div>
    )
}

// Separate EmptyState component
function EmptyState() {
    return (
        <div className="text-center py-8 text-slate-500">
            <div className="w-12 h-12 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <ClockIcon className="w-6 h-6 text-slate-500" />
            </div>
            <p className="text-sm">No habits yet</p>
            <p className="text-xs text-slate-600 mt-1">Add your first habit above</p>
        </div>
    )
}
