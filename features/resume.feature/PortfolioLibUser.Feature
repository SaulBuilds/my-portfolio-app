
Feature: Hiring Managers and Consultants that are logged in can access read only modals attached to contracts
    As a user,
    I want to view information about a contract without being able to interact with it
    so that I can make informed decisions about hiring or consulting opportunities.

Scenario: As a Hiring manager I want to see a users code that has been deployed.
    Given the admin hasn't blacklisted a contract which should be public
    When I click on the link or name of the contract 
    Then a modal should pop up for me to read that specific set of smart contracts 



