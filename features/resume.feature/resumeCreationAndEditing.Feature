Feature: Resume Creation and Editing
  As a user,
  I want to create and edit my resume within the app,
  So that I can maintain an up-to-date professional profile

  Scenario: Creating a new resume
    Given I am a logged-in user
    When I choose to create a new resume
    Then I should be presented with an interface to enter my resume details

  Scenario: Editing an existing resume
    Given I have an existing resume
    When I choose to edit my resume
    Then I should be able to modify my resume details
