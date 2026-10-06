import styles from './aside.module.css'
import logo from '../../assets/logo.svg'

export const Aside = () => {
    return (
        <aside className={styles.aside}>
            <img className={styles.logo} src={logo} alt='Imagem' />
            <footer className={styles.footer}>
                Desenvolvido por Geovane. Projeto fictício sem fins comerciais.
            </footer>
        </aside>
    )
}