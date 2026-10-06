import { Container } from './componentes/Container'
import { Aside } from './componentes/Aside'
import { useState } from "react";
import { Typography } from './componentes/Typography'
import { Main } from './componentes/Main'
import { Card_titulo } from './componentes/Card_titulo'
import { Card_progresso } from './componentes/Card_progresso'
import { Card } from './componentes/Card'
import { Card_movimentacao } from './componentes/Card_movimentacao'
import { Card_contas, contas } from './componentes/Card_contas'
import { Infobox } from './componentes/infobox';

export function App() {
  const [listaContas, setListaContas] = useState(contas());
  const [dialog, setdialog] = useState(false);
  const [mensagem, setMensagem] = useState('');

  return (
    <Container>
      <Infobox
        dialog={dialog}
        setdialog={setdialog}
        mensagem={mensagem}
      />
      <Aside />
      <Main>
        <Typography />
        <section>
          <Card>
            <Card_titulo
              listaContas={listaContas}
              setListaContas={setListaContas}
              dialog={dialog}
              setMensagem={setMensagem}
              setdialog={setdialog} />
            <Card_progresso
              listaContas={listaContas}
              setListaContas={setListaContas}
              dialog={dialog}
              setMensagem={setMensagem}
              setdialog={setdialog} />
            <Card_movimentacao
              listaContas={listaContas}
              setListaContas={setListaContas}
              dialog={dialog}
              setMensagem={setMensagem}
              setdialog={setdialog} />
            <Card_contas
              listaContas={listaContas}
              setListaContas={setListaContas}
              dialog={dialog}
              setdialog={setdialog}
              setMensagem={setMensagem}
            />
          </Card>
        </section>
      </Main>
    </Container>
  )
}

export default App
