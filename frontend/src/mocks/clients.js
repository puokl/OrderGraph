import { mock } from "src/utils/axios";

let clients = [
  {
    id: "1",
    clientName: "Rafael Kunde",
    phone: "123",
    email: "Monte.Auer31@yahoo.com",
    billingAddress: {
      street: "Street",
      postCode: "12345",
      city: "Berlin",
      country: "Germany",
    },
    shippingAddress: {
      street: "Street",
      postCode: "12345",
      city: "Berlin",
      country: "Germany",
    },
    clientType: "Person",
    contactPersonName: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    contactPersonBillingAddress: {},
    Orders: [
      { status: "active" },
      { status: "finished" },
      { status: "upcoming" },
      { status: "active" },
      { status: "finished" },
    ],
  },
  {
    id: "2",
    clientName: "New User",
    phone: "123",
    email: "Monte.Auer31@yahoo.com",
    billingAddress: {
      street: "Street",
      postCode: "12345",
      city: "Berlin",
      country: "Germany",
    },
    shippingAddress: {
      street: "Street",
      postCode: "12345",
      city: "Berlin",
      country: "Germany",
    },
    clientType: "Company",
    contactPersonName: "Paula",
    contactPersonPhone: "019385",
    contactPersonEmail: "paula@company.com",
    contactPersonBillingAddress: {
      street: "Street",
      postCode: "12345",
      city: "Berlin",
      country: "Germany",
    },
    Orders: [
      { status: "active" },
      { status: "finished" },
      { status: "upcoming" },
      { status: "active" },
      { status: "finished" },
    ],
  },
  {
    id: "3",
    clientName: "Another User",
    phone: "123",
    email: "test@yahoo.com",
    billingAddress: {
      street: "Street",
      postCode: "12345",
      city: "Berlin",
      country: "Germany",
    },
    shippingAddress: {
      street: "Street",
      postCode: "12345",
      city: "Berlin",
      country: "Germany",
    },
    clientType: "Company",
    contactPersonName: "Paula",
    contactPersonPhone: "019385",
    contactPersonEmail: "paula@company.com",
    contactPersonBillingAddress: {
      street: "Street",
      postCode: "12345",
      city: "Berlin",
      country: "Germany",
    },
    Orders: [
      { status: "active" },
      { status: "finished" },
      { status: "upcoming" },
      { status: "active" },
      { status: "finished" },
    ],
  },
  {
    id: "3",
    clientName: "Another Another",
    phone: "123",
    email: "test2@yahoo.com",
    billingAddress: {
      street: "Street",
      postCode: "12345",
      city: "Berlin",
      country: "Germany",
    },
    shippingAddress: {
      street: "Street",
      postCode: "12345",
      city: "Berlin",
      country: "Germany",
    },
    clientType: "Company",
    contactPersonName: "Paula",
    contactPersonPhone: "019385",
    contactPersonEmail: "paula@company.com",
    contactPersonBillingAddress: {
      street: "Street",
      postCode: "12345",
      city: "Berlin",
      country: "Germany",
    },
    Orders: [
      { status: "active" },
      { status: "finished" },
      { status: "upcoming" },
      { status: "active" },
      { status: "finished" },
    ],
  },
];

mock.onGet("/api/clients").reply(() => {
  return [200, { clients }];
});

mock.onGet("/api/client").reply((config) => {
  const { clientID } = config.params;
  const client = clients.find((_client) => _client.id === clientID);

  return [200, { client }];
});
