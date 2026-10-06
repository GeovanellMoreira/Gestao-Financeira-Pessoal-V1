import styles from './Card_progresso.module.css';
import { IconSavings } from '../icons';
import { useState } from 'react';
import { somando } from '../Card_contas';


export const Card_progresso = ({ listaContas, setListaContas, setdialog,setMensagem }) => {
    const saldo = somando(listaContas);

    const [economizar, setEconomizar] = useState(false);
    const [depositando_meta, setDepositando_meta] = useState(false);
    const [salvando, setSalvando] = useState([]);
    const [nome, setnome] = useState('');
    const [valor, setvalor] = useState('');
    const [gerenciando, setGerenciando] = useState(false);
    const [metaSelecionada, setMetaSelecionada] = useState(null);
    const [percent, setPercent] = useState([]);
    const [contaSelecionada, setContaSelecionada] = useState('');
    const [valor_guardado, setValor_guardado] = useState('');


    function Gerenciando_Meta(e) {
        e.preventDefault(e);

        if (valor === '' && nome === '') { 
         setTimeout(() => {
           setdialog(false);
            }, 3000);

            return;
        }

        if (valor !== '') {
            if (valor < 1) {
                setMensagem('O valor precisa ser maior que 0!');
            setdialog(true);

         setTimeout(() => {
           setdialog(false);
            }, 3000);

            return;
        }
        }

        const index = salvando.findIndex(
            meta => meta.id === metaSelecionada
        );

        setSalvando(
            salvando.map((meta) => {
                if (meta.id === metaSelecionada) {
                    return {
                        ...meta,
                        nome: nome,
                        valor: valor
                    };
                }

                return meta;
            })
        );


        setnome('');
        setvalor('');
        setGerenciando(false);
    }



    //excluindo



    function excluindo(e) {
        e.preventDefault(e);

        setSalvando(
            salvando.filter(
                (remove) => remove.id !== metaSelecionada
            )
        );

        setnome('');
        setvalor('');
        setGerenciando(false);
    }



    //  sistema_meta


    function sistema_meta(e) {
        e.preventDefault();

        if (valor === '' || nome === '') {
            setMensagem('Preencha com as informações!');
            setdialog(true);

         setTimeout(() => {
           setdialog(false);
            }, 3000);

            return;
        }

        if (valor < 1) {
            setMensagem('O valor precisa ser maior que 0!');
            setdialog(true);

         setTimeout(() => {
           setdialog(false);
            }, 3000);

            return;
        }

        const novoId = salvando.length > 0
            ? Math.max(...salvando.map(meta => meta.id)) + 1
            : 1;

        const save = {
            id: novoId,
            nome: nome,
            valor: valor,
            valor_guardado: valor_guardado
        };

        setSalvando([
            ...salvando,
            save
        ]);

        setvalor('');
        setnome('');
        setEconomizar(false);
    }



    //  Depositando_meta_function



    function depositando_meta_function(e) {
        e.preventDefault();

        const conta = listaContas.find(
            (conta) => conta.bank === contaSelecionada
        );

        if (valor_guardado === '') {
            setMensagem('Preencha com as informações!');
            setdialog(true);

         setTimeout(() => {
           setdialog(false);
            }, 3000);

            return;
        }

        if (valor_guardado < 1) {
            setMensagem('O valor precisa ser maior que 0!');
            setdialog(true);

         setTimeout(() => {
           setdialog(false);
            }, 3000);

            return;
        }

        if (!conta) {
            setMensagem('Selecione uma conta!');
            setdialog(true);

         setTimeout(() => {
           setdialog(false);
            }, 3000);

            return;
        }

        if (conta.balance < Number(valor_guardado)) {
            setMensagem('Saldo insuficiente!');
            setdialog(true);

         setTimeout(() => {
           setdialog(false);
            }, 3000);

            return;
        }

        const meta = salvando.find(
            (item) => item.id === metaSelecionada
        );

        const deposito = Number(valor_guardado);

        const valor_atual = Number(meta.valor_guardado);

        const valor_final = valor_atual + deposito;

        setSalvando(salvando.map((item => {
            if (item.id === metaSelecionada) {
                return {
                    ...item,
                    valor_guardado: valor_final
                };
            }
            return item;
        }))
        )

        console.log(listaContas)

        setListaContas(
            listaContas.map((calcc => {
                if (calcc.bank === contaSelecionada) {
                    return {
                        ...calcc,
                        balance: calcc.balance - deposito,
                    }
                }
                return calcc;
            }))
        )


        const calculandooo = (valor_final / meta.valor) * 100;
        const inteiro = Math.min(100, Math.floor(calculandooo));


        setPercent({
            ...percent,
            [metaSelecionada]: inteiro
        });

        setValor_guardado('')
        setDepositando_meta(false)
    }











    return (
        <div className={styles.card}>

            <h1 className={styles.h1}>
                Progresso da meta financeira
            </h1>

            {salvando.map((key, index) => (
                <div key={key.id}>
                    <div className={styles.div_meta}>

                        <p className={styles.titulo_meta}>
                            {key.nome}
                        </p>

                        <p className={styles.saldo_meta}>
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(key.valor)}
                        </p>

                        <div className={styles.div_button_add_remove}>

                            <button
                                onClick={() => {
                                    setMetaSelecionada(key.id);
                                    setnome(key.nome);
                                    setvalor(key.valor);
                                    setGerenciando(true);
                                }}
                                className={styles.button_add_remove}
                            >
                                Gerenciar
                            </button>

                            <button
                                className={styles.button_add_remove}
                                onClick={() => {
                                    setvalor(key.valor);
                                    setMetaSelecionada(key.id);
                                    setDepositando_meta(true);
                                }}
                            >
                                Depositar
                            </button>

                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: '200px',
                                height: '25px',
                                borderRadius: '8px',
                                background: 'var(--neutral-darker)',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    width: `${percent[key.id] || 0}%`,
                                    height: '25px',
                                    backgroundColor: '#7693FF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    color: 'var(--neutral-darker)',
                                }}
                            >
                                {percent[key.id] || 0}%
                            </div>
                        </div>
                    </div>

                    {index !== salvando.length - 1 && (
                        <p className={styles.linha}></p>
                    )}
                </div>
            ))}

            <div className={styles.container}>
                <button
                    className={styles.p}
                    onClick={() => setEconomizar(true)}
                >
                    <IconSavings />
                    Adicionar meta
                </button>
            </div>

            <dialog open={gerenciando}>
                <div className={styles.dialog}>

                    <div className={styles.container_dialog}>

                        <h2>Gerenciamento do objetivo</h2>

                        <label>Nome</label>

                        <input
                            maxLength={20}
                            type="text"
                            value={nome}
                            onChange={(e) => setnome(e.target.value)}
                            placeholder="Digite o novo nome da meta"
                        />

                        <label>Objetivo financeiro</label>

                        <input
                            max={1000000}
                            type="number"
                            value={valor}
                            onChange={(e) => setvalor(e.target.value)}
                            placeholder="Digite o novo valor da meta"
                        />

                        <div className={styles.div_button}>

                            <button
                                onClick={() => setGerenciando(false)}
                            >
                                Cancelar
                            </button>

                            <button onClick={excluindo}>
                                Excluir
                            </button>

                            <button onClick={Gerenciando_Meta}>
                                Alterar
                            </button>

                        </div>

                    </div>
                </div>
            </dialog>

            <dialog open={economizar}>
                <div className={styles.dialog}>

                    <div className={styles.container_dialog}>

                        <h2>Meta Financeira</h2>

                        <label>Nome da meta</label>

                        <input
                            maxLength={20}
                            type="text"
                            value={nome}
                            onChange={(e) => setnome(e.target.value)}
                            placeholder="Digite o nome"
                        />

                        <label>Valor da meta</label>

                        <input
                            max={1000000}
                            type="number"
                            value={valor}
                            onChange={(e) => setvalor(e.target.value)}
                            placeholder="Digite o valor"
                        />

                        <div className={styles.div_button}>

                            <button
                                onClick={() => setEconomizar(false)}
                            >
                                Cancelar
                            </button>

                            <button onClick={sistema_meta}>
                                Adcionar
                            </button>

                        </div>

                    </div>
                </div>
            </dialog>

            <dialog open={depositando_meta}>
                <div className={styles.dialog}>

                    <div className={styles.container_dialog}>

                        <h2>Meta Financeira</h2>

                        <label>Valor do deposito</label>

                        <input
                            max={1000000}
                            type="number"
                            value={valor_guardado}
                            onChange={(e) => setValor_guardado(e.target.value)}
                            placeholder="Digite o valor"
                        />

                        <label>Banco para saque</label>

                        <select
                            value={contaSelecionada}
                            onChange={(e) => setContaSelecionada(e.target.value)}
                        >
                            <option value="" disabled>
                                Selecione uma opção
                            </option>

                            {listaContas.map((conta) => {
                                return (
                                    <option
                                        key={conta.bank}
                                        value={conta.bank}
                                    >
                                        {conta.bank}
                                    </option>
                                );
                            })}
                        </select>

                        <div className={styles.div_button}>

                            <button
                                onClick={() => setDepositando_meta(false)}
                            >
                                Cancelar
                            </button>

                            <button onClick={depositando_meta_function}>
                                Depositar
                            </button>

                        </div>

                    </div>
                </div>
            </dialog>

        </div>
    );
}