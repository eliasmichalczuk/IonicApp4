import { Agendamento } from './agendamento.po';
import { element, by } from 'protractor';

describe('agendamento', () => {

    let agendameto: Agendamento;

    beforeEach(() => {
        agendameto = new Agendamento();
        element(by.partialButtonText('ENTRAR')).click();
    })

    it('should create an agendamento', () => {
        agendameto.selectVehicle();
        agendameto.toggleOptionsAndContinue();
        agendameto.completeForm();
        expect(element(by.className('test-alert-positive'))).toBeTruthy();
    })
})