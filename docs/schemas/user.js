const userSchema = {
    type: "object",
    properties:{
        _id:{
            type:"string"
        },
         firstName: {
                type: "string",
            },
            lastName: {
                type: "string",
            },
            age: {
                type: "number",
            },
            email:{
                type: "string",
                example:"example@mail.kz"
            },
            password:{
                type: "string",
                description:"Hashed password by bcrypt.js"
            },
            appointments:{
                  type: "array",
                  items:{
                    type:"string",
                    description:"id of appointment"
                  }
                  
            },
            isManager:{
                type:"boolean"
            }
    }
}
export default userSchema