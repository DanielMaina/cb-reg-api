import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Container, Button, ButtonToolbar, Form } from 'react-bootstrap';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
import StepOne from '../../components/profileSetup/stepOne';
import StepTwo from '../../components/profileSetup/stepTwo';
import StepThree from '../../components/profileSetup/stepThree';
import StepFour from '../../components/profileSetup/stepFour';

import IPageProps from '../../interfaces/page';
//import StepIcon from '../../components/stepIcon/StepIcon';


const AccountSetupPage: React.FC<IPageProps> = props => {  

  const schema = yup.object({
    name: yup.string()
            .required()
            .max(20),
    location: yup.string()
                .required(),
    about: yup.string()
                .notRequired()
                .max(5000),
    references: yup.array()
                  .of(
                    yup.object().shape({
                      name: yup.string()
                              .required("Please provide a name")
                              .max(20, "Character limit is 20"),
                      role: yup.string()
                              .required("Please specify the role")
                              .max(20, "Character limit is 20")
                    })
                  )
                  .required()
                  .max(7),
    roles: yup.string()
            .required()
            .max(100),
    isUnionWorker: yup.boolean()
                    .required(),
    canVolunteer: yup.boolean()
                    .required(),
    isVaccinated: yup.boolean()
                    .required(),
    certifications: yup.string()
                      .notRequired()
                      .max(500),
    linkToReel: yup.string()
                  // .matches(/^(http:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, "Please enter a valid URL")
                  .notRequired(),
    linkToPortfolio: yup.string()
                      // .matches(/^(http:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, "Please enter a valid URL")
                      .notRequired(),
    portfolioUpload: yup.mixed()
                      .notRequired(),
    // .test("linkToPortfolio", "The file must be PDF", (value)=>{
                      //   if(value[0]){
                      //     return value && value[0].type === "pdf";
                      //   }
                      // }),
    linkToIMDB: yup.string()
                  // .matches(/^(http:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, "Please enter a valid URL")
                  .notRequired(),
    linkToInstagram: yup.string()
                      // .matches(/^(http:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, "Please enter a valid URL")
                      .notRequired(),
    //google cred
  });
  

  //const [name, setName] = useState<string>('');

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(schema)
  });

  const { handleSubmit, trigger, formState: { errors, isValid } } = methods;

  const steps = ['First', 'Second', 'Third', 'Fourth'];

  function getStepContent(step: number) {
      switch (step) {
          case 0:
            return <StepOne errors={errors} />;
          case 1:
            return <StepTwo errors={errors} />;
          case 2:
            return <StepThree errors={errors} />;
          case 3:
            return <StepFour errors={errors} />  
          default:
            return "Unknown step";
        }
  }

    const onSubmit = data => console.log(data);

    const navigate = useNavigate();
    //Stepper
    const [activeStep, setActiveStep] = useState(0);

    const [showProceed, setShowProceed] = useState(false);
  
    const handleNext = async () => {

      let canProceed = false;

      switch (activeStep) {
        case 0:
          canProceed = await trigger([
            "name", 
            "location",
            "about",
            "references"
          ], {shouldFocus:true});
          break;
        case 1:
          canProceed = await trigger([
            "roles", 
            "isUnionWorker",
            "canVolunteer",
            "isVaccinated",
            "certifications"
          ], {shouldFocus:true});
          break;
        case 2:
          canProceed = await trigger([
            "linkToReel", 
            "linkToPortfolio",
            "linkToIMDB",
            "linkToInstagram"
          ], {shouldFocus:true});
          break;
        default:
          break;
      }

      if(canProceed) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } 

    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    const membershipChange = () => { 
        navigate('/membership');
    }

    async function validateForm() {

        let canProceed = false;
  
        switch (activeStep) {
          case 0:
            canProceed = await trigger([
              "name", 
              "location",
              "about",
              "references"
            ]);
            break;
          case 1:
            canProceed = await trigger([
              "roles", 
              "isUnionWorker",
              "canVolunteer",
              "isVaccinated",
              "certifications"
            ]);
            break;
          case 2:
            canProceed = await trigger([
              "linkToReel", 
              "linkToPortfolio",
              "linkToIMDB",
              "linkToInstagram"
            ]);
            break;
          default:
            break;
        }
  
        if(canProceed) {
          setShowProceed(true);
        } 
    }

    // useEffect(()=>{
      
    //   validateForm();

    // },[errors]);

    return (
      <Container as="main" className="account-setup-page">
        <Row as="section" className="d-flex justify-content-center">
          <Card>
            
            <Stepper activeStep={activeStep} className="px-4">
              {steps.map((step:string, index:number) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                return (
                  <Step
                    key={step}
                    {...stepProps}
                    className={activeStep===index ? 'active-step':''}
                    >
                    <StepLabel {...labelProps}></StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Card.Body className="mx-4 my-4 mt-2">
            {activeStep === steps.length ? (
              <>
                <h2>
                  All steps completed, become a member!
                </h2>
                <Button
                  onClick={() => membershipChange()}
                  >
                      Membership
                </Button>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    onClick={handleReset}
                    >
                      Reset
                    </Button>
                </Box>
              </>
            ) : (
              <>
                <FormProvider { ...methods }>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`step-screen-${activeStep+1}`}>
                    
                     {getStepContent(activeStep)}

                   </div>
                  
                  <ButtonToolbar className="d-flex justify-content-between mt-5">
                    <Button
                      className={activeStep === 0 ? 'hide-elem back-btn' : 'back-btn'}
                      onClick={activeStep === 0 ? ()=>{} : handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      className="next-btn"
                      onClick={handleNext}
                      type={activeStep === steps.length - 1 ? 'submit' : 'button'}
                      >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </ButtonToolbar>
                  </Form>
                </FormProvider>
              </>
            )}
            </Card.Body>
            
          </Card>
        </Row>
            
        
      </Container>
    );
}

export default AccountSetupPage;
