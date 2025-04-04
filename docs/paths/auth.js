const authPaths = {
    "/auth/register/user":{
        post:{
            summary: "New user registration",
            tags:["Auth"],
            response:{
                201:{
                    description:"This route return new user data"
                }
            },
            requestBody:{
                required: true,
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                firstName: {
                                    type: "string",
                                    example:"Tom"
                                },
                                lastName: {
                                    type: "string",
                                     example:"Ford"
                                },
                                age: {
                                    type: "number",
                                    example: 12
                                },
                                email:{
                                    type: "string",
                                    example:"example@mail.kz"
                                },
                                password:{
                                    type: "string",
                                    description:"Hashed password by bcrypt.js"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/auth/register/doctor":{
        post:{
            summary: "New doctor registration",
            tags:["Auth"],
            response:{
                201:{
                    description:"This route return new user data"
                }
            },
            security:[
                {
                    BearerAuth:[]
                }
            ],
            requestBody:{
                required: true,
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                doctorName: {
                                    type: "string",
                               
                                },
                                email:{
                                    type:"string",
                                    example:"example@mail.kz",
                                     description:"Hashed password by bcrypt.js"
                                },
                                speciality: {
                                    type: "object",
                                    properties: {
                                        speciality: {
                                            type: "string",
                                            
                                            example: "Кардиолог"
                                        },
                                        experience: {
                                            type: "integer",
                                
                                            example: 10
                                        }
                                    },
                                password:{
                                    type: "string",
                                }
                                 
                            }
                        }
                    }
                }
            }
        }
    }
},
"/auth/login":{
    post:{
        summary: "Login User",
        tags:["Auth"],
        response:{
            200:{
                description:"This route return JWT"
            }
        },
        requestBody:{
            required: true,
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        properties:{
                            email:{
                                type: "string",
                                example:"example@mail.kz"
                            },
                            password:{
                                type: "string",
                                example:"P@rolotuser12",
                                description:"Hashed password by bcrypt.js"
                            }
                        }
                    }
                }
            }
        }
    }
}
}
export default authPaths