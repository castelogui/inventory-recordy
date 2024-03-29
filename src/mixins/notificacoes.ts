import useNotificador from "@/hooks/notificador";
import { tipoNotificacao } from "@/interfaces/INotificacao";

const { notificar } = useNotificador();

const Notificacoes = {
  clienteNotFound(e: Error) {
    return notificar(
      tipoNotificacao.FALHA,
      "Erro",
      "cliente não localizado " + e
    );
  },
  clientFoundSucess() {
    return notificar(
      tipoNotificacao.SUCESSO,
      "Sucesso",
      "Cliente localizado com sucesso"
    );
  },
  clienteUpdateSucess() {
    return notificar(
      tipoNotificacao.SUCESSO,
      "Sucesso",
      "Cliente alterado com sucesso"
    );
  },
  clienteUpdateError(e: Error) {
    return notificar(
      tipoNotificacao.FALHA,
      "Erro",
      "Dados cliente nao foram atualizados " + e
    );
  },
  clienteDuplicado(cnpjCpf: string) {
    return notificar(
      tipoNotificacao.ATENCAO,
      "Duplicado",
      "CPF/CNPJ " + cnpjCpf + " ja existe"
    );
  },
  clienteSaveSucess() {
    return notificar(
      tipoNotificacao.SUCESSO,
      "Novo",
      "Cliente incluido com sucesso"
    );
  },
  clienteSaveError(e: Error) {
    return notificar(
      tipoNotificacao.FALHA,
      "Erro",
      "Cliente nao foi incluido " + e
    );
  },
  clienteDeletedSucess() {
    return notificar(
      tipoNotificacao.SUCESSO,
      "Sucesso",
      "Cliente deletado com sucesso"
    );
  },
  clienteDeletedError(cliente: string, e: Error) {
    return notificar(
      tipoNotificacao.FALHA,
      "ERRO",
      "Não foi possivel deletar o cliente " + cliente + " - " + e
    );
  },
  cepNotFound(cep: string) {
    return notificar(
      tipoNotificacao.ATENCAO,
      "Invalido",
      'CEP "' + cep + '" não foi encontrado'
    );
  },
  documentoNull() {
    return notificar(
      tipoNotificacao.FALHA,
      "Inválido",
      "Selecione um documento!"
    );
  },
  documentoDuplicado(doc: string) {
    return notificar(
      tipoNotificacao.ATENCAO,
      "Documento Duplicado",
      'O documento "' + doc + '" ja foi inserido. Selecione outro!'
    );
  },
  referenciaNula() {
    return notificar(
      tipoNotificacao.ATENCAO,
      "Inválido",
      "Preencha todos os campos!"
    );
  },
  clientSucessSearch() {
    return notificar(
      tipoNotificacao.SUCESSO,
      "Sucesso",
      "Cliente localizado, pode realizar a edição!"
    );
  },
  clientErrorSearch(cnpjCpf: string) {
    return notificar(
      tipoNotificacao.FALHA,
      "find by Cnpj",
      "CPF/CNPJ " + cnpjCpf + " não localizado"
    );
  },

  // Categories
  categoryErrorSearch(id: string) {
    return notificar(
      tipoNotificacao.FALHA,
      "find by id",
      "Categoria com ID: " + id + " não localizada"
    );
  },
  categoriaDuplicada(name: string) {
    return notificar(
      tipoNotificacao.ATENCAO,
      "Categoria Duplicado",
      'A categoria "' + name + '" ja foi inserida!'
    );
  },
  saveError(title: string, message: string, err: string) {
    return notificar(
      tipoNotificacao.FALHA,
      `Erro ao Salvar ${title}`,
      `${message} => ${err}`
    );
  },
  saveSucess(title: string, message: string) {
    return notificar(
      tipoNotificacao.SUCESSO,
      `Sucesso ao salvar ${title}`,
      `${message}`
    );
  },
  deleteError(title: string, message: string, err: string) {
    return notificar(
      tipoNotificacao.FALHA,
      `Erro ao Deletar ${title}`,
      `${message} => ${err}`
    );
  },
  deleteSucess(title: string, message: string) {
    return notificar(
      tipoNotificacao.SUCESSO,
      `Sucesso ao deletar ${title}`,
      `${message}`
    );
  },
};

export default Notificacoes;
