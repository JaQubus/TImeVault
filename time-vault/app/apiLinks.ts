const host = "http://localhost:8080";

const ApiLinks = {
  snedForm: host + "/send-form",
  sendEmail: host + "/send-email",
} as const;

export default ApiLinks;
