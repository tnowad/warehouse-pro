import { TokenSchema } from "@/lib/schemas/token.schema";
import { UserSchema } from "@/lib/schemas/user.schema";
import { WarehouseSchema } from "@/lib/schemas/warehouse.schema";
import { faker } from "@faker-js/faker";

export const warehouseFaker = (): WarehouseSchema => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  location: faker.location.city(),
  capacity: faker.number.int({ min: 0, max: 1000 }),
  createdAt: faker.date.recent().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
});

export const userFaker = (): UserSchema => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: faker.internet.password(),
  updatedAt: faker.date.recent().toISOString(),
  createdAt: faker.date.recent().toISOString(),
});

export const tokensFaker = (): TokenSchema => ({
  accessToken: faker.string.uuid(),
  refreshToken: faker.string.uuid(),
});

export const warehouses: WarehouseSchema[] = Array.from(
  { length: 100 },
  warehouseFaker,
);

export const users: UserSchema[] = [
  ...Array.from({ length: 100 }, userFaker),
  {
    ...userFaker(),
    email: "admin@warehouse-pro.com",
    password: "Password@123",
  },
];
