import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
// import { Calendar, Select, Radio, Col, Row, Typography } from 'antd';
import { Container, Row, Col, Button } from 'react-bootstrap';

// @datepicker website https://reactjsexample.com/beautiful-minimal-and-accessible-date-picker-for-react/
import DatePicker from 'sassy-datepicker';
import store from '../redux/store';
import ScheduleEventForm from 'components/Schedule/ScheduleEventForm';
import ScheduledEvents from 'components/Schedule/ScheduledEvents';
import { ISchedule } from '../interfaces/schedule';



const Schedule: React.FC = () => {

    // interface IState {
    //     date: any,
    //     editingMode: boolean
    //     eventList: ISchedule[]
    // }
    // const [eventId, setEventId] = useState();
    const [itemCount, setItemCount] = useState(2);
    const [editItem, setEditItem] = useState({});
    const [date, setDate] = useState(new Date());
    const [formatedDate, setFormatedDate] = useState<string>('');
    const [editingMode, setEditingMode] = useState(false);
    const [eventlist, setEventlist] = useState([{
        id: 0,
        title: 'Finding Julia',
        dateFrom: 'Feb-12-2022',
        dateTo: '',
        timeFrom: '',
        timeTo: '',
        location: '',
        contacts: [{
            id: 0,
            name: 'John',
            phone: '778-888-8888',
            email: 'john@gmail.com'
        }],
        notes: 'something'
    },
    {
        id: 1,
        title: 'Something',
        dateFrom: 'Apr-3-2022',
        dateTo: '',
        timeFrom: '',
        timeTo: '',
        location: '',
        contacts: [{
            id: 0,
            name: 'John',
            phone: '778-888-8888',
            email: 'john@gmail.com'
        }],
        notes: 'nothing much'
    }]);

    

    const addSchedule = (newEvent: any) => {
        setEventlist([
            ...eventlist, {
                ...newEvent
            }
        ]);
    }

    const editSchedule = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const id = event.target.getAttribute('data-event');

        console.log('editing event: ', id);

        const item = eventlist.filter( (scheduledEvent) => scheduledEvent.id === Number(id));

        console.log('item to be edited is: ', item[0]);
        setEditItem(item[0]);

        onSwitchEditMode();
    }

    const deleteSchedule = (event: React.ChangeEvent<HTMLInputElement>) => {

        const id = event.target.getAttribute('data-event');

        console.log('deleting event: ', id);

        const newArray = eventlist.filter( (scheduledEvent) => scheduledEvent.id !== Number(id) );

        console.log(newArray);

        setEventlist(newArray);
    }

    // const onPanelChange = (value: any, mode: any) => {
    //     console.log(value, mode);
    // }

    const addNewSchedule = () => {

        if(editingMode===false) {
            setItemCount(itemCount+1);
        }

        setEditItem({
            id: itemCount,
            title: '',
            dateFrom: formatedDate,
            dateTo: '',
            timeFrom: '',
            timeTo: '',
            location: '',
            contacts: [{
                id: 0,
                name: "",
                phone: "",
                email: ""
            }],
            notes: ''
        });

        onSwitchEditMode();
    }

    // saveSchedule = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     store.dispatch(
    //         addEvent(

    //         )
    //     );
    // }

    const onSwitchEditMode = () => {
        setEditingMode( !editingMode );
    }

    const onDateChange = (selectedDate: any) => {
        console.log(`New date selected - ${selectedDate.toString()}`);
        setDate(selectedDate);
    };

    useEffect(()=>{

        console.log('the schedule is updated: ', eventlist);

    }, [eventlist]);

    const [currMonth, setCurrMonth] = useState<any>();

    useEffect(()=>{

        setCurrMonth(document.querySelector('.sdp--month-name'));

        const monthNames = [
            "January", 
            "February", 
            "March", 
            "April", 
            "May", 
            "June",
            "July", 
            "August", 
            "September", 
            "October", 
            "November", 
            "December"
        ];

        const formattedDateStr = monthNames[date.getMonth()].slice(0, 3) + '-' + date.getDate() + '-' + date.getFullYear();

        setFormatedDate(formattedDateStr);

        console.log('format string is ', formattedDateStr);

        eventlist.forEach(scheduledEvent=>{
            
            // console.log(scheduledEvent.dateFrom.split('-')[0]);
            // console.log(currMonth?.getAttribute('aria-label').slice(0, 3));

            if( scheduledEvent.dateFrom.split('-')[0] === currMonth?.getAttribute('aria-label').slice(0, 3) ) {
                let btnList = document.querySelectorAll('.sdp--date-btn');
                // console.log(btnList.length);
                // console.log(scheduledEvent.dateFrom.split('-')[1]);
                
                btnList.forEach(btn => {
                    // console.log('btn innder is ', btn.innerHTML);
                    if(scheduledEvent.dateFrom.split('-')[1]===btn.innerHTML){
                        btn.classList.add('has-events');
                    }
                });
            }
        })
    }, );

    useEffect(()=>{
        let btnList = document.querySelectorAll('.sdp--square-btn');

        btnList.forEach(btn=>{
            
            btn.addEventListener('click', ()=>{
                
                setCurrMonth(document.querySelector('.sdp--month-name'));
                // console.log('curr month is ', currMonth);
            })
        })
    });

    return (
        <main className="your-calendar-page">
            <div className="wrapper">
                <Row as="section">
                    <Col xs={12} md={6}>
                        <div className="calendar-container-group">
                            <h1>Your Calendar</h1>
                            <Button className="add-new-schedule-btn" onClick={addNewSchedule}>+ add new schedule</Button>
                            <div className="calendar-container">
                                {/* <Calendar fullscreen={false} onPanelChange={this.onPanelChange} /> */}
                                <DatePicker onChange={onDateChange} selected={date} />
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        {
                            editingMode ?
                                <ScheduleEventForm selectedDate={date} onSwitchEditMode={onSwitchEditMode} addSchedule={addSchedule} editItem={editItem} />
                                :
                                <ScheduledEvents selectedDate={date} eventList={eventlist} deleteSchedule={deleteSchedule} editSchedule={editSchedule} />
                        }
                    </Col>
                </Row>
        
            </div>
        </main>
    )
}

const mapStateToProps = (state: any) => {

    return {
        eventList: state.eventList
    };
}

export default connect(mapStateToProps)(Schedule);
