const appointmentPaths = {
    "/appointment": {
        post: {
            summary: "Create a new appointment",
            tags: ["Appointment"],
            security: [{ BearerAuth: [] }],
            responses: {
                201: {
                    description: "Successfully created an appointment",
                },
                400: {
                    description: "Appointment time is already booked",
                },
                404: {
                    description: "Patient or Doctor not found",
                },
                500: {
                    description: "Internal Server Error",
                },
            },
            security:[
                {
                    BearerAuth:[]
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                appointmentTime: {
                                    type: "string",
                                    format: "date-time",
                                    example: "2025-04-10T14:30:00Z",
                                },
                                doctorId: {
                                    type: "string",
                                    example: "65f9bdf12c5e4a001d2a6a22",
                                },
                                patientId: {
                                    type: "string",
                                    example: "65f9bdf12c5e4a001d2a6b33",
                                },
                            },
                        },
                    },
                },
            },
        },
        get: {
            summary: "Get all appointments",
            tags: ["Appointment"],
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: "Returns a list of appointments",
                },
                404: {
                    description: "No appointments found",
                },
                500: {
                    description: "Internal Server Error",
                },
            },
        },
    },
    "/appointment/{id}": {
        get: {
            summary: "Get an appointment by ID",
            tags: ["Appointment"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Returns the appointment data",
                },
                404: {
                    description: "Appointment not found",
                },
                500: {
                    description: "Internal Server Error",
                },
            },
        },
        delete: {
            summary: "Delete an appointment by ID",
            tags: ["Appointment"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Appointment deleted successfully",
                },
                404: {
                    description: "Appointment not found",
                },
                500: {
                    description: "Internal Server Error",
                },
            },
        },
        patch: {
            summary: "Update an appointment by ID",
            tags: ["Appointment"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                appointmentTime: {
                                    type: "string",
                                    format: "date-time",
                                    example: "2025-04-12T10:00:00Z",
                                },
                                doctorId: {
                                    type: "string",
                                    example: "65f9bdf12c5e4a001d2a6a22",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Appointment updated successfully",
                },
                404: {
                    description: "Appointment not found",
                },
                500: {
                    description: "Internal Server Error",
                },
            },
        },
    },
    "/appointment/patient/{patientId}": {
        get: {
            summary: "Get all appointments for a specific patient",
            tags: ["Appointment"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "patientId",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Returns a list of appointments for the patient",
                },
                404: {
                    description: "No appointments found for this patient",
                },
                500: {
                    description: "Internal Server Error",
                },
            },
        },
    },
    "/appointment/doctor/{doctorId}": {
        get: {
            summary: "Get all appointments for a specific doctor",
            tags: ["Appointment"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "doctorId",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Returns a list of appointments for the doctor",
                },
                404: {
                    description: "No appointments found for this doctor",
                },
                500: {
                    description: "Internal Server Error",
                },
            },
        },
    },
};

export default appointmentPaths;