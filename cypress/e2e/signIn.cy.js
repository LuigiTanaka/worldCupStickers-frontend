describe('sign in test', () => {
  it('sign in user successfully', () => {
    const user = {
      email: "test@gmail.com",
      password: "test123",
    };

    cy.visit("http://localhost:3000/");

    cy.get("[placeholder='e-mail']").type(user.email);
    cy.get("[placeholder='password']").type(user.password);

    cy.intercept("POST", "http://localhost:5000/sign-in").as("signIn");

    cy.get("#button").click();

    cy.wait("@signIn");

    cy.url().should("equal", "http://localhost:3000/stickers")
  });
});