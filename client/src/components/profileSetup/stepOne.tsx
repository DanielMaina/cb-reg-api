import React, { useState, useEffect } from 'react';
import { Form, FloatingLabel, Stack, Button } from 'react-bootstrap';
import { useForm, useFormContext, useFieldArray } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
//import IPageProps from '../../interfaces/page';

interface Props {
    errors: any;
}

//type PropsAll = Props | IPageProps;

const StepOne: React.FC<Props> = ({errors})  => {

    const { register, watch, getValues } = useFormContext();

    const { fields, append, remove} = useFieldArray({
        name: "references"
      });
    
    // setCityOptions is to be set with data fetch from database of all available cities or from an API service with useEffect on requested data change
    const [cityOptions, setCityOptions] = useState<string[]>([
        "Select your location",
        "Vancouver",
        "Toronto",
        "Montreal"
    ]);

    const [counter, setCounter] = useState<number>(7);

    useEffect(()=>{
        
        if(fields.length === 0) {
            append({ name: "", role: "" });
        }

    },[getValues("references")]);

    useEffect(()=>{
        watch();
        // console.log('your name is ', getValues("name"));
        // console.log('your about is ', getValues("about") );
        // console.log('your location is ', getValues("location"));
        // console.log('references array is ', getValues("references"));
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
                <p className="mb-2">What's your name?<span>*</span></p>
                
                <Stack direction="horizontal" gap={3}>
                    
                    <FloatingLabel 
                        controlId="setupFirstname"
                        label="First Name">
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            defaultValue={getValues("name.first")}
                            {...register("name.first")}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="name.first"
                            render={({ message }) => <p className="error-text">{message}</p>}
                        />
                    </FloatingLabel>
                    <FloatingLabel 
                        controlId="setupLastname"
                        label="Last Name">
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                defaultValue={getValues("name.last")}
                                {...register("name.last")}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="name.last"
                                render={({ message }) => <p className="error-text">{message}</p>}
                            />
                    </FloatingLabel>
                </Stack>
            </Stack>

            <Form.Group controlId="setupPosition" className="form-group">
                <Form.Label>
                    Where are you located?<span>*</span>
                </Form.Label>
                <Form.Select
                    placeholder="Select from the locations below..."
                    value={getValues("location")||cityOptions[0]}
                    {...register("location")}
                >
                    {
                        cityOptions.map((city:string)=>{
                            return (
                                <option key={city} value={city==="Select your location"?"":city}>
                                    {city}
                                </option>
                            )
                        })
                    }
                </Form.Select>
                <ErrorMessage
                    errors={errors}
                    name="location"
                    render={({ message }) => <p className="error-text">{message}</p>}
                />
            </Form.Group>
            <Form.Group controlId="setupAbout" className="form-group">
            <Form.Label>Tell us about you</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Maximum 500 words"
                    value={getValues("about")||""}
                    {...register("about")}
                />
                <Stack direction="horizontal">
                    <ErrorMessage
                        errors={errors}
                        name="about"
                        render={({ message }) => <p className="error-text">{message}</p>}
                    />
                    <p className="ms-auto mt-2">{getValues("about") !== undefined && getValues("about") !== null && 500 - getValues("about").split(/[^<>%$]\S+/g).length > 0 ? 500 - getValues("about").split(/[^<>%$]\S+/g).length + 1 : 0} / 500 words left</p>
                </Stack>
            </Form.Group>
            {/* <ErrorText error={error} /> */}
            <Stack className="input-group form-group">
                <p className="mb-2">Who have you worked with in the past 6 months?<span>*</span></p>
                {

                    fields.map((field: any, index: number)=>{
                        return (
                            <React.Fragment key={field.id}>
                                <Stack direction="horizontal" gap={3}>
                                    <FloatingLabel 
                                        controlId={`setupRefName-${index}`}
                                        label="Reference Name">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter reference's name"
                                                defaultValue={field.name}
                                                {...register(`references[${index}].name`)}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name={`references[${index}].name`}
                                                render={({ message }) => <p className="error-text">{message}</p>}
                                            />
                                    </FloatingLabel>
                                    <FloatingLabel 
                                        controlId={`setupRefRole-${index}`}
                                        label="Role">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter reference's role"
                                                defaultValue={field.role}
                                                {...register(`references[${index}].role`)}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name={`references[${index}].role`}
                                                render={({ message }) => <p className="error-text">{message}</p>}
                                            />
                                    </FloatingLabel>
                                </Stack>
                                {
                                    getValues("references") && fields.length>1 ? 
                                    <Button 
                                        className="del-btn me-auto" 
                                        onClick={()=>{
                                            if(counter > 0){
                                    
                                                remove(index);
                                                setCounter(counter+1);
                                            }
                                        }}>
                                        Delete row
                                    </Button> : ''
                                }
                            </React.Fragment>
                            
                        )
                    })
                }
                
                {errors.references && counter===0 && <p className="error-text">Only 8 references are allowed</p>}
                
                <Button 
                    className="add-new-ref-btn ms-auto" 
                    onClick={()=>{
                        if(counter > 0){
                            setCounter(counter-1);
                            append({});
                        }
                    }}>
                    + Add New Row
                </Button>
            </Stack>
      </>            
    );
}

export default StepOne;
