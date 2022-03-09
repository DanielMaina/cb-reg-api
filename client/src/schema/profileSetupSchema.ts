import * as yup from 'yup';

const profileSetupSchema = yup.object().shape({
    // name2: yup.string()
    //         .required("Please provide your first name")
    //         .min(1, "Please provide your first name")
    //         .max(20, "Character limit is 20")
    //         .trim()
    //         .matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Name must be letters (A-Z)"),

    name: yup.object().shape({
            first: yup.string()
              .required("Please provide your first name")
              .max(20, "Character limit is 20")
              .trim()
              .matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Name must be letters (A-Z)"),
            last: yup.string()
              .required("Please provide your last name")
              .max(20, "Character limit is 20")
              .trim()
              .matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Name must be letters (A-Z)"),
        }),
    location: yup.string()
                .required("Please provide your location")
                .trim()
                .matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Location must be letters (A-Z)"),
    about: yup.string()
                .notRequired()
                // .max(2000, "Character limit is 100000")
                .trim()
                .matches(/^(?:\s*\S+(?:\s+\S+){0,499})?\s*$/, "Please keep it less than 500 words"),
    references: yup.array()
                  .of(
                    yup.object().shape({
                      name: yup.string()
                              .required("Please provide the reference name")
                              .min(1, "Field cannot be empty")
                              .max(20, "Character limit is 20")
                              .trim()
                              .matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Name must be letters (A-Z)"),
                      role: yup.string()
                              .required("Please specify the reference role")
                              .min(1, "Field cannot be empty")
                              .max(20, "Character limit is 20")
                              .trim()
                              .matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Role must be letters (A-Z)")
                    })
                  )
                  .required()
                  .max(7),
    roles: yup.array()
                .of(
                    yup.object().shape({
                    role: yup.string()
                            .notRequired()
                            .min(1, "Field cannot be empty")
                            .max(20, "Character limit is 20"),
                    })
                
                )
                .notRequired()
                .max(4, "You can only add up to 5 roles"),
    isUnionWorker: yup.boolean()
                    .required(),
    canVolunteer: yup.boolean()
                    .required(),
    isVaccinated: yup.boolean()
                    .required(),
    certifications: yup.array()
                    .of(
                        yup.object().shape({
                           certification: yup.string()
                                            .notRequired()
                                            .min(1, "Field cannot be empty")
                                            .max(20, "Character limit is 20"),
                        })
                    )
                    .notRequired()
                    .max(4, "You can only add up to 5 certifications"),
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

  export default profileSetupSchema;