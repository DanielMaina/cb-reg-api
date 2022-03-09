import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Accordion, Stack, Button } from 'react-bootstrap';
import store from '../../redux/store';
import { ISchedule } from '../../interfaces/schedule';
// Icons
import clockIcon from '../../assets/icons/clock.svg';
import locationIcon from '../../assets/icons/location.svg';
import phoneIcon from '../../assets/icons/telephone.svg';
import notesIcon from '../../assets/icons/file-earmark-text.svg';
import trashIcon from '../../assets/icons/trash.svg';
import editIcon from  '../../assets/icons/pencil.svg';

interface Props {
    selectedDate: Date;
    eventList: ISchedule[];
    deleteSchedule: any;
    editSchedule: any;
}

const ScheduledEvents: React.FC<Props> = ({selectedDate, eventList, deleteSchedule, editSchedule })=> {


    // useEffect(()=>{
    //     // const unsubscribe = store.subscribe(()=>{

    //     //     console.log('connected to store');
    //     //     setEventlist(store.getState().eventList);
    //     // });

    //     // unsubscribe();
        
    // });

    //type State = ReturnType<typeof calendarReducer>;

    // const schedule = useSelector((state: State) => state.eventList);

    return (

        <Accordion defaultActiveKey={['0']} className="scheduled-events" alwaysOpen>
            {
                eventList?.map((scheduledEvent, index:number) =>
                    <Accordion.Item eventKey={index.toString()}
                        key={(scheduledEvent.id).toString() + scheduledEvent.title}
                    >
                        <Accordion.Header>
                            <span>{scheduledEvent.dateFrom.replace(new RegExp('-', 'g'),' ')}</span>
                            <span>{scheduledEvent.title}</span>
                            <Stack as="span" direction="horizontal">
                                <div data-event={scheduledEvent.id} onClick={editSchedule} role="button">
                                    <img src={editIcon} alt="edit icon" data-event={index} />
                                </div>
                                <div data-event={scheduledEvent.id} onClick={deleteSchedule} role="button">
                                    <img src={trashIcon} alt="edit icon" data-event={index} />
                                </div>
                            </Stack>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Stack>
                                {
                                    scheduledEvent.timeFrom !== '' ? 
                                    <>
                                        <Stack direction="horizontal">
                                            <img src={clockIcon} alt="clock icon" />
                                            <div>
                                                {scheduledEvent.timeFrom} to {scheduledEvent.timeTo}
                                            </div>
                                        </Stack>
                                        <Divider />
                                    </> : ''
                                }
                                
                                {
                                    scheduledEvent.location !== '' ?
                                    <>
                                        <Stack direction="horizontal">
                                        <img src={locationIcon} alt="location icon" />
                                        <div>
                                            {scheduledEvent.location}
                                        </div>
                                        </Stack>
                                        <Divider></Divider>
                                    </> : ''
                                }
                                
                                <Stack direction="horizontal">
                                    <img src={phoneIcon} alt="phone icon" />
                                    <ul>
                                        {
                                            scheduledEvent.contacts?.map((contact, index)=>
                                                <Stack as="li" key={index}>
                                                    <span>{contact.name}</span>
                                                    <span>{contact.phone}</span>
                                                </Stack>
                                            )
                                        }
                                    </ul>
                                </Stack>
                                <Divider></Divider>
                                {
                                    scheduledEvent.notes !== '' ? 
                                    <Stack direction="horizontal">
                                        <img src={notesIcon} alt="notes icon" />
                                        <div>
                                            {scheduledEvent.notes}
                                        </div>
                                    </Stack> : ''
                                }
                                
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                )
            }
        </Accordion>
    )
}


export default ScheduledEvents;
