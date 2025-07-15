// components/Dashboard.jsx
import {
    HomeIcon,
    PlusCircleIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    UserCircleIcon,
    ArrowLeftOnRectangleIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const menuItems = [
    { label: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { label: 'Add Habit', icon: PlusCircleIcon, path: '/add-habit' },
    { label: 'Progress', icon: ChartBarIcon, path: '/progress' },
    { label: 'Profile', icon: UserCircleIcon, path: '/profile' },
    { label: 'Logout', icon: ArrowLeftOnRectangleIcon, path: '/logout' },
];

const habits = [
    { id: 1, name: 'Drink Water', streak: 5, status: 'Approved' },
    { id: 2, name: 'Exercise', streak: 3, status: 'Pending' },
    { id: 3, name: 'Read Book', streak: 10, status: 'Denied' },
];

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 p-4">
                <h2 className="text-xl font-bold mb-6">Habit Tracker</h2>
                <nav className="space-y-4">
                    {menuItems.map(({ label, icon: Icon, path }) => (
                        <Link
                            key={label}
                            to={path}
                            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
                        >
                            <Icon className="w-5 h-5" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex flex-1 p-8 gap-6">
                {/* Table Centered */}
                <div className="flex-1 bg-gray-800 p-4 rounded shadow">
                    <h1 className="text-2xl font-bold mb-4">Your Habits</h1>
                    <table className="w-full text-left text-sm">
                        <thead>
                        <tr className="text-gray-400 border-b border-gray-600">
                            <th className="p-2">Habit</th>
                            <th className="p-2">Streak</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {habits.map((habit) => (
                            <tr key={habit.id} className="border-b border-gray-700 hover:bg-gray-700">
                                <td className="p-2">{habit.name}</td>
                                <td className="p-2">{habit.streak}</td>
                                <td className="p-2">
                    <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                            habit.status === 'Approved'
                                ? 'bg-green-700 text-green-200'
                                : habit.status === 'Pending'
                                    ? 'bg-yellow-700 text-yellow-200'
                                    : 'bg-red-700 text-red-200'
                        }`}
                    >
                      {habit.status}
                    </span>
                                </td>
                                <td className="p-2 space-x-2">
                                    <button className="text-blue-400 hover:text-blue-200">
                                        <PencilIcon className="w-5 h-5 inline" />
                                    </button>
                                    <button className="text-red-400 hover:text-red-200">
                                        <TrashIcon className="w-5 h-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Right Panel for Streaks or Widgets */}
                <div className="w-72 bg-gray-800 p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Streaks</h2>
                    <ul className="space-y-3">
                        {habits.map((habit) => (
                            <li key={habit.id} className="bg-gray-700 p-3 rounded">
                                <div className="font-medium">{habit.name}</div>
                                <div className="text-sm text-gray-300">🔥 {habit.streak}-day streak</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
