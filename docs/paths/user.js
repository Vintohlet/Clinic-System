const userPaths = {
    "/users": {
        get: {
            summary: "Get all users",
            tags: ["User"],
            security: [{ BearerAuth: [] }],
            responses: {
                200: { description: "Returns a list of users" },
                404: { description: "Users not found" },
                500: { description: "Internal Server Error" },
            },
        },
        post: {
            summary: "Create a new user",
            tags: ["User"],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                firstName: { type: "string" },
                                lastName: { type: "string" },
                                age: { type: "integer" },
                                email: { type: "string", format: "email" },
                                isManager: { type: "boolean" }
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: "User created successfully" },
                500: { description: "Internal Server Error" },
            },
        },
    },
    "/users/me": {
        get: {
            summary: "Get current authenticated user",
            tags: ["User"],
            security: [{ BearerAuth: [] }],
            responses: {
                200: { description: "Returns the current user" },
                500: { description: "Internal Server Error" },
            },
        },
    },
    "/users/{id}": {
        get: {
            summary: "Get a user by ID",
            tags: ["User"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            responses: {
                200: { description: "Returns user data" },
                404: { description: "User not found" },
                500: { description: "Internal Server Error" },
            },
        },
        put: {
            summary: "Update a user by ID",
            tags: ["User"],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                firstName: { type: "string" },
                                lastName: { type: "string" },
                                age: { type: "integer" },
                                email: { type: "string", format: "email" },
                                password: { type: "string" }
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "User updated successfully" },
                404: { description: "User not found" },
                500: { description: "Internal Server Error" },
            },
        },
        delete: {
            summary: "Delete a user by ID",
            tags: ["User"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            responses: {
                200: { description: "User deleted successfully" },
                404: { description: "User not found" },
                500: { description: "Internal Server Error" },
            },
        },
    },
};

export default userPaths;
