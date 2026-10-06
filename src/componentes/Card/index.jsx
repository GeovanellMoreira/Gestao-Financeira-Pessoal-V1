import styles from './card.module.css'

export const Card = ({ children }) => {
    return (
        <div className={styles.divcard}>
            {children}
            <footer className={styles.footer}>
                Desenvolvido por Geovane. Projeto fictício sem fins comerciais.
            </footer>
        </div>
    )
}