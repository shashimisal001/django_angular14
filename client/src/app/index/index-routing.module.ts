import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IndexComponet } from "./index.component";

export const routes = [
    { 
        path: "", 
        component: IndexComponet,     
        data: {
            title: "Shop in style",
            subtitle: "With this shop hompeage template"
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})

export class IndexRoutingModule {

}