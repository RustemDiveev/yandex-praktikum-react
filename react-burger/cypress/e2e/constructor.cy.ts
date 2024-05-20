describe("Constructor page tests", () => {
    beforeEach(() => {
        cy.visit("")
        cy.wait(1000)
    })

    it("should create order", () => {
        const bunName = "Краторная булка N-200i"
        const sauceName = "Соус Spicy-X"
        const toppingName = "Биокотлета из марсианской Магнолии"
        const burgerConstructorSelector = "[id=BURGER_CONSTRUCTOR]"

        cy.get("li").contains(bunName).as("bun")
        cy.get("@bun").click()
        cy.get('[data-class="modal-overlay"]').click("topLeft")
        cy.get("@bun").click()
        cy.get('[data-class="modal-close-icon"]').click()

        cy.get("@bun").drag(burgerConstructorSelector)
        cy.get(burgerConstructorSelector).contains(`${bunName} (верх)`)
        cy.get(burgerConstructorSelector).contains(`${bunName} (низ)`)
        cy.get("@bun").get(".counter").contains("1")

        cy.get("li").contains(sauceName).as("sauce")
        cy.get("@sauce").drag(burgerConstructorSelector)
        cy.get("@sauce").contains(sauceName).get(".counter").contains("1")

        cy.get("li").contains(toppingName).as("topping")
        cy.get("@topping").drag(burgerConstructorSelector)
        cy.get("@topping").get(".counter").contains("1")

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