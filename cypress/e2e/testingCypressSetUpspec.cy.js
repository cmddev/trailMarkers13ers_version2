// describe("My First Test", () => {
//   it("Does not do much!", () => {
//     expect(true).to.equal(true)
//   })
// })

// describe("My First Test", () => {
//   it("Does not do much!", () => {
//     expect(true).to.equal(false)
//   })
// })

describe("My First Test", () => {
  it("Visit Login Page!", () => {
    cy.visit("localhost:3000/login")
    // need to update once deployed
  })
})