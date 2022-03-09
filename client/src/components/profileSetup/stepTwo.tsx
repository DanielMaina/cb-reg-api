import React, { useEffect, useState } from 'react';
import { useFormContext, useFieldArray } from "react-hook-form";
import { Form, Stack, Button } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';
//import IPageProps from '../../interfaces/page';

interface Props {
    errors: any;
}

const StepTwo: React.FC<Props> = ({errors}) => {

    const { register, watch, getValues } = useFormContext();

    const [rolesCounter, setRolesCounter] = useState<number>(4);

    const [certsCounter, setCertsCounter] = useState<number>(4);

    const {
        fields: rolesFields,
        append: rolesAppend,
        remove: rolesRemove,
        insert: rolesInsert
      } = useFieldArray({ name: "roles" });
      const {
        fields: certsFields,
        append: certsAppend,
        remove: certsRemove,
        insert: certsInsert
      } = useFieldArray({ name: "certifications" });

    useEffect(()=>{
    
        if(certsFields.length === 0) {
            certsAppend({ certification: "" });
        }

        console.log('certs lenght', getValues("certifications").length)
        
    },[getValues("certifications")]);

    useEffect(()=>{
    
        if(rolesFields.length === 0) {
            rolesAppend({ role: "" });
        }

        console.log('roles lenght', getValues("roles").length)
        
    },[getValues("roles")]);

    useEffect(()=>{
        watch();

        // console.log('your roles are ', getValues("roles"));
        // console.log('your certs are ', getValues("certifications"));
        // console.log('you are union worker ', getValues("isUnionWorker"));
        // console.log('your are available to volunteer ', getValues("canVolunteer"));
        // console.log('your are vaccinated ', getValues("isVaccinated"));
    });

    return (
      <>
        <h2>
            {
                getValues("name.first") && getValues("name.first")!==undefined && getValues("name.first")!==null && String(getValues("name.first")).match(/^[a-zA-Z]+$/) ? `Hello, ${getValues("name.first").charAt(0).toUpperCase() + getValues("name.first").slice(1)}!` : 'Hello There!'
            }
        </h2>
          <p>
            Welcome to Crewbite! Let's create your profile page.
          </p>
            <Stack className="input-group form-group">
                <p className="mb-2">Your industry roles (up to 5)<span>*</span></p>
                {
                    rolesFields.map((field: any, index: number)=>{
                        return (
                            <React.Fragment key={field.id}>
                                <Form.Group controlId={`setupRole-${index}`}>
                                <Form.Control
                                    as="textarea"
                                    defaultValue={field.role}
                                    placeholder="Enter a role here"
                                    {...register(`roles[${index}].role`)}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name={`roles[${index}].role`}
                                    render={({ message }) => <p className="error-text">{message}</p>}
                                />
                                </Form.Group>
                                {
                                    getValues("roles") && rolesFields.length>1 ? <Button 
                                        className="del-btn me-auto" 
                                        onClick={()=>{
                                            if(rolesCounter > 0){
                                    
                                                rolesRemove(index);
                                                setRolesCounter(rolesCounter+1);
                                            }
                                        }}>
                                        Delete row
                                    </Button> : ''
                                }
                            </React.Fragment>
                            
                        )
                    })
                }
                
                {errors.roles && rolesCounter === 0 && <p className="error-text">You can only add up to 5 certifications</p>}
                
                <Button 
                    className="add-new-ref-btn ms-auto" 
                    onClick={()=>{
                        
                        if(rolesCounter >= 1){
                            setRolesCounter(rolesCounter-1);
                            rolesAppend({});
                        }
                    }}>
                    + Add a Role
                </Button>
            </Stack> 
            
            <Stack direction='horizontal'>
                <Form.Check
                    type="checkbox"
                    label="I'm a union member*"
                    value={getValues("isUnionWorker")}
                    {...register("isUnionWorker")}
                />
                {' '}
                <ErrorMessage
                    errors={errors}
                    name="isUnionWorker"
                    render={({ message }) => <p className="error-text">{message}</p>}
                />
            </Stack>
            <Stack direction='horizontal'>
                <Form.Check
                    type="checkbox"
                    label="I'm open for volunteer work*"
                    value={getValues("canVolunteer")}
                    {...register("canVolunteer")}
                />
                {' '}
                <ErrorMessage
                    errors={errors}
                    name="canVolunteer"
                    render={({ message }) => <p className="error-text">{message}</p>}
                />
            </Stack>
            <Stack direction='horizontal'>
                <Form.Check
                    type="checkbox"
                    label="I'm COVID-19 vaccinated*"
                    value={getValues("isVaccinated")}
                    {...register("isVaccinated")}
                />
                {' '}
                <ErrorMessage
                    errors={errors}
                    name="isVaccinated"
                    render={({ message }) => <p className="error-text">{message}</p>}
                />
            </Stack>


            <Stack className="input-group form-group">
                <p className="mb-2">List of your certifications (up to 5)</p>
                {
                    certsFields.map((field: any, index: number)=>{
                        return (
                            <React.Fragment key={field.id}>
                                <Form.Group controlId={`setupCertification-${index}`}>
                                <Form.Control
                                    as="textarea"
                                    defaultValue={field.certification}
                                    placeholder="Enter a certification here"
                                    {...register(`certifications[${index}].certification`)}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name={`certifications[${index}].certification`}
                                    render={({ message }) => <p className="error-text">{message}</p>}
                                />
                                </Form.Group>
                                {
                                    getValues("certifications") && certsFields.length>1 ? 
                                    <Button 
                                        className="del-btn me-auto" 
                                        onClick={()=>{
                                            if(certsCounter > 0){
                                    
                                                certsRemove(index);
                                                setCertsCounter(certsCounter+1);
                                            }
                                        }}>
                                        Delete row
                                    </Button> : ''
                                }
                            </React.Fragment>
                            
                        )
                    })
                }
                
                {errors.certifications && certsCounter === 0 && <p className="error-text">You can only add up to 5 certifications</p>}
                
                <Button 
                    className="add-new-ref-btn ms-auto" 
                    onClick={()=>{
                        
                        if(certsCounter >= 1){
                            setCertsCounter(certsCounter-1);
                            certsAppend({});
                        }
                    }}>
                    + Add a Certification
                </Button>
            </Stack>
      </>            
    );
}

export default StepTwo;
