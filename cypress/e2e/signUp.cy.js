import { faker } from "@faker-js/faker";

describe('sign up test', () => {
  it('sign up user successfully', () => {
    const user = {
      username: faker.lorem.word(8),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    cy.visit("http://localhost:3000/sign-up");

    cy.get("[placeholder='username']").type(user.username);
    cy.get("[placeholder='e-mail']").type(user.email);
    cy.get("[placeholder='password']").type(user.password);
    cy.get("[placeholder='confirm password']").type(user.password);

    cy.intercept("POST", "http://localhost:5000/sign-up").as("createUser");

    cy.get("#button").click();

    cy.wait("@createUser");

    cy.url().should("equal", "http://localhost:3000/")
  });
});