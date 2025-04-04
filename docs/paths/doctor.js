const doctorPaths = {
    "/doctor": {
        post: {
            summary: "Register a new doctor",
            tags: ["Doctor"],
            security: [{ BearerAuth: [] }],
            responses: {
                201: {
                    description: "Doctor successfully created"
                }
            },
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                doctorName: {
                                    type: "string",
                                    example: "Dr. John Doe"
                                },
                                email: {
                                    type: "string",
                                    example: "doctor@example.com"
                                },
                                speciality: {
                                    type: "object",
                                    properties: {
                                        speciality: {
                                            type: "string",
                                            example: "Cardiology"
                                        },
                                        experience: {
                                            type: "integer",
                                            example: 10
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        get: {
            summary: "Get all doctors",
            tags: ["Doctor"],
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: "List of all doctors"
                }
            }
        }
    },
    "/doctor/{id}": {
        get: {
            summary: "Get doctor by ID",
            tags: ["Doctor"],
            security: [{ BearerAuth: [] }],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: {
                    type: "string"
                }
            }],
            responses: {
                200: {
                    description: "Doctor data returned"
                },
                404: {
                    description: "Doctor not found"
                }
            }
        },
        delete: {
            summary: "Delete doctor by ID",
            tags: ["Doctor"],
            security: [{ BearerAuth: [] }],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: {
                    type: "string"
                }
            }],
            responses: {
                200: {
                    description: "Doctor successfully deleted"
                },
                404: {
                    description: "Doctor not found"
                }
            }
        },
        patch: {
            summary: "Update doctor details",
            tags: ["Doctor"],
            security: [{ BearerAuth: [] }],
            parameters: [{
                name: "id",
                in: "path",
                required: true,
                schema: {
                    type: "string"
                }
            }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                doctorName: {
                                    type: "string",
                                    example: "Dr. John Doe"
                                },
                                speciality: {
                                    type: "string",
                                    example: "Neurology"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Doctor successfully updated"
                },
                404: {
                    description: "Doctor not found"
                }
            }
        }
    }
};

export default doctorPaths;
