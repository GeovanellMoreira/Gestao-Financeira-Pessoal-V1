import styles from './infobox.module.css'

export const Infobox = ( {dialog, mensagem}) => {
    if (!dialog){
        return null;
    }

    const tocarSom = () => {
        const audio = new Audio('/sons/music.mp3');
        audio.play();
    };

    tocarSom();

    return (
<>
        <div className={styles.infobox}>
            <div>
                <p className={styles.infobox__p}>❗{mensagem}</p>
            </div>
        </div>


</>
    )
}