import { useState } from 'react'
import styles from './Card_movimentacao.module.css'
import styles_button from './dialog.module.css'
import { IconCurrency } from '../icons'



export const Card_movimentacao = ({ listaContas, setListaContas, setdialog, setMensagem }) => {
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [estado, setEstado] = useState(false)
    const [contaSelecionada, setContaSelecionada] = useState('')
    const [tipo, setTipo] = useState("");
    const [atualizar, setatualizar] = useState([
    ]);


    function adcionarevento(e) {
        if (value === '' || description === '') {
            setMensagem('Preencha com as informações!');
            setdialog(true);

            setTimeout(() => {
                setdialog(false);
            }, 3000);

            return;
        }

        if (Number(value) < 1) {
            setMensagem('O valor precisa ser maior que 0!');
            setdialog(true);

            setTimeout(() => {
                setdialog(false);
            }, 3000);

            return;
        }

        if (contaSelecionada === '') {
            setMensagem('Você precisa selecionar uma conta!');
            setdialog(true);

            setTimeout(() => {
                setdialog(false);
            }, 3000);

            return;
        }

        if (tipo === '') {
            setMensagem('Você precisa selecionar uma transação!');
            setdialog(true);

            setTimeout(() => {
                setdialog(false);
            }, 3000);

            return;
        }

        if (tipo === "remov") {
            const conta = listaContas.find((conta) => conta.bank === contaSelecionada);

            if (conta.balance < Number(value)) {
                setMensagem('O saldo do banco é insuficiente!');
                setdialog(true);

                setTimeout(() => {
                    setdialog(false);
                }, 3000);

                return;
            }
        }

        e.preventDefault()

        const novoEvento = {
            description: description,
            value: Number(value),
            tipo: tipo,
            data: new Date().toISOString()
        }

        setatualizar([
            ...atualizar,
            novoEvento
        ])



        setListaContas(
            listaContas.map((conta) => {
                if (conta.bank === contaSelecionada) {
                    if (tipo === "add") {
                        return {
                            ...conta,
                            balance: conta.balance + Number(value)
                        };
                    } if (tipo === "remov") {
                        return {
                            ...conta,
                            balance: conta.balance - Number(value)
                        };
                    }
                }
                return conta;
            })
        );

        setDescription('')
        setValue('')
        setEstado(false)
    }



    return (
        <div className={styles.card}>
            <h1 className={styles.h1}>Movimentação financeira</h1>
            <div>
                {atualizar.map((key, index) => (
                    <section className={styles.section_movimentacao}>
                        <div className={styles.div_movimentacao}>
                            <p className={key.tipo === "remov" ? styles.nome_negativo : styles.nome_positivo}>{key.description}</p>
                            <p className={styles.data}>{new Date(key.data).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <p className={key.tipo === "remov" ? styles.valor_negativo : styles.valor_positivo}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(key.tipo === "remov" ? -key.value : +key.value)}</p>
                        {index !== atualizar.length - 1 && (
                            <div className={styles.linha}></div>
                        )}
                    </section>
                ))}
            </div>
            <div className={styles.div_botao}>

                <button onClick={() => setEstado(true)} className={styles.botao} ><IconCurrency />Adcionar transação</button>
            </div>

            <div>
                <dialog className={styles_button.dialog} open={estado}>

                    <div className={styles_button.container}>
                        <h2>Adicionar transação</h2>

                        <label>Nome</label>
                        <input
                            type="text"
                            placeholder="Digite o nome"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <label>Valor</label>
                        <input
                            type="number"
                            placeholder="R$ 0,00"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />


                        <label>Tipo da transação</label>
                        <div className={styles.div_button_add_remov}>

                            <input
                                type="radio"
                                id='adcionar'
                                value="add"
                                name="tipo"
                                onChange={(e) => setTipo(e.target.value)}>
                            </input>
                            <label
                                htmlFor='adcionar'>Depósito</label>

                            <input
                                type="radio"
                                id='remover'
                                name='tipo'
                                value="remov"
                                onChange={(e) => setTipo(e.target.value)}>
                            </input>
                            <label
                                htmlFor='remover'>Saque</label>
                        </div>

                        <label>Conta bancaria</label>
                        <select
                            value={contaSelecionada}
                            onChange={(e) => setContaSelecionada(e.target.value)}
                        >
                            <option value="" disabled>
                                Selecione uma opção
                            </option>

                            {listaContas.map((conta) => {
                                return (
                                    <option key={conta.bank} value={conta.bank}>
                                        {conta.bank}
                                    </option>
                                );
                            })}
                        </select>

                        <div className={styles_button.buttons}>
                            <button
                                type="button"
                                onClick={() => setEstado(false)}
                                className={styles_button.button}
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={adcionarevento}
                                type="button"
                                className={styles_button.button}
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    )
}