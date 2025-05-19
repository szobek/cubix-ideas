import { Route } from "@angular/router";
import { ListIdeaComponent } from "./list-idea/list-idea.component";
import { NewIdeaComponent } from "./new-idea/new-idea.component";
import { ideaResolver } from "./idea.resolver";
import { ViewIdeaComponent } from "./view-idea/view-idea.component";

export const routes: Route[] = [
    {
        path: '',
        component: ListIdeaComponent,
        title: 'Ideas'
    },
    {
        path: 'new',
        resolve:{idea: ideaResolver},
        runGuardsAndResolvers:'paramsOrQueryParamsChange',
        component: NewIdeaComponent,
        title: 'New Idea'
    },
    {
        path: ':id',
        resolve:{idea: ideaResolver},
        runGuardsAndResolvers:'paramsOrQueryParamsChange',
        component: ViewIdeaComponent,
        title: 'View Idea',
    
    }
]