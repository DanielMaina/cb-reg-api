import React, { useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { Form, Stack } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
//import IPageProps from '../../interfaces/page';

interface Props {
  errors: any;
}

const StepThree: React.FC<Props> = ({errors}) => {

  const { register, watch, getValues } = useFormContext();
  
    const UploadFile = styled('input')({
      display: 'none',
    });

    useEffect(()=>{
      watch();

      var inputs = document.querySelectorAll('.form-control');
      inputs.forEach((input: any)=>{
        input.addEventListener('focus', ()=>{
          if(input.value==='') {
            input.value='http://';
          }
        })
      })

      // console.log('demo is ', getValues("linkToReel"));
      // console.log('portfolio is ', getValues("linkToPortfolio"));
      // console.log('IMDB is ', getValues("linkToIMDB"));
      // console.log('social is ', getValues("linkToInstagram"));
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
          
            <Form.Group controlId="setupReel">
              <Form.Label>Link to your demo reel</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Vimeo, YouTube, etc"
                  defaultValue={getValues("linkToReel")}
                  {...register("linkToReel")}
              />
            </Form.Group>
            
          <div className="input-group upload-portfolio d-flex align-items-end gap-3">
            <Form.Group controlId="setupPortfolio" className="flex-grow-1">
              <Form.Label>Link to your portfolio or upload file</Form.Label>
              <Form.Control
                  type='text'
                  placeholder="http://"
                  defaultValue={getValues("linkToPortfolio")} 
                  {...register("linkToPortfolio")}   
              />
            </Form.Group>
              <div className="upload-btn-container">
                <label htmlFor="contained-button-file">
                  <UploadFile accept="image/*" id="contained-button-file" className="upload-btn" multiple type="file" {...register("portfolioUpload")} />
                  <Button variant="contained" component="span">
                    Browse...
                  </Button>
                </label>
              </div>
          </div>

          <Form.Group controlId="setupIMDB">
            <Form.Label>Link to your IMDB profile</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="http://"
                  defaultValue={getValues("linkToIMDB")} 
                  {...register("linkToIMDB")}
              />
          </Form.Group>
            <Form.Group controlId="setupInstagram">
              <Form.Label>Link to your Instagram account</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="http://"
                  defaultValue={getValues("linkToInstagram")} 
                  {...register("linkToInstagram")} 
              />
            </Form.Group>
            {/* <ErrorText error={error} /> */}
      </>            
    );
}

export default StepThree;
