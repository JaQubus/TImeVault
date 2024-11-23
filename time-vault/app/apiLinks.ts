const host = "http://localhost:8080";

const ApiLinks = {
  snedForm: host + "/send-form",
  sendEmail: host + "/send-email",
  addFormFields: host + "/add-form-fields",
} as const;

export default ApiLinks;
