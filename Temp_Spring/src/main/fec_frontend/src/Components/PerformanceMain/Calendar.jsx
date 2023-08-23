import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
    const [time, setTime] = useState('');
    const [plantName, setPlantName] = useState('');
    const [todo, setTodo] = useState('');
    const [sampleEvents, setSampleEvents] = useState([

    ]);

    const fetchTodoData = async () => {
        try {
            const response = await axios.get('/api/getTodoData'); // Fetch data from API
            const todoData = response.data;

            // Update the events state with the fetched data
            const updatedEvents = todoData.map(todoItem => ({
                id: todoItem.plantName,
                title: todoItem.todo,
                start: todoItem.time,

            }));

            setSampleEvents(updatedEvents);
        } catch (error) {
            console.error('Error fetching todo data:', error);
        }
    };

    const handleDrop = (info) => {
        // Handle external event drop here
        console.log('Dropped event:', info);
        setTime(info.date);
    };

    const handleEventClick = (info) => {
        // Handle event click here
        setTime(info.event.start);
        setPlantName(info.event.extendedProps.plantName);
        setTodo(info.event.title);
    };

    const handleDateSelect = (selectInfo) => {
        // Handle date selection here
        const selectedDate = selectInfo.start;
        setTime(selectedDate);

        // Find an event on the selected date, if any
        const selectedEvent = sampleEvents.find(event =>
            isSameDay(new Date(event.start), selectedDate)
        );

        if (selectedEvent) {
            setPlantName(selectedEvent.extendedProps.plantName);
            setTodo(selectedEvent.title);
        } else {
            setPlantName('');
            setTodo('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            time,
            plantName,
            todo,
        };

        const customConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.post('/api/addTodoData', data, customConfig);

            console.log(response.data);
            // Clear form fields after successful submission
            setTime('');
            setPlantName('');
            setTodo('');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    useEffect(() => {
        fetchTodoData(); // Fetch data when the component mounts
    }, []);

    return (
        <div className="mt-4">
            <div>
                <h1 className='text-2xl'>Make a new plan</h1>
                <p className='text-md text-gray-500'>Click the date icon for fast input </p>
            </div>
            <form onSubmit={handleSubmit} className="flex space-x-4">
                <div className="flex flex-col">
                    <label htmlFor="datetime" className="text-gray-700">Date</label>
                    <input
                        id="datetime"
                        type="datetime-local"
                        className="border border-gray-300 rounded-md p-2"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="plantName" className="text-gray-700">Plant</label>
                    <input
                        id="plantName"
                        type="text"
                        placeholder="Plant Name"
                        className="border border-gray-300 rounded-md p-2"
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="todoDescription" className="text-gray-700">Description</label>
                    <textarea
                        id="todoDescription"
                        placeholder="Todo Description"
                        className="border border-gray-300 rounded-md p-2"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded'
                >
                    Submit
                </button>
            </form>

            {/* FullCalendar component */}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={sampleEvents}
                eventClick={handleEventClick}
                selectable={true}
                select={handleDateSelect}
                droppable={true}
                drop={handleDrop}
            />
        </div>
    );
};

export default Calendar;