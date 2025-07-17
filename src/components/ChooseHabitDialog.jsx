import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

function ChooseHabitDialog({ open, onClose, onSave }) {
    const [period, setPeriod] = useState('');
    const [time, setTime] = useState('');    // you can init to '07:00' if you want a default
    const [task, setTask] = useState('');

    const handleSave = () => {
        onSave({ period, time, task });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: '#ffffff',
                        borderRadius: 3,
                        p: 2
                    }
                },
                backdrop: {
                    sx: {
                        backgroundColor: 'transparent'
                    }
                }
            }}
        >
            <DialogTitle>Select Habit Details</DialogTitle>
            <DialogContent>
                {/* PERIOD */}
                <FormControl fullWidth margin="dense">
                    <InputLabel id="period-label">Period</InputLabel>
                    <Select
                        labelId="period-label"
                        value={period}
                        label="Period"
                        onChange={e => setPeriod(e.target.value)}
                    >
                        <MenuItem value="morning">Morning</MenuItem>
                        <MenuItem value="noon">Noon</MenuItem>
                        <MenuItem value="evening">Evening</MenuItem>
                    </Select>
                </FormControl>

                {/* TIME */}
                <TextField
                    label="Time"
                    type="time"
                    fullWidth
                    margin="dense"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    slotProps={{
                        // targets the <input> inside the TextField
                        input: {
                            step: 60         // ⏱ only minutes, no seconds
                        },
                        // forces the label to shrink so it never overlaps
                        label: {
                            shrink: true
                        }
                    }}
                />

                {/* TASK TYPE */}
                <FormControl fullWidth margin="dense">
                    <InputLabel id="task-label">Task Type</InputLabel>
                    <Select
                        labelId="task-label"
                        value={task}
                        label="Task Type"
                        onChange={e => setTask(e.target.value)}
                    >
                        <MenuItem value="read">Read</MenuItem>
                        <MenuItem value="run">Run</MenuItem>
                        <MenuItem value="swim">Swim</MenuItem>
                        <MenuItem value="gym">Gym</MenuItem>
                        <MenuItem value="meditate">Meditate</MenuItem>
                        <MenuItem value="add_more" disabled>
                            Add more (coming soon)
                        </MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={!period || !time || !task}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChooseHabitDialog;
