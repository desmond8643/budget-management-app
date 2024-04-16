Database structure

account:
user: 
    emailAddress
    username
    weeklyBudgets


weekly: contains all weekly budgets
    {   
        name of the budget
        date created
        day 1-7:
        [{
            id,
            title, 
            cost
        }] (array of objects of the budget, it includes title and cost, id for uniqueness) 
    }

how to get budget list?
- with user id