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

handling expense emoji
- delete expense emoji representing with the emoji will lead to the expenses calculated as other in statistic if there is no expense emoji represented with the emoji

Problem solved

- env to hide api key
    - install dotenv
    - use import.meta.env in vite
- cannot read env file when deploying on vercel
    - redeploy repository to vercel and add the env variable during the process
- style not apply to page
    - check tailwind.config to see if the file is in the content
- can't make changes to array in firebase
    - check spelling (like upper and lower case)

- Testing
