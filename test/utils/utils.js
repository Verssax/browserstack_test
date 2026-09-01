import { faker } from '@faker-js/faker';

export default async function generateUser() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return  {
    firstName,
    lastName,
    password: faker.internet.password(),
    email: faker.internet.email({firstName, lastName}),
    text: faker.lorem.lines(1)
    }
}