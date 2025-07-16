// components/VerticalWeeklyTower.jsx
import { useState } from "react";

const habitsByDay = {
    Monday: [
        { name: 'Run', time: '8 AM', period: 'morning' },
        { name: 'Healthy Lunch', time: '12 PM', period: 'noon' },
        { name: 'Reflect', time: '8 PM', period: 'evening' },
    ],
    Tuesday: [
        { name: 'Meditate', time: '8:30 AM', period: 'morning' },
        { name: 'Team Sync', time: '1 PM', period: 'noon' },
        { name: 'Read', time: '9 PM', period: 'evening' },
    ],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
};

const periodColors = {
    morning: 'border-blue-500 text-blue-400',
    noon: 'border-orange-500 text-orange-400',
    evening: 'border-purple-500 text-purple-400',
};

export default function VerticalWeeklyTower() {

    const [completed,setCompleted] = useState({});
    const [skipped, setSkipped] = useState({});

    //Function to mark a task as completed when clicked the button
    const handleCompleted = (day ,idx) => {
        const key = `${day}-${idx}`;


        if(completed[key] || skipped[key]) return;

        setCompleted(prev =>({
            ...prev,
            [key]:true,
        }));
        console.log("Task completed ")





    }

    //Function to mark a task as skipped when clicked the button
    const handleSkipped = (day ,idx) => {
        const key = `${day}-${idx}`;

        if(completed[key] || skipped[key]) return;

        setSkipped(prev =>({
            ...prev,
            [key]:true,
        }));
    }


    const dayNames = Object.keys(habitsByDay);

    return (
        <div className="bg-gray-900 p-4 rounded shadow text-white overflow-x-auto">
            <h2 className="text-xl font-semibold mb-6">Weekly Habit Board</h2>

            {/* Columns for each day */}
            <div className="grid grid-cols-7 gap-4 min-w-[900px]">
                {dayNames.map((day) => (



                    <div key={day} className="flex flex-col items-center">
                        {/* Habit cards stacked vertically */}
                        <div className="space-y-3 w-full">
                            {habitsByDay[day].map((habit, idx) => {

                                const key = `${day}-${idx}`;
                                let bgColor = "bg-gray-800"
                                if (completed[key]) {
                                    bgColor = 'bg-green-800'
                                }
                                else if(skipped[key]) {
                                    bgColor = 'bg-red-800'
                                }

                                return(
                                <div
                                    key={idx}
                                    className={`border-2 p-3 rounded ${bgColor} text-sm ${periodColors[habit.period]}`}
                                >
                                    <div className="font-medium">{habit.name}</div>
                                    <div className="text-gray-400">{habit.time}</div>
                                    <div className=" flex items-center justify-between">
                                        <div className=" w-fit">
                                            <button onClick={() => handleCompleted(day, idx)}
                                                    className="text-green-400 text-center">Completed
                                            </button>
                                        </div>
                                        <div onClick={() => handleSkipped(day, idx)} className=" w-fit">
                                            <button className="text-red-500 text-center">Skip</button>
                                        </div>


                                    </div>

                                </div>
                                );
                            })}
                        </div>

                        {/* Day label */}
                        <div className="mt-4 text-sm font-bold text-gray-300">{day}</div>

                        {/* Add Button */}
                        <button
                            onClick={() => handleAddHabit(day,idx)}
                            className="mt-2 text-xs px-3 py-1 bg-gray-700 text-white border border-dashed border-gray-500 rounded hover:bg-gray-600"
                        >
                            + Add Habit
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}
