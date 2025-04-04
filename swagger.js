import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express"
import userSchema from "./docs/schemas/user.js";
import doctorSchema from "./docs/schemas/doctor.js";
import appointmentSchema from "./docs/schemas/appointment.js";
import fileSchema from "./docs/schemas/file.js";
// Swagger Paths
import authPaths from "./docs/paths/auth.js";
import appointmentPaths from "./docs/paths/appointment.js";
import doctorPaths from "./docs/paths/doctor.js";
import filePaths from "./docs/paths/file.js";
import userPaths from "./docs/paths/user.js";

const swaggerDoc = swaggerJSDoc({
    definition:{
        openapi:"3.1.1",
        info:{
            title:"Medical Platform Application",
            version:"1.0.0",
            description:"API List for Simple Medical Platform"

        },
        components:{
            schemas:{
                User: userSchema,
                Doctor: doctorSchema,
                Appointment: appointmentSchema,
    
                File: fileSchema
            },
            securitySchemes:{
                BearerAuth:{
                    type:"http",
                    scheme:"bearer",
                    bearerFormat:"JWT"
                }
            }
        },
        paths:{
            ...authPaths,...appointmentPaths,...filePaths,...userPaths,...doctorPaths
        }
    },
    apis:[]
});
export function setupSwagger(app){
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc))
}