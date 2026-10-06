import styles from './Card_titulo.module.css';
import { somando } from '../Card_contas';

export const Card_titulo = ({ listaContas  }) => {
    const saldo = somando(listaContas );
    const formatandovalor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo);
    return (
        <div className={styles.card}>
            <h1 className={styles.h1}>
                Orçamento diário disponível
            </h1>

            <p className={styles.p}>{formatandovalor}</p>
        </div>
    );
};