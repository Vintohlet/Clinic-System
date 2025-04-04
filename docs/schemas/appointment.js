const appointmentSchema = {
    type: "object",
    properties: {
        _id: {
            type: "string",
            description: "Unique identifier for the appointment"
        },
        appointmentTime: {
            type: "string",
            format: "date-time",
            description: "Scheduled time for the appointment",
            example: "2025-04-10T14:30:00Z"
        },
        doctorId: {
            type: "string",
            description: "Reference to the doctor assigned to the appointment"
        },
        patientId: {
            type: "string",
            description: "Reference to the patient attending the appointment"
        },
        appointmentFiles: {
            type: "array",
            description: "List of file IDs related to the appointment",
            items: {
                type: "string"
            },
            example: ["fileId1", "fileId2"]
        }
    },
    required: ["appointmentTime", "doctorId", "patientId"]
};

export default appointmentSchema