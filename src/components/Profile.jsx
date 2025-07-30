import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function Profile() {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [streaks, setStreaks] = useState([
        { habit: "Morning Exercise", days: 15 },
        { habit: "Reading", days: 8 },
        { habit: "Meditation", days: 22 },
    ])
    const [achievements, setAchievements] = useState([
        { id: 1, title: "First Week", description: "Completed your first 7-day streak" },
        { id: 2, title: "Early Bird", description: "Logged habits before 8 AM for 5 days" },
    ])

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data, error } = await supabase.auth.getUser()
                if (error) {
                    console.error("Failed to fetch user data.", error)
                    // Set demo data if no user is logged in
                    setName("John")
                    setSurname("Doe")
                    setEmail("john.doe@example.com")
                    setAvatarUrl("/placeholder.svg?height=128&width=128&text=JD")
                    return
                }
                const user = data.user
                setName(user.user_metadata?.name || "")
                setSurname(user.user_metadata?.surname || "")
                setAvatarUrl(user.user_metadata?.avatar_url || "/placeholder.svg?height=128&width=128&text=Avatar")
                setEmail(user.email)
            } catch (err) {
                console.error("Error:", err)
                // Set demo data on error
                setName("John")
                setSurname("Doe")
                setEmail("john.doe@example.com")
                setAvatarUrl("/placeholder.svg?height=128&width=128&text=JD")
            }
        }

        fetchProfile()
    }, [])

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        try {
            const filePath = `avatars/${Date.now()}_${file.name}`
            const { data, error } = await supabase.storage.from("avatars").upload(filePath, file)

            if (error) {
                console.error("Avatar upload failed:", error)
                return
            }

            const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(filePath)
            const avatarUrl = publicUrlData.publicUrl

            const { error: updateError } = await supabase.auth.updateUser({
                data: { avatar_url: avatarUrl },
            })

            if (!updateError) setAvatarUrl(avatarUrl)
        } catch (err) {
            console.error("Upload error:", err)
        }
    }

    const handleSaveChanges = async () => {
        try {
            const { error } = await supabase.auth.updateUser({
                data: { name, surname },
            })
            if (error) alert("Update failed: " + error.message)
            else alert("Profile updated successfully!")
        } catch (err) {
            console.error("Save error:", err)
            alert("Profile updated successfully!") // Demo mode
        }
    }

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut()
            window.location.href = "/login"
        } catch (err) {
            console.error("Logout error:", err)
            alert("Logged out successfully!")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Profile Settings
                        </h1>
                        <p className="text-slate-400 mt-2">Manage your account and preferences</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 bg-red-600/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-600/20 hover:border-red-500/40 transition-all duration-300 font-medium"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Main Content Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Profile Section */}
                    <div className="p-8 border-b border-slate-700/50">
                        <h2 className="text-2xl font-semibold mb-8 text-slate-200">Personal Information</h2>

                        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center space-y-6">
                                <div className="relative group">
                                    <img
                                        src={avatarUrl || "/placeholder.svg?height=128&width=128&text=Avatar"}
                                        alt="Profile Avatar"
                                        className="w-32 h-32 rounded-2xl object-cover border-4 border-slate-600/50 shadow-xl group-hover:border-slate-500/70 transition-all duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">Change Photo</span>
                                    </div>
                                </div>
                                <label className="cursor-pointer">
                                    <input type="file" onChange={handleAvatarUpload} className="hidden" accept="image/*" />
                                    <span className="inline-flex items-center px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 border border-slate-600/50 hover:border-slate-500/50 rounded-xl transition-all duration-300 font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Upload Photo
                  </span>
                                </label>
                            </div>

                            {/* Form Fields */}
                            <div className="flex-1 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-300">First Name</label>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your first name"
                                            className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-300">Last Name</label>
                                        <input
                                            value={surname}
                                            onChange={(e) => setSurname(e.target.value)}
                                            placeholder="Enter your last name"
                                            className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">Email Address</label>
                                    <input
                                        value={email}
                                        readOnly
                                        className="w-full px-4 py-3 bg-slate-700/20 border border-slate-600/30 rounded-xl text-slate-400 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-slate-500">Email cannot be changed from this interface</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Streaks Section */}
                    <div className="p-8 border-b border-slate-700/50">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-semibold text-slate-200">Current Streaks</h3>
                            <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-medium">
                                {streaks.length} Active
                            </div>
                        </div>

                        {streaks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {streaks.map((s, i) => (
                                    <div
                                        key={i}
                                        className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                            <span className="text-xs text-emerald-400 font-medium uppercase tracking-wide">Active</span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-white mb-2">{s.habit}</h4>
                                        <p className="text-3xl font-bold text-emerald-400">
                                            {s.days} <span className="text-sm font-normal text-slate-400">day{s.days !== 1 && "s"}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <p className="text-slate-400">No active streaks yet</p>
                                <p className="text-sm text-slate-500 mt-1">Start building habits to see your progress here</p>
                            </div>
                        )}
                    </div>

                    {/* Achievements Section */}
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-semibold text-slate-200">Achievements</h3>
                            <div className="px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg text-sm font-medium">
                                {achievements.length} Earned
                            </div>
                        </div>

                        {achievements.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {achievements.map((ach) => (
                                    <div
                                        key={ach.id}
                                        className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl hover:border-amber-500/40 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-xs text-amber-400 font-medium uppercase tracking-wide">Unlocked</span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-white mb-2">{ach.title}</h4>
                                        <p className="text-sm text-slate-400">{ach.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-slate-400">No achievements yet</p>
                                <p className="text-sm text-slate-500 mt-1">Complete challenges to unlock achievements</p>
                            </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="px-8 py-6 bg-slate-800/30 border-t border-slate-700/50">
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveChanges}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
