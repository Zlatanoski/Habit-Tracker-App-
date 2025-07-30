"use client"

import { useState } from "react"
import { XMarkIcon, ClockIcon, SunIcon, CloudIcon, MoonIcon } from "@heroicons/react/24/solid"

const periodOptions = [
    { value: "morning", label: "Morning", icon: SunIcon, color: "text-amber-400" },
    { value: "noon", label: "Noon", icon: CloudIcon, color: "text-orange-400" },
    { value: "evening", label: "Evening", icon: MoonIcon, color: "text-purple-400" },
]

const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function ChooseHabitDialog({ open, onSave, onClose }) {
    const [task, setTask] = useState("")
    const [time, setTime] = useState("")
    const [period, setPeriod] = useState("morning")
    const [day, setDay] = useState("Monday")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!task.trim() || !time.trim()) {
            alert("Please fill in all fields")
            return
        }

        onSave({
            task: task.trim(),
            time,
            period,
            day,
        })

        // Reset form
        setTask("")
        setTime("")
        setPeriod("morning")
        setDay("Monday")
    }

    const handleClose = () => {
        // Reset form when closing
        setTask("")
        setTime("")
        setPeriod("morning")
        setDay("Monday")
        onClose()
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                    <h2 className="text-xl font-semibold text-white">Add New Habit</h2>
                    <button onClick={handleClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                        <XMarkIcon className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Habit Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Habit Name</label>
                        <input
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="e.g., Morning Exercise, Read Book"
                            className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                            required
                        />
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Time</label>
                        <div className="relative">
                            <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Period */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Period</label>
                        <div className="grid grid-cols-3 gap-2">
                            {periodOptions.map((option) => {
                                const Icon = option.icon
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setPeriod(option.value)}
                                        className={`p-3 rounded-xl border transition-all duration-300 ${
                                            period === option.value
                                                ? "bg-blue-600/20 border-blue-500/30 text-blue-400"
                                                : "bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-600/30"
                                        }`}
                                    >
                                        <Icon
                                            className={`w-5 h-5 mx-auto mb-1 ${period === option.value ? "text-blue-400" : option.color}`}
                                        />
                                        <div className="text-xs font-medium">{option.label}</div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Day */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Day</label>
                        <select
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                        >
                            {dayOptions.map((dayOption) => (
                                <option key={dayOption} value={dayOption} className="bg-slate-800">
                                    {dayOption}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-3 bg-slate-700/50 text-slate-300 border border-slate-600/50 rounded-xl hover:bg-slate-600/50 hover:border-slate-500/50 transition-all duration-300 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                        >
                            Add Habit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
