Feature: Devs can store contract locations and acces them with a UI 
for dynamic return to front end
    As a the Admin and Dev,
    I want to be able to input contract address into a smart contract
    So that I can store them for dynamic use in my portfolio UI

Scenario: Dev Deploys contract
    Given I input the addresses as arguments when I deploy
    When I look on etherscan to verify the deployment
    Then I should be able to confirm the arguments exist onchain

Scenario: Dev Wants to add contracts from their resume post deployment  
    Given the smart contracts have been deployed
    When I input the smart contract address into the interface
    Then I should recieve confirmation of the etherscan blobs posted on chain

Scenario: Dev wants to read a specific contract address or blob from the dapp
    Given I have been granted has access to the admin portal
    When I click on a link or contract address... 
    Then I should be presented with a modal to read the contract.

Scenario: Dev wants to burn a contract from the contract list because of bad affiliations
    Given I want to get rid of an asset in this onchain catalouge
    When I click on a contract name or link 
    Then I should be presented with the option to burn it as the administrator/owner






