import "./styles.css";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [adicionada, setAdicionada] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const onAdicionarTarefa = () => {
    tarefas.push(adicionada);
    setTarefas(tarefas);
    setAdicionada("");
  };
  const excluirTarefa = (index) => {
    const novasTarefas = tarefas.filter((_, _index) => _index !== index);
    setTarefas(novasTarefas);
  };

  useEffect(() => {
    getTarefas();
  }, []);
  async function getTarefas() {
    const url = "https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks";
    const resultado = await axios.get(url, { params: { user: "Marcela" } });

    setTarefas(resultado.data);
    console.log(resultado.data);
  }
  async function criarTarefas() {
    const url = "https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks";
    const resultado = await axios.post(url, {
      description: "Passear com o cachorro",
      user: "Marcela"
    });
    getTarefas();
    console.log(resultado.data);
  }
  async function deletarTarefas() {
    const url =
      "https://68jb68bukl.execute-api.sa-east-1.amazonaws.com/tasks/{id}";
    const resultado = await axios.delete(url);

    setTarefas(resultado.data);
    console.log(resultado.data);
  }

  return (
    <div>
      <p>Tarefas:</p>
      {tarefas.map((tarefa) => (
        <p>{tarefa.description}</p>
      ))}
      <div class="input_nome">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          value={adicionada}
          onChange={(event) => {
            setAdicionada(event.target.value);
          }}
        />
      </div>

      <button onClick={() => criarTarefas()}>Adicionar</button>

      <button id="Excluir" onClick={() => setTarefas(tarefas)}>
        Excluir
      </button>
    </div>
  );
}
