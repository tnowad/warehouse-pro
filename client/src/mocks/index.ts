import {
  permissionNameSchema,
  PermissionSchema,
} from "@/lib/schemas/permission.schema";
import { RoleSchema } from "@/lib/schemas/role.schema";
import {
  AccessTokenPayloadSchema,
  RefreshTokenPayloadSchema,
  TokenSchema,
} from "@/lib/schemas/token.schema";
import { UserSchema } from "@/lib/schemas/user.schema";
import { WarehouseSchema } from "@/lib/schemas/warehouse.schema";
import { faker } from "@faker-js/faker";
import jwtEncode from "jwt-encode";

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
  accessToken: jwtEncode(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      iat: Math.floor(Date.now() / 1000),
      iss: "warehouse-pro",
      sub: faker.string.uuid(),
      aud: "warehouse-pro",
      jti: faker.string.uuid(),
    } satisfies AccessTokenPayloadSchema,
    "access_token_secret",
    { alg: "HS256", typ: "JWT" },
  ),
  refreshToken: jwtEncode(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      iat: Math.floor(Date.now() / 1000),
      iss: "warehouse-pro",
      sub: faker.string.uuid(),
      jti: faker.string.uuid(),
    } satisfies RefreshTokenPayloadSchema,
    "refresh_token_secret",
    { alg: "HS256", typ: "JWT" },
  ),
});

export const roleFaker = (): RoleSchema => ({
  id: faker.string.uuid(),
  name: faker.commerce.department(),
  description: faker.commerce.productDescription(),
  createdAt: faker.date.recent().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
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

export const roles: RoleSchema[] = Array.from({ length: 50 }, roleFaker);

export const permissions: PermissionSchema[] = Object.values(
  permissionNameSchema.enum,
).map((name) => ({
  id: faker.string.uuid(),
  name,
  description: faker.commerce.productDescription(),
}));
