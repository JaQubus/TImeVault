const host = "https://timevault-xokm.onrender.com";

const ApiLinks = {
  snedForm: host + "/send-form",
  register: host + "/login/register",
  login: host + "/login",
  sendCapsule: host + "/send_message",
} as const;

export default ApiLinks;
