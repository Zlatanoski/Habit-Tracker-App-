// components/VerticalWeeklyTower.jsx
import { useState, useEffect} from "react";
import ChooseHabitDialog from "./ChooseHabitDialog";
import {supabase} from "../supabaseClient";


const periodColors = {
    morning: 'border-blue-500 text-blue-400',
    noon: 'border-orange-500 text-orange-400',
    evening: 'border-purple-500 text-purple-400',
};
function makeEmptyBoard(){
    return{
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []

    }
}

export default function VerticalWeeklyTower({user}) {
    // STORAGE FOR HABITS
    const [habitsByDay, setHabitsByDay] = useState(makeEmptyBoard);


    //Dialog for choosing habit to add
    const [openedDialog,setOpenedDialog] = useState(false);
    const [userName, setUserName] = useState("");
    const [completed,setCompleted] = useState({});
    const [skipped, setSkipped] = useState({});
    const [selectedDay,  setSelectedDay]  = useState(null)

    useEffect(()=>{
        const fetchUserNames = async () => {

            const {data, error} = await supabase.auth.getUser();

            if(error){
                console.error("Failed to fetch user data.");
                return;
            }
            const user = data.user;
            const name = user?.user_metadata?.name;

            if(name){
                setUserName(name);
            }

        }

        fetchUserNames();
    },[])

    async function fetchHabits() {
        const { data, error } = await supabase
            .from("habits")
            .select("*")
        if (error) {
            console.error("Fetch failed:", error)
            return
        }

        const grouped = { Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: []
        }


        // 2) group by day
        data.forEach(habit => {
            if (grouped[habit.day]) grouped[habit.day].push(habit)
        })
        setHabitsByDay(grouped)
    }

    // 3) kick off the fetch whenever `user` changes
    useEffect(() => {
        if (user){
            fetchHabits()
        } else {
            setHabitsByDay(emptyBoard)   // clear on logout
        }
    }, [user])

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
    async function handleSaveHabit(habitData) {
        const row = {
            name:   habitData.task,
            time:   habitData.time,
            period: habitData.period,
            day:    selectedDay,
        }

        // --- notice the { returning: 'minimal' } here ---
        const { data, error } = await supabase
            .from('habits')
            .insert([ row ], { returning: 'minimal' })

        console.log('Insert response:', { data, error })

        if (error) {
            console.error('Insert failed:', error)
        } else {
            await fetchHabits()
            setOpenedDialog(false)
            setSelectedDay(null)
        }
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
            <h1> Hello {userName} !</h1>
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
                            onClick={() => {
                                setSelectedDay(day)
                                setOpenedDialog(true)}}
                            className="mt-2 text-xs px-3 py-1 bg-gray-700 text-white border border-dashed border-gray-500 rounded hover:bg-gray-600"
                        >
                            + Add Habit
                        </button>
                        <ChooseHabitDialog open={openedDialog}  onSave={handleSaveHabit} onClose={() => setOpenedDialog(false) } />

                    </div>
                ))}
            </div>
        </div>
    );
}
