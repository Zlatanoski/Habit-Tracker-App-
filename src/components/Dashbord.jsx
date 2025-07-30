"use client"

import {
    HomeIcon,
    PlusCircleIcon,
    ChartBarIcon,
    UserCircleIcon,
    ArrowLeftOnRectangleIcon,
    FireIcon,
    TrophyIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/solid"
import VerticalWeeklyTable from "./VerticalWeeklyTable"
import { Link } from "react-router-dom"

const menuItems = [
    { label: "Dashboard", icon: HomeIcon, path: "/dashboard", active: true },
    { label: "Add Habit", icon: PlusCircleIcon, path: "/add-habit" },
    { label: "Progress", icon: ChartBarIcon, path: "/progress" },
    { label: "Profile", icon: UserCircleIcon, path: "/profile" },
]

const habits = [
    { id: 1, name: "Drink Water", streak: 5, status: "Approved", color: "blue" },
    { id: 2, name: "Exercise", streak: 3, status: "Pending", color: "orange" },
    { id: 3, name: "Read Book", streak: 10, status: "Approved", color: "green" },
]

const getStatusColor = (status) => {
    switch (status) {
        case "Approved":
            return "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-400"
        case "Pending":
            return "from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-400"
        case "Denied":
            return "from-red-500/10 to-red-600/5 border-red-500/20 text-red-400"
        default:
            return "from-slate-500/10 to-slate-600/5 border-slate-500/20 text-slate-400"
    }
}

const getStatusIcon = (status) => {
    switch (status) {
        case "Approved":
            return <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
        case "Pending":
            return <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
        case "Denied":
            return <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        default:
            return <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
    }
}

export default function Dashboard({ user }) {
    const handleLogout = () => {
        // Add logout logic here
        console.log("Logging out...")
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50">
                <div className="p-4">
                    {/* Logo/Brand */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Habit Tracker
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">Build better habits daily</p>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {menuItems.map(({ label, icon: Icon, path, active }) => (
                            <Link
                                key={label}
                                to={path}
                                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group ${
                                    active
                                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                        : "hover:bg-slate-700/50 text-slate-300 hover:text-white border border-transparent hover:border-slate-600/50"
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{label}</span>
                                {active && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>}
                            </Link>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="mt-8 pt-6 border-t border-slate-700/50">
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 p-3 rounded-xl w-full text-left hover:bg-red-600/10 text-slate-300 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all duration-300"
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex flex-1 p-8 gap-6">
                {/* Table Centered */}
                <div className="flex-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-4">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
                            Your Habits
                        </h1>
                        <VerticalWeeklyTable user={user} />
                    </div>
                </div>

                {/* Right Panel for Streaks */}
                <div className="w-72 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-200">Streaks</h2>
                            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium">
                                {habits.filter((h) => h.status === "Approved").length} Active
                            </div>
                        </div>

                        <div className="space-y-3">
                            {habits.map((habit) => (
                                <div
                                    key={habit.id}
                                    className={`p-4 bg-gradient-to-br ${getStatusColor(habit.status)} border rounded-xl hover:border-opacity-60 transition-all duration-300`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(habit.status)}
                                            <span className="font-medium text-white text-sm">{habit.name}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FireIcon className="w-4 h-4 text-orange-400" />
                                        <span className="text-lg font-bold text-white">{habit.streak}</span>
                                        <span className="text-sm text-slate-400">day{habit.streak !== 1 ? "s" : ""} streak</span>
                                    </div>
                                    <div className="mt-2">
                    <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                            habit.status === "Approved"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : habit.status === "Pending"
                                    ? "bg-amber-500/20 text-amber-400"
                                    : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {habit.status}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-6 pt-4 border-t border-slate-700/50">
                            <h3 className="text-sm font-medium text-slate-400 mb-3">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <TrophyIcon className="w-4 h-4 text-amber-400" />
                                        <span className="text-sm text-slate-300">Best Streak</span>
                                    </div>
                                    <span className="text-sm font-semibold text-white">
                    {Math.max(...habits.map((h) => h.streak))} days
                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <CalendarDaysIcon className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm text-slate-300">Total Habits</span>
                                    </div>
                                    <span className="text-sm font-semibold text-white">{habits.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <FireIcon className="w-4 h-4 text-emerald-400" />
                                        <span className="text-sm text-slate-300">Active Streaks</span>
                                    </div>
                                    <span className="text-sm font-semibold text-white">
                    {habits.filter((h) => h.status === "Approved").length}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
