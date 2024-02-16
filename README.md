# `"Storyrolls"` in a blog application promoting free and open knowledge as well is literature and philosophy

Use case targets,

-   Users can create blogs
-   Users can ask questions
-   Users has to create an account in order to create posts
-   Account is required to track a users posts
-   No personal information of the user is stored to promote free speech
-   Sorting and categorizaion of the posts.

## Used tech

-   **NextJS** 14 App Router

    **NextJS** version 14 has been used to create the fullstack architecture. Using `server actions` to execute database and used based actions.
    Typescript has been used and Jodit Editor for rich text editing. Strict type safety has been implemented in the codebase.

-   Database system **Mysql** & **Prisma**

    **Mysql** database has been designed using **Prisma** to store blogs, and questions efficiently.
    The database is cloud and managed system and hosted online. Credentials are found inside .env.local

-   React server components and actions

    Applied React server components thoroughly to render server side components.
    Application of `Client components` and `Server components` are shown and utilized properly to distribute loads between server and client side.
    Whole application has been focused on more `ISR`-> **Incremental Static Rendering**, `SSR`-> **Server Side Rendering** rather than `CSR`-> **Client Side Rendering**. Calculated ratios between SSR, ISR, CSR is 3:4:2

-   Search Engine Optimization and Open Graph

    With the advantage of `ISR` and `SSR`, proper SEO for each blogs, questions, each pages has been done properly.

-   Testing

    `Jest` has been configured properly for testing covarage on whole application.
