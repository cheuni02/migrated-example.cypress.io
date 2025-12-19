import {Locator, Page} from "@playwright/test";

export class TodosPage {
    readonly page: Page
    readonly path: string
    readonly todosHeader: Locator;
    readonly inputTodo: Locator;
    readonly todoItemsList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.path = '/todo';
        this.todosHeader = this.page.locator('.todoapp h1');
        this.inputTodo = this.page.locator(`[data-test="new-todo"]`);
        this.todoItemsList = this.page.locator('.todo-list li');
    }

    async goto(){
        await this.page.goto(this.path);
    }

    async addNewTodo(task: string) {
        await this.inputTodo.fill(task);
        await this.inputTodo.press('Enter');
        console.log("test");
    }

    async returnTodoItems() {
        return await this.todoItemsList.all()
    }

    async todoAt(index: number){
        return this.todoItemsList.nth(index);
    }
}