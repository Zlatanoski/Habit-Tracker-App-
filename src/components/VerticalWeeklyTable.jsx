"use client"

import { useState, useEffect, useCallback } from "react"
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
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"

const periodColors = {
    morning: { bg: "from-amber-500/10 to-amber-600/5", border: "border-amber-500/30", text: "text-amber-400", icon: SunIcon },
    noon: { bg: "from-orange-500/10 to-orange-600/5", border: "border-orange-500/30", text: "text-orange-400", icon: CloudIcon },
    evening: { bg: "from-purple-500/10 to-purple-600/5", border: "border-purple-500/30", text: "text-purple-400", icon: MoonIcon },
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
    const [currentWeekStart, setCurrentWeekStart] = useState(0)

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertSeverity, setAlertSeverity] = useState("error")

    // Fetch habits for the logged-in user
    const fetchHabits = useCallback(async () => {
        if (!user?.id) return
        try {
            const { data, error } = await supabase
                .from("habits")
                .select("id,name,time,period,day,status,user_id")
                .eq("user_id", user.id)

            if (error) {
                console.error("Fetch failed:", error)
                return
            }
            const grouped = makeEmptyBoard()
            data.forEach((habit) => {
                if (grouped[habit.day]) grouped[habit.day].push(habit)
            })
            setHabitsByDay(grouped)
        } catch (err) {
            console.error("Error fetching habits:", err)
        }
    }, [user?.id])

    // Fetch username once
    useEffect(() => {
        let mounted = true
        const fetchUserNames = async () => {
            try {
                const { data, error } = await supabase.auth.getUser()
                if (error) {
                    console.error("Failed to fetch user data.")
                    return
                }
                const name = data.user?.user_metadata?.name
                if (mounted && name) setUserName(name)
            } catch (err) {
                console.error("Error fetching user:", err)
            }
        }
        fetchUserNames()
        return () => {
            mounted = false
        }
    }, [])

    // Fetch habits when user changes
    useEffect(() => {
        let mounted = true
        ;(async () => {
            if (mounted) await fetchHabits()
        })()
        return () => {
            mounted = false
        }
    }, [fetchHabits])

    async function handleCompleted(habit) {
        try {
            await supabase.from("habits").update({ status: "completed" }).eq("id", habit.id)
            await fetchHabits()
        } catch (error) {
            console.error("Error completing habit:", error)
        }
    }

    async function handleSaveHabit(habitData) {
        const row = {
            user_id: user?.id,
            name: habitData.task,
            time: habitData.time,
            period: habitData.period,
            day: habitData.day,
            status: "pending",
        }
        try {
            const { error } = await supabase.from("habits").insert([row], { returning: "minimal" })
            if (error) {
                console.error("Insert failed:", error)
            } else {
                await fetchHabits()
                setOpenedDialog(false)
                setSelectedDay(null)
            }
        } catch (err) {
            console.error("Error saving habit:", err)
            setOpenedDialog(false)
            setSelectedDay(null)
        }
    }

    async function handleSkipped(habit) {
        try {
            await supabase.from("habits").update({ status: "skipped" }).eq("id", habit.id)
            await fetchHabits()
        } catch (error) {
            console.error("Error skipping habit:", error)
        }
    }

    const dayNames = Object.keys(habitsByDay)
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" })

    const nextDays = () => setCurrentWeekStart((prev) => Math.min(prev + 3, Math.max(dayNames.length - 3, 0)))
    const prevDays = () => setCurrentWeekStart((prev) => Math.max(prev - 3, 0))

    // Keep pager index in range if dayNames length changes
    useEffect(() => {
        setCurrentWeekStart((prev) => Math.min(prev, Math.max(dayNames.length - 3, 0)))
    }, [dayNames.length])

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
                        Hello, {userName}!
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base">Here are your habits for the week</p>
                </div>
                <button
                    onClick={() => {
                        setSelectedDay(null)
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
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
            </div>

            {/* Mobile nav (for 3-day pager) */}
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
                    disabled={currentWeekStart >= Math.max(dayNames.length - 3, 0)}
                    className="p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRightIcon className="w-5 h-5 text-slate-300" />
                </button>
            </div>

            {/* Week Grid */}
            <div className="w-full">
                {/* Desktop: 7 columns from md and up */}
                <div className="hidden md:grid md:grid-cols-7 gap-4">
                    {dayNames.map((day) => {
                        const isToday = day === today
                        const dayHabits = habitsByDay[day] || []
                        return (
                            <div key={day} className="flex flex-col min-h-[400px]">
                                <div
                                    className={`text-center p-3 rounded-xl mb-4 ${
                                        isToday
                                            ? "bg-blue-600/20 border border-blue-500/30 text-blue-400"
                                            : "bg-slate-700/30 border border-slate-600/30 text-slate-300"
                                    }`}
                                >
                                    <div className="font-semibold text-sm">{day}</div>
                                    <div className={`text-xs text-blue-400 mt-1 ${!isToday ? "invisible" : ""}`}>Today</div>
                                </div>
                                <div className="flex-1 space-y-3">
                                    {dayHabits.map((habit) => (
                                        <HabitCard
                                            key={habit.id}
                                            habit={habit}
                                            onComplete={handleCompleted}
                                            onSkip={handleSkipped}
                                            isToday={isToday}
                                            layout="column"
                                        />
                                    ))}
                                    {dayHabits.length === 0 && <EmptyState />}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Tablet: stacked days (visible on sm..(md-1)) */}
                <div className="hidden sm:block md:hidden space-y-6">
                    {dayNames.map((day) => {
                        const isToday = day === today
                        const dayHabits = habitsByDay[day] || []
                        return (
                            <div key={day} className="w-full">
                                <div
                                    className={`flex items-center justify-between p-4 rounded-xl mb-4 ${
                                        isToday
                                            ? "bg-blue-600/20 border border-blue-500/30 text-blue-400"
                                            : "bg-slate-700/30 border border-slate-600/30 text-slate-300"
                                    }`}
                                >
                                    <div>
                                        <div className="font-semibold text-lg">{day}</div>
                                        <div className={`text-sm text-blue-400 mt-1 ${!isToday ? "invisible" : ""}`}>Today</div>
                                    </div>
                                    <div className="text-sm text-slate-400">
                                        {dayHabits.length} habit{dayHabits.length !== 1 ? "s" : ""}
                                    </div>
                                </div>
                                {dayHabits.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {dayHabits.map((habit, idx) => (
                                            <HabitCard
                                                key={habit.id}
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

                {/* Mobile: 3-day pager (visible on <sm) */}
                <div className="sm:hidden space-y-6">
                    {dayNames.slice(currentWeekStart, currentWeekStart + 3).map((day) => {
                        const isToday = day === today
                        const dayHabits = habitsByDay[day] || []
                        return (
                            <div key={day} className="flex flex-col">
                                <div
                                    className={`text-center p-4 rounded-xl mb-4 ${
                                        isToday
                                            ? "bg-blue-600/20 border border-blue-500/30 text-blue-400"
                                            : "bg-slate-700/30 border border-slate-600/30 text-slate-300"
                                    }`}
                                >
                                    <div className="font-semibold text-base">{day}</div>
                                    <div className={`text-xs text-blue-400 mt-1 ${!isToday ? "invisible" : ""}`}>Today</div>
                                </div>
                                <div className="space-y-3">
                                    {dayHabits.map((habit, idx) => (
                                        <HabitCard
                                            key={habit.id}
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
                                    {dayHabits.length === 0 && <EmptyState />}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {alertOpen && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
                        <AlertTitle>
                            {alertSeverity === "error" ? "Error" : alertSeverity === "warning" ? "Warning" : "Notice"}
                        </AlertTitle>
                        {alertMessage}
                    </Alert>
                </div>
            )}

            <ChooseHabitDialog
                open={openedDialog}
                onSave={handleSaveHabit}
                onClose={() => {
                    setOpenedDialog(false)
                    setSelectedDay(null)
                }}
                onError={(message, severity) => {
                    setAlertMessage(message)
                    setAlertSeverity(severity)
                    setAlertOpen(true)
                    setOpenedDialog(false)
                    setSelectedDay(null)
                }}
            />
        </div>
    )
}

function HabitCard({ habit, onComplete, onSkip, isToday, layout }) {
    const { name, time, period, status: habitStatus } = habit
    const isCompleted = habitStatus === "completed"
    const isSkipped = habitStatus === "skipped"
    const periodStyle = periodColors[habit.period] || periodColors.morning
    const PeriodIcon = periodStyle.icon

    let statusStyle = ""
    if (isCompleted) statusStyle = "bg-emerald-500/20 border-emerald-500/40"
    else if (isSkipped) statusStyle = "bg-red-500/20 border-red-500/40"
    else statusStyle = `bg-gradient-to-br ${periodStyle.bg} ${periodStyle.border}`

    return (
        <div
            className={`border rounded-xl p-4 transition-all duration-300 ${
                !isToday ? "hover:scale-[1.02]" : ""
            } ${statusStyle}`}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <PeriodIcon className={`w-4 h-4 ${periodStyle.text}`} />
                    <span className="font-medium text-white text-sm">{name}</span>
                </div>
                {(isCompleted || isSkipped) && (
                    <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isCompleted ? "bg-emerald-500" : "bg-red-500"
                        }`}
                    >
                        {isCompleted ? <CheckCircleIcon className="w-3 h-3 text-white" /> : <XMarkIcon className="w-3 h-3 text-white" />}
                    </div>
                )}
            </div>
            <div className="flex items-center space-x-2 mb-3">
                <ClockIcon className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-400">{time}</span>
            </div>
            {!isCompleted && !isSkipped && (
                <div className="space-y-2">
                    <button
                        onClick={() => onComplete(habit)}
                        className="w-full px-2 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/30 hover:border-emerald-500/50 transition-all duration-300 text-xs font-medium text-center"
                    >
                        Complete
                    </button>
                    <button
                        onClick={() => onSkip(habit)}
                        className="w-full px-2 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 hover:border-red-500/50 transition-all duration-300 text-xs font-medium text-center"
                    >
                        Skip
                    </button>
                </div>
            )}
            {isCompleted && <div className="text-center text-emerald-400 text-xs font-medium">✓ Completed</div>}
            {isSkipped && <div className="text-center text-red-400 text-xs font-medium">✗ Skipped</div>}
        </div>
    )
}

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
