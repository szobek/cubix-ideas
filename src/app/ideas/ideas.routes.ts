import { Route } from "@angular/router";
import { ListIdeaComponent } from "./list-idea/list-idea.component";
import { NewIdeaComponent } from "./new-idea/new-idea.component";
import { ideaResolver } from "./idea.resolver";

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
    }
]