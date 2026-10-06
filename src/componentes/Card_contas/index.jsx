import { IconBank, IconWallet } from '../icons'
import { useState } from "react";
import styles from './Card_contas.module.css'
import styles_button from './Button.module.css'
import { Infobox } from '../infobox';

export function somando(novaLista) {
    const total = novaLista.reduce((soma, conta) => {
        return soma + conta.balance;
    }, 0);
    return total;
}

export function contas() {
    return [
    ]
}


export const Card_contas = ({ listaContas, setListaContas, setdialog,setMensagem }) => {
    const [bank, setbanco] = useState('');
    const [saldototal, setsaldototal] = useState('');
    const [estado, setEstado] = useState(false);



    function adcionarevento(e) {

        if (bank === '' || saldototal === '') {
            setMensagem('Preencha com as informações!');
            setdialog(true);

         setTimeout(() => {
           setdialog(false);
            }, 3000);

            return;
        }

        if (saldototal < 1) {
            setMensagem('O valor precisa ser maior que 0!');
            setdialog(true);

         setTimeout(() => {
           setdialog(false);
            }, 3000);

            return;
        }

        if (listaContas.some((conta) => conta.bank === bank)) {
            setMensagem('Essa conta já está cadastrada!');
            setdialog(true);

         setTimeout(() => {
           setdialog(false);
            }, 3000);

            return;
        }


        e.preventDefault();

        const novaConta = {
            bank: bank,
            balance: Number(saldototal)
        };

        const novaLista = [
            ...listaContas,
            novaConta
        ];

        setListaContas(novaLista);

        somando(novaLista);

        setbanco('');
        setsaldototal('');
        setEstado(false);

    }


    return (
        <div className={styles.cardd}>
            <h1 className={styles.h1}>Minhas contas</h1>
            <div>
                {listaContas.map((key, index) => (
                    <>
                        <section className={styles.div}>
                            <p className={styles.nome}><IconBank />{key.bank}</p>
                            <div className={styles.saldo_valor}>
                                <p className={styles.saldo}>Saldo</p>
                                <p className={styles.valor}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(key.balance)}</p>
                            </div>
                        </section>
                        <section>
                            {index !== listaContas.length - 1 && (
                                <div className={styles.linha}></div>
                            )}
                        </section>
                    </>
                ))}
            </div>


            <div className={styles.div_button}>
                <button onClick={() => setEstado(true)} className={styles.button}>
                    <IconWallet />
                    Adicionar conta
                </button>

                <dialog className={styles_button.dialog} open={estado}>
                        <div className={styles_button.container}>
                            <h2>Adicionar conta</h2>

                            <label>Banco</label>
                            <input
                                type="text"
                                placeholder="Digite o nome do banco"
                                value={bank}
                                onChange={(e) => setbanco(e.target.value)}
                            />

                            <label>Saldo</label>
                            <input
                                type="number"
                                placeholder="R$ 0,00"
                                value={saldototal}
                                onChange={(e) => setsaldototal(e.target.value)}
                            />

                            <div className={styles_button.buttons}>
                                <button
                                    type="button"
                                    onClick={() => setEstado(false)}
                                    className={styles_button.button_add}
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={adcionarevento}
                                    type="button"
                                    className={styles_button.button_cancelar}
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