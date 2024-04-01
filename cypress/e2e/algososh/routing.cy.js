import { baseUrl } from "../constants";

describe('routing is working correctly', ()=> {
    before(()=> cy.visit(`${baseUrl}`));

    it('should open string page', ()=> {
        cy.visit(`${baseUrl}/queue/recursion`)
    })
     it('should open fibonacci page', ()=> {
        cy.visit(`${baseUrl}/fibonacci/`)
    })
        it('should open sorting page', ()=> {
        cy.visit(`${baseUrl}/sorting`)
    })
        it('should open stack page', ()=> {
        cy.visit(`${baseUrl}/stack`)
    })
        it('should open queue page', ()=> {
        cy.visit(`${baseUrl}/queue`)
    })
        it('should open list page', ()=> {
        cy.visit(`${baseUrl}/list`)
    })
})