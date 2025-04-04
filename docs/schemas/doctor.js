const doctorSchema = {
    type: "object",
    properties:{
        _id:{
            type:"string"
        },
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
export default doctorSchema