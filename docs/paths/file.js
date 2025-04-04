const filePaths = {
    "/file": {
        get: {
            summary: "Get all files",
            tags: ["File"],
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: "List of all files",
                },
                404: {
                    description: "Files not found"
                }
            }
        },
        post: {
            summary: "Upload a new file",
            tags: ["File"],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                file: {
                                    type: "string",
                                    format: "binary"
                                },
                                name: {
                                    type: "string",
                                    example: "Medical Report"
                                },
                                appointmentId: {
                                    type: "string",
                                    example: "65f4a1b2c3d4e5f67890abcd"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "File successfully uploaded"
                },
                400: {
                    description: "You did not send file!"
                },
                500: {
                    description: "Internal server error"
                }
            }
        }
    },
    "/file/{id}": {
        delete: {
            summary: "Delete file by ID",
            tags: ["File"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            responses: {
                200: {
                    description: "File successfully deleted"
                },
                404: {
                    description: "File not found"
                },
                500: {
                    description: "Internal server error"
                }
            }
        },
        patch: {
            summary: "Update file details",
            tags: ["File"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string",
                                    example: "Updated File Name"
                                },
                                file: {
                                    type: "string",
                                    format: "binary"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "File successfully updated"
                },
                404: {
                    description: "File not found"
                },
                500: {
                    description: "Internal server error"
                }
            }
        }
    }
};

export default filePaths;
