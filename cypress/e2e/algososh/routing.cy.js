describe('routing is working correctly', ()=> {
    before(()=> cy.visit('http://localhost:3000'));

    it('should open string page', ()=> {
        cy.visit('http://localhost:3000/recursion')
    })
     it('should open fibonacci page', ()=> {
        cy.visit('http://localhost:3000/fibonacci')
    })
        it('should open sorting page', ()=> {
        cy.visit('http://localhost:3000/sorting')
    })
        it('should open stack page', ()=> {
        cy.visit('http://localhost:3000/stack')
    })
        it('should open queue page', ()=> {
        cy.visit('http://localhost:3000/queue')
    })
        it('should open list page', ()=> {
        cy.visit('http://localhost:3000/list')
    })
})