describe("Test to create new post", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  it("Should visit icon to add new post", () => {
    cy.visit("/");
    // Kollar att ikonen är synlig och finns
    cy.get("svg.size-10.cursor-pointer.text-blue-950")
      .should("be.visible")
      .should("exist");
  });
  it("should find add new post icon and switch url", () => {
    cy.visit("/");
    // Kollar att ikonen är synlig och finns
    cy.get("svg.size-10.cursor-pointer.text-blue-950")
      .should("be.visible")
      .should("exist");
    // Klicka på ikonen
    cy.get("svg.size-10.cursor-pointer.text-blue-950").click();
    // Kolla att URL har ändrats efter klick
    cy.url().should("include", "/NewPostPage");
  });
  it("Should create new post", () => {
    const newPost = {
      title: "Testinlägg",
      image: "https://example.com/image.jpg",
      content: "Detta är ett testinlägg för Cypress testning.",
    };

    cy.visit("/NewPostPage");
    cy.get("form").within(() => {
      cy.get('input[name="title"]').type(newPost.title);
      cy.get('input[name="image"]').type(newPost.image);
      cy.get('textarea[name="content"]').type(newPost.content);
      cy.get("button").contains("Spara").click();
    });
  });
  // it("Should delete a post", () => {
  //   cy.visit("/");
  //   cy.get("main").should("exist").should("be.visible");
  //   cy.wait(1000);
  //   cy.get("main .post-card").should("exist").should("be.visible");
  //   cy.get("svg.delete.size-6").should("exist").should("be.visible").click();
  // });
  // it("Should delete a post and verify it's removed from the database", () => {
  //   cy.visit("/");

  //   cy.get("main").should("exist").should("be.visible");
  //   cy.wait(1000);
  //   cy.get("main .post-card").should("exist").should("be.visible");

  //   cy.get("svg.delete.size-6")
  //     .first()
  //     .should("exist")
  //     .should("be.visible")
  //     .click();

  //   // Lägg till en väntetid för att ge tid för sidan att uppdateras
  //   cy.wait(2000);

  //   // Verifiera att posten har tagits bort
  //   cy.get("main .post-card").should("not.exist");

  //   // Kontrollera att posten har tagits bort från databasen via en API-förfrågan
  //   cy.request({
  //     method: "GET",
  //     url: "/api/posts",
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     const posts = response.body;
  //     const deletedPost = posts.find(
  //       (post: { id: string }) => post.id === "post_id_to_check"
  //     );
  //     expect(deletedPost).to.be.undefined;
  //   });
  // });
  it("Should delete a post", () => {
    // Besök sidan där posten finns
    cy.visit("/");

    // Skapa en post för att sedan ta bort den
    const newPost = {
      title: "Testinlägg att ta bort",
      image: "https://example.com/image.jpg",
      content: "Detta är ett testinlägg som ska tas bort.",
    };

    // Skapa posten först
    cy.createPost(newPost);

    // Ta bort posten
    cy.get(".post-card")
      .contains(newPost.title)
      .parent()
      .find("svg.delete.size-6")
      .click();

    // Verifiera att posten har tagits bort från DOM
    cy.get(".post-card").contains(newPost.title).should("not.exist");
  });
});
