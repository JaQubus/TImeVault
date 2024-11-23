const host = "https://timevault-xokm.onrender.com";

const ApiLinks = {
  snedForm: host + "/send-form",
  register: host + "/login/register",
  login: host + "/login",
} as const;

export default ApiLinks;
