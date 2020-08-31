import { Injectable } from "@angular/core";
import { Globals } from "../app.globals";

@Injectable()
export class ErrorHelper {
    constructor(
        private globals: Globals,
    ) {

    }

    handle(error){
        alert('Ocorreu um Erro: ' + error.message + " - TENTE NOVAMENTE");
        this.globals.isLoading = false;
    }
}
