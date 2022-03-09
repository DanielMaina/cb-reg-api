import React, { useState } from 'react';
import { useFormContext, useFieldArray } from "react-hook-form";

import { Button } from 'reactstrap';
//import IPageProps from '../../interfaces/page';
import onGoogleCalendarSync from 'components/auth/GoogleCalendar';
import stepperImg from '../../assets/images/stepperImg.png';

interface Props {
  errors: any;
}

const StepFour: React.FC<Props> = ({errors}) => {

  const { register, watch, getValues, getFieldState } = useFormContext();
  const watchChange = watch();

    const [name, setName] = useState<string>('');    
    const [about, setAbout] = useState<string>('');    
    const [location, setLocation] = useState<string>('');

    const syncSocialMedia = () => {
        // sync with google calendar or sth
        onGoogleCalendarSync();
    }

    return (
      <>
        <h2>
            YOU'RE ALMOST DONE!
        </h2>
          <p>
            Welcome to your production calendar.
          </p>
          <div className="img-container d-flex justify-content-center">
            <img className="sync-calendar-illustration" src={stepperImg} aria-hidden alt="Crewbite Home Icon"/>
          </div>
          <p className="mt-4">
            Crewbite calendar helps you to better organise all your production 
            schedules and get hired easily by sharing your availabilities to others.
          </p>
            <div className="btn-container d-flex justify-content-center">
              <Button
                  className="google-sync-btn"
                  onClick={() => syncSocialMedia()}
              >
                  <i className="fab fa-google mr-2"></i> Sync with Google Calendar
              </Button>
            </div>
            <small
                style={{ display:'flex' , alignItems: 'flex-start'}} 
            >
                <p className="mt-4">
                    Connecting your Crewbite account with Google Calendar 
                    will create a seamless scheduling across your accounts.  
                </p>
            </small>
      </>            
    );
}

export default StepFour;
