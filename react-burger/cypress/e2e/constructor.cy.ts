describe("Constructor page tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
        cy.wait(1000)
    })

    it("should create order", () => {
        const bunName = "Краторная булка N-200i"
        const sauceName = "Соус Spicy-X"
        const toppingName = "Биокотлета из марсианской Магнолии"

        cy.get("li").contains(bunName).click()
        cy.get('[data-class="modal-overlay"]').click("topLeft")
        cy.get("li").contains(bunName).click()
        cy.get('[data-class="modal-close-icon"]').click()

        cy.get("li").contains(bunName).drag("[id=BURGER_CONSTRUCTOR]")
        cy.get("[id=BURGER_CONSTRUCTOR]").contains(`${bunName} (верх)`)
        cy.get("[id=BURGER_CONSTRUCTOR]").contains(`${bunName} (низ)`)
        cy.get("li").contains(bunName).get(".counter").contains("1")

        cy.get("li").contains(sauceName).drag('[id=BURGER_CONSTRUCTOR]')
        cy.get("li").contains(sauceName).get(".counter").contains("1")

        cy.get("li").contains(toppingName).drag('[id=BURGER_CONSTRUCTOR]')
        cy.get("li").contains(toppingName).get(".counter").contains("1")

        cy.get("button").contains("Оформить заказ").click()
        cy.location("pathname").should("eq", "/login")

        cy.get('[data-class="email"]').type("rustem@gmail.com")
        cy.get('[data-class="password"]').type("1234")
        cy.get("button").contains("Войти", {timeout: 3000}).click()

        cy.location("pathname").should("eq", "/")

        cy.get("button").contains("Оформить заказ").click()
        cy.wait(30000)
        cy.get(".text_type_digits-large").then(($orderNumber) => {
            cy.exec(`print ${$orderNumber.text()}`)
        })
        cy.get('[data-class="modal-overlay"]').click("topLeft")
    })
})