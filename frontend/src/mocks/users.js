import { mock } from "src/utils/axios";

let users = [
  {
    id: "1",
    name: "Rafael Kunde",
    email: "Monte.Auer31@yahoo.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Madeline Pagac",
    email: "Francis64@gmail.com",
    role: "worker",
  },
  {
    id: "3",
    name: "Okey Turner V",
    email: "Alexys.Frami91@hotmail.com",
    role: "worker",
  },
  {
    id: "4",
    name: "Modesta Sauer",
    email: "Susan_Wolff@hotmail.com",
    role: "admin",
  },
];

mock.onGet("/api/users").reply(() => {
  return [200, { users }];
});

mock.onGet("/api/user").reply((config) => {
  const { userId } = config.params;
  const user = users.find((_user) => _user.id === userId);

  return [200, { user }];
});
