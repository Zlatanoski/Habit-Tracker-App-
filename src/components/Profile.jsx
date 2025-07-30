import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Profile() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [streaks, setStreaks] = useState([]);
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Failed to fetch user data.", error);
                return;
            }
            const user = data.user;
            setName(user.user_metadata?.name || "");
            setSurname(user.user_metadata?.surname || "");
            setAvatarUrl(user.user_metadata?.avatar_url || "/default-picture.jpeg");
            setEmail(user.email);
        };

        fetchProfile();
    }, []);

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const filePath = `avatars/${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage.from("avatars").upload(filePath, file);

        if (error) {
            console.error("Avatar upload failed:", error);
            return;
        }

        const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
        const avatarUrl = publicUrlData.publicUrl;

        const { error: updateError } = await supabase.auth.updateUser({
            data: { avatar_url: avatarUrl },
        });
        if (!updateError) setAvatarUrl(avatarUrl);
    };

    const handleSaveChanges = async () => {
        const { error } = await supabase.auth.updateUser({
            data: { name, surname },
        });
        if (error) alert("Update failed: " + error.message);
        else alert("Profile updated successfully!");
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white py-10 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto p-8 bg-gray-800 rounded-lg shadow-md space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Profile</h2>
                    <button onClick={handleLogout} className="text-sm text-red-400 hover:underline">Logout</button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
                    <img
                        src={avatarUrl || "/default-picture.jpeg"}
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover"
                    />                    <div className="flex-1 space-y-2">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="First Name"
                            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
                        />
                        <input
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            placeholder="Last Name"
                            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
                        />
                    </div>
                    <label className="cursor-pointer text-sm text-blue-400 hover:underline">
                        <input type="file" onChange={handleAvatarUpload} className="hidden" />
                        Change Avatar
                    </label>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                    <input
                        value={email}
                        readOnly
                        className="w-full px-4 py-2 rounded bg-gray-700 text-gray-400 border border-gray-600"
                    />
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Streaks</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {streaks.map((s, i) => (
                            <div key={i} className="p-4 bg-indigo-200 dark:bg-gray-700 rounded-lg">
                                <p className="text-sm text-gray-800 dark:text-gray-300">{s.habit}</p>
                                <p className="text-xl font-bold">{s.days} day{s.days !== 1 && "s"}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Achievements</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {achievements.map((ach) => (
                            <div key={ach.id} className="p-4 bg-yellow-200 dark:bg-gray-700 rounded-lg">
                                <p className="text-md font-semibold text-gray-900 dark:text-white">{ach.title}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{ach.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-right">
                    <button
                        onClick={handleSaveChanges}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
