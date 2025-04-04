const fileSchema = {
    type: "object",
    properties: {
        _id: {
            type: "string",
            description: "Unique identifier for the file"
        },
        name: {
            type: "string",
            description: "Name of the uploaded file",
            example: "medical_report.pdf"
        },
        fileUrl: {
            type: "string",
            description: "URL to access the file",
            example: "https://example.com/files/medical_report.pdf"
        }
    },
    required: ["name", "fileUrl"]
};

export default fileSchema