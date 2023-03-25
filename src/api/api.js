import axios from "axios";

export const api = axios.create({
  baseURL: `https://api.device-specs.io/api/`,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "bearer acc98decea1810fb1efce1062671f021bc022e740dfd984db0372cf6bc9fd0d1307d8ac9a09c0c69f8ac69cc53d6210eb03a36d8f5a0258934104b7202920015e3c5b571817684e9e9d704ba3ea5422cfd8fa24523f213172cdeb2c508dc83d710d54c74afc879c3bfbe310057dcd84906f4b738dc320551429fb909b8a51283",
  },
});


export default api;
