import { browser, by, element } from 'protractor';

export class Agendamento {

    private valoresCadastro = {
        nome: 'Teste e2e',
        endereco: 'Rua e2e',
        email: 'Email e2e'
    };

    selectVehicle(): void {
        element.all(by.className('test-car')).first().click();
    }

    toggleOptionsAndContinue() {
        element.all(by.className('test-toggle')).array.forEach(element => {
            element.click();
        });
        element(by.name('arrow-dropright')).click();
    }

    completeForm() {
        element(by.name('nome')).sendKeys(this.valoresCadastro.nome);
        element(by.name('endereco')).sendKeys(this.valoresCadastro.endereco);
        element(by.name('email')).sendKeys(this.valoresCadastro.email);
        element(by.name('arrow-dropright')).click();
    }
}