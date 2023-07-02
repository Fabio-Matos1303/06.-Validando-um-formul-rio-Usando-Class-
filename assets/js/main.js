class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }
    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const fieldsValid = this.fieldsValid();
        const passwordValid = this.passwordValid();

        if(fieldsValid && passwordValid) {
            alert('Formulário enviado!');
            this.formulario.submit();
        }
    }

    passwordValid() {
        let valid = true;

        const senha = this.formulario.querySelector('.senha')
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if (senha.value !== repetirSenha.value) {
            this.createError(senha, `Campos "Senha" e "Repetir senha" devem ser iguais!`);
            this.createError(repetirSenha, `Campos "Senha" e "Repetir senha" devem ser iguais!`);
            valid = false;
        }

        if (senha.value.length <= 6 || senha.value.length >= 12) {
            this.createError(senha, 'A senha deve ter entre 6 e 12 caracteres');
            valid = false;
        }

        return valid;
    }


    fieldsValid() {
        let valid = true;

        // Remove erros antes de enviar o formulário novamente
        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        // Cria a mensagem de erro
        for (let field of this.formulario.querySelectorAll('.validate')) {
            const label = field.previousElementSibling.innerHTML;
            if (!field.value) {
                this.createError(field, `Campo "${label}" não pode estar vazio!`)
                valid = false;
            }

            if (field.classList.contains('cpf')) {
                if (!this.validaCPF(field)) valid = false;
            }

            if (field.classList.contains('usuario')) {
                if (!this.validaUsuario(field)) valid = false;
            }
        }

        return valid;
    }

    validaUsuario(field) {
        let valid = true;
        if (field.value.length <= 3 || field.value.length >= 12) {
            this.createError(field, 'Nome de usuário precisa ter entre 3 e 12 caracteres.');
            valid = false
        }

        if (!field.value.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'Nome de usuário precisa ter apenas letras e/ou números.');
            valid = false
        }

        return valid;
    }

    validaCPF(field) {
        const cpf = new ValidaCPF(field.value);

        if (!cpf.valida()) {
            this.createError(field, 'CPF inválido.');
            return false
        }

        return true;
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div)
    }

}

const valida = new ValidaFormulario();