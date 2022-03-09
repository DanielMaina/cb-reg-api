import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack } from 'react-bootstrap';
import { Form, Input, Button, DatePicker, TimePicker, Space, Select } from 'antd';
import { EditOutlined, EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined, PhoneOutlined, FormOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { useForm, SubmitHandler } from "react-hook-form";
import { ISchedule } from '../../interfaces/schedule';
import IContact from '../../interfaces/contact';
import store from '../../redux/store';
import { addEvent } from '../../redux/calendarData/actions';


const { RangePicker } = DatePicker;

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
        string: '${label} is not a valid phone number!'
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const dateConfig = {
    rules: [{ type: 'object' as const, required: true, message: 'Please select a date!' }],
};
const timeConfig = {
    rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
};
const locationConfig = {
    rules: [{ type: 'string' as const, required: false, message: 'Please input location!' }],
};


interface Props {
    selectedDate: any;
    // saveSchedule: (e: React.FormEvent) => void;
    onSwitchEditMode: any;
    addSchedule: any;
    editItem: any;
}


const ScheduleEventForm: React.FC<Props> = ({ selectedDate, onSwitchEditMode, addSchedule, editItem }) => {



    const onDateFromChange = (date: unknown, dateString: string) => {
        console.log('date from ', dateString);
        setDateFrom(dateString);
    }

    const onDateToChange = (date: unknown, dateString: string) => {
        console.log('date to ', dateString);
        setDateTo(dateString);
    }

    const onTimeFromChange = (time: unknown, timeString: string) => {
        console.log('time from ', timeString);
        setTimeFrom(timeString);
    }

    const onTimeToChange = (time: unknown, timeString: string) => {
        console.log('time to ', timeString);
        setTimeTo(timeString);
    }


    const [ id, setId ] = useState<number>(editItem.id);
    const [ title, setTitle] = useState<string>(editItem.title);
    const [ timeFrom, setTimeFrom ] = useState<string>(editItem.timeFrom);
    const [ timeTo, setTimeTo ] = useState<string>(editItem.timeTo);
    const [ dateFrom, setDateFrom ] = useState<string>(editItem.dateFrom);
    const [ dateTo, setDateTo ] = useState<string>(editItem.dateTo);
    const [ location, setLocation ] = useState<string>(editItem.location);
    const [ notes, setNotes ] = useState<string>(editItem.notes);
    const [contacts, setContacts] = useState<any>(editItem.contacts);
    const [contactCounter, setContactCounter] = useState<number>(editItem.contacts.length);

    

    const onFormSubmit = (values: any) => {
        //console.log('submitted data is', values);
        // store.dispatch(
        //     addEvent(
        //         values.title,
        //         values.dateFrom._d,
        //         values.dateTo._d,
        //         values.timeFrom._d,
        //         values.timeTo._d,
        //         values.location,
        //         values.contact,
        //         values.notes
        //     )
        // );


        

        const newSchedule = {
            id: id,
            title: title,
            dateFrom: dateFrom,
            dateTo: dateTo,
            timeFrom: timeFrom,
            timeTo: timeTo,
            location: location,
            contacts: contacts,
            notes: notes
        }


        addSchedule(newSchedule);


        // store.dispatch(
        //     addEvent(
        //         {title,
        //         dateFrom,
        //         dateTo,
        //         timeFrom,
        //         timeTo,
        //         location,
        //         contacts,
        //         notes}
        //     )
        // );

        // const event = {
        //     title: values.title,
        //     dateFrom: values.dateFrom._d,
        //     dateTo: values.dateTo._d,
        //     timeFrom: values.timeFrom._d,
        //     timeTo: values.timeTo._d,
        //     location: values.location,
        //     contact: values.contact,
        //     notes: values.notes
        // }

        // axios.post('/schedule', event)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => {
        //         console.log('error is ', err.request);
        //     });

        onSwitchEditMode();
        //console.log('curr store state is ', store.getState());
    };



    

    const addNewContact = (): void => {
        
        setContactCounter(contacts.length);
        
        setContacts([
            ...contacts,
            {
                id: contactCounter,
                name: "",
                phone: "",
                email: ""
            }
        ]);

        
    }

    const onContactNameChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {

        //event.preventDefault();

        var updatedContact = contacts.map(contact=>{

            if(contact.id === index) {

                contact.name = event.target.value;
               
            }

            return contact;
        });

        setContacts(updatedContact);
    }

    const onContactPhoneChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {

        //event.preventDefault();

        var updatedContact = contacts.map(contact=>{

            if(contact.id === index) {

                contact.phone = event.target.value;
               
            }

            return contact;
        });

        setContacts(updatedContact);
    }

    const onContactEmailChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {

        //event.preventDefault();

        var updatedContact = contacts.map(contact=>{

            if(contact.id === index) {

                contact.email = event.target.value;
               
            }

            return contact;
        });

        setContacts(updatedContact);
    }

    const onClearForm = () =>  {
        setTitle('');
        setDateFrom('');
        setDateTo('');
        setTimeFrom('');
        setTimeTo('');
        setLocation('');
        setContacts([
            {
                id: 0,
                name: "",
                phone: "",
                email: ""
            }
        ]);
        setNotes('');
    }

    useEffect(()=>{


        console.log('item being edited is ', editItem.title);




        setContactCounter(editItem.contacts.length>0?editItem.contacts.length:0);

        // setId(editItem.id);
        console.log('id is set to: ', id);
        // setTitle(editItem.title);
        console.log('title is set to: ', title);
        // setDateFrom(editItem.dateFrom);
        console.log('dateFrom is set to: ', dateFrom);
        // setDateTo(editItem.dateTo);
        console.log('dateTo is set to: ', dateTo);
        // setTimeFrom(editItem.timeFrom);
        console.log('timeFrom is set to: ', timeFrom);
        // setTimeTo(editItem.timeTo);
        console.log('timeTo is set to: ', timeTo);
        // setLocation(editItem.location);
        console.log('location is set to: ', location);
        // setContacts(editItem.contacts);
        console.log('contacts is set to: ', contacts);
        // setNotes(editItem.notes);
        console.log('notes is set to: ', notes);

        
    });

    return (
        <>
            <Form className="schedule-event-form" name="nest-messages" onFinish={onFormSubmit} validateMessages={validateMessages}>
                <div className="form-affix-top">{selectedDate.toDateString()}</div>
                <Form.Item
                    label={<EditOutlined />}
                    name="title"
                    rules={[{ required: true, message: 'Please input event name!' }]}
                >
                    <Input 
                        placeholder={title ? title : "Production title"}
                        onChange={(event)=>setTitle(event.target.value)}
                        value={title}
                    />
                </Form.Item>

                <Form.Item className="form-item-group" label={<CalendarOutlined />} {...dateConfig}>
                    <Form.Item
                        name="dateFrom"
                        noStyle
                    >
                        <DatePicker 
                            format="DD-MMM-YY" 
                            onChange={onDateFromChange} 
                            placeholder={dateFrom ? dateFrom : 'dd-mmm-yy'}
                            suffixIcon />
                    </Form.Item>
                    <p className="ant-form-text">to</p>
                    <Form.Item
                        name="dateTo"
                        noStyle
                    >
                        <DatePicker 
                            format="DD-MMM-YY" 
                            onChange={onDateToChange} 
                            placeholder={dateTo ? dateTo : 'dd-mmm-yy'}
                            suffixIcon />
                    </Form.Item>
                </Form.Item>

                <Form.Item className="form-item-group" label={<ClockCircleOutlined />} {...timeConfig} >
                    <Form.Item
                        name="timeFrom"
                        noStyle
                    >
                        <TimePicker
                            use12Hours
                            format="h:mm a"
                            onChange={onTimeFromChange}
                            placeholder={timeFrom ? timeFrom : "Start time"}
                            suffixIcon
                        />
                    </Form.Item>
                    <p className="ant-form-text">to</p>
                    <Form.Item
                        name="timeTo"
                        noStyle
                    >
                        <TimePicker
                            use12Hours
                            format="h:mm a"
                            onChange={onTimeToChange}
                            placeholder={timeTo ? timeTo : "End time"}
                            suffixIcon
                        />
                    </Form.Item>
                </Form.Item>

                <Form.Item
                    name="location"
                    label={<EnvironmentOutlined />}
                    {...locationConfig}
                >
                    <Input 
                        placeholder={location ? location : "Type location or point on map"} 
                        onChange={(event)=>setLocation(event.target.value)}
                        value={location}
                    />
                </Form.Item>


                <Form.Item className="form-item-group contact-group" label={<PhoneOutlined />}>
                    {
                        contacts?.map((contact, index: number)=>{
                            return (
                                <Stack key={index}>
                                    <Form.Item
                                        name={[`contact-${index}`, 'name']}
                                        rules={[{ required: true }]}
                                    >
                                        <Input 
                                            placeholder={contact.name ? contact.name : 'Name of the contact person'}
                                            onChange={onContactNameChange(index)}
                                            value={contact.name}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={[`contact-${index}`, 'phone']}
                                        rules={[{ type: 'string' }]}
                                    >
                                        <Input 
                                            placeholder={contact.phone ? contact.phone : 'Phone number'} 
                                            onChange={onContactPhoneChange(index)}
                                            value={contact.phone}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={[`contact-${index}`, 'email']}
                                        rules={[{ type: 'email' }]}
                                    >
                                        <Input 
                                            placeholder={contact.email ? contact.email : 'Email'} 
                                            onChange={onContactEmailChange(index)}
                                            value={contact.email}
                                        />
                                    </Form.Item>
                                </Stack>
                            )
                            
                        })
                    }
                    
                    <div className="d-flex justify-content-between">
                        <Button 
                            className="add-more-contact-btn"
                            onClick={addNewContact}>
                            + add contact
                        </Button>
                        {/* <Button>
                            <div>icon</div>
                            Contact Book 
                        </Button> */}
                    </div>
                </Form.Item>

                <Form.Item
                    name="notes"
                    label={<FormOutlined />}
                >
                    <Input.TextArea 
                        placeholder={notes ? notes : "Write your notes here"}
                        onChange={(event)=>setNotes(event.target.value)}
                        value={notes} 
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={onClearForm}>
                        Clear
                    </Button>
                    <Button type="primary" htmlType="submit" onSubmit={onFormSubmit}>
                        Save
                    </Button>
                </Form.Item>

            </Form>

        </>
    );
}

// Title: text
// Date: date picker from to
// Time: time picker from to
// Location: text; to integrate Google Map
// Contact Info:
// Name: text
// Phone: text*
// Email: text*
// $add more contact // choose from phonebook
// Message: textarea
// $Clear btn // $Save btn

export default ScheduleEventForm