import React, { useState, useEffect } from 'react';
import { Container, Toolbar, Typography, TablePagination, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Paper, IconButton, Tooltip } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import setRequest from "../Utils/request";

export default function MaterialTable() {

  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getData = async () => {
    try {
      const { result } = await setRequest(`/v1/secret/files`, "get")
      setData(result.files);
    } catch (error) {
      console.log( error.message );
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };    

  const handleDownload = async (fileName) => { 
    try {
        const { result } = await setRequest(`/v1/secret/file/${fileName}`, "get")
      } catch (error) {
        console.log( error.message );
      }
  };

  return (
    <Container>
      <Toolbar>
        <Typography component="h1" variant="h5" color="#1976d2" noWrap sx={{ flexGrow: 2, m: 2 }}>
          Secret Files
        </Typography>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="material table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2", "& th": { fontSize: "1rem", color: "#FFFFFF" } }}>
              <TableCell align="center"> Actions </TableCell>
              <TableCell align="center"> Secret File Name    </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row}>
                <TableCell align="center">{
                  <IconButton aria-label="update" onClick={()=>handleDownload(row)}>
                    <Tooltip title="Download Secrets">
                      <DescriptionIcon color="primary" />
                    </Tooltip>
                  </IconButton>}</TableCell>
                <TableCell align="center">{row}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Toolbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Toolbar>
      </TableContainer>
    </Container>
  );
}