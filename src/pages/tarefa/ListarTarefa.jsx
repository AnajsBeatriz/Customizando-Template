import React, { useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';
import Login from '../Login';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


//A função abaixo é usada para criar o array contendo os dados iniciais da listagem de tarefas.
function createData(
  idTarefa: number,
  tituloTarefa: string,
  descricaoTarefa: string,
  inicioTarefa: string,
  fimTarefa: string,
  statusTarefa: string,
  recursoTarefa: string,
) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

//Definição do array contendo os dados iniciais da listagem de tarefas
const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01', '2022-01-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03', '2022-01-04', 'Em Andamento', 'Recurso 2'),
  createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2022-01-04', '2022-01-05', 'Em Andamento', 'Recurso 3'),
  createData(4, 'Tarefa 4', 'Descrição da Tarefa 4', '2022-01-05', '2022-01-06', 'Em Andamento', 'Recurso 4'),
  createData(5, 'Tarefa 5', 'Descrição da Tarefa 5', '2022-01-06', '2022-01-07', 'Em Andamento', 'Recurso 5'),
  createData(6, 'Tarefa 6', 'Descrição da Tarefa 6', '2022-01-07', '2022-01-08', 'Aguardando', 'Recurso 6'),
];

//Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  const handleReload = () => {
    window.location.reload(); // Isso recarregará a página
  };

  //O array definido acima é setado como conteúdo do state Tarefas na renderização inicial do componente.
  useEffect(() => {
    setTarefas(initialRows);
  },[]);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);

    //Objeto local para armazenamento da tarefa filtrada de acordo com a seleção do usuário
    let tarefaParaEditar = tarefas.filter(obj => {
      return obj.idTarefa === id;
    })[0];

    //Atribuição do Objeto local, setado acima, ao state Tarefa
    setTarefa(tarefaParaEditar);

    //Seta como true o state responsável pela exibição do Model de Editar Tarefa
    setOpenEditar(true)
  };

  const handleDeletar = (id) => {
    setTarefas(current =>
      current.filter(tarefa => {
        return tarefa.idTarefa !== id;
      }),
    );
  };


    return(
    <>
    <Card > 
        <CardHeader
          title="Tarefas"
          subheader="Listagem de Tarefas" 
        /> 
        <CardContent>
          
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="customized table">
                <TableHead> 
    
                <StyledTableRow>
                    <StyledTableCell>Id</StyledTableCell>
                    <StyledTableCell>Título</StyledTableCell>
                    <StyledTableCell align="right">Descrição</StyledTableCell>
                    <StyledTableCell align="right">Data de Início</StyledTableCell>
                    <StyledTableCell align="right">Data de Finalização</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                    <StyledTableCell align="right">Recurso</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                   
                      <TableCell>
                        < Toolbar >
                            <Tooltip title="Filter" >
                            <IconButton >
                              <FilterListIcon  />
                            </IconButton>
                            </Tooltip>
                        </Toolbar>
                      </TableCell>
                    
           

                </StyledTableRow>
                </TableHead>
                <TableBody>
                {tarefas.map((row, indice) => (
                    <StyledTableRow
                    key={indice}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                          {row.idTarefa}
                      </TableCell>
                      <TableCell component="th" scope="row">
                          {row.tituloTarefa}
                      </TableCell>
                      <TableCell align="right">{row.descricaoTarefa}</TableCell>
                      <TableCell align="right">{row.inicioTarefa}</TableCell>
                      <TableCell align="right">{row.fimTarefa}</TableCell>
                      <TableCell align="right">{row.statusTarefa}</TableCell>
                      <TableCell align="right">{row.recursoTarefa}</TableCell>
                      <TableCell align="center">
                        <Button variant="text" color="inherit" onClick={() => handleEditar(row.idTarefa)}><EditIcon fontSize="small" /></Button>            
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="text" color="secondary" onClick={() => handleDeletar(row.idTarefa)}><ClearIcon fontSize="small" /></Button>            
                      </TableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
           
            </TableContainer>  
        </CardContent>
        <CardActions>
            <Button size="small" variant="contained" color="secondary" onClick={handleOpen}>Criar Tarefa</Button>
            <Button size="small" variant="outlined" color="inherit">Cancelar</Button>
      </CardActions> 
    </Card>

    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
    <div>
      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
    <br />
    <Button >Sair</Button>
  </>    
 );
 
};
 
export default ListarTarefa;