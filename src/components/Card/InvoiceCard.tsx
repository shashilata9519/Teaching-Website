// import React from "react";

// const InvoiceCard = ({ item }: any) => {
//   return (
//     <div className="bg-white my-10 rounded-3xl py-3 px-4 border">
//       <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
//         <div className=" my-4">
//           <div className="">
//             <p className=" text-sm">Id:{item?.id} </p>
//             <p className="text-sm">User Id:{item?.user_id}</p>
//             <p className="text-sm">Invoice date:{item?.invoice_date} </p>
//             {/* <p className="text-sm">User Id:{item?.user_id}</p> */}
//           </div>
//         </div>
//         <div className=" my-4">
//           <div className="">
//             <p className=" text-sm">Invoice Total:{item?.invoice_total} </p>
//             <p className="text-sm">Payment Date:{item?.user_id}</p>
//             <p className="text-sm">Invoice date:{item?.invoice_date} </p>
//             {/* <p className="text-sm">User Id:{item?.user_id}</p> */}
//           </div>
//         </div>
//         <div className=" my-4">
//           <div className="">
//             <p className=" text-sm">Id:{item?.id} </p>
//             <p className="text-sm">User Id:{item?.user_id}</p>
//             <p className="text-sm">Invoice date:{item?.invoice_date} </p>
//             {/* <p className="text-sm">User Id:{item?.user_id}</p> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceCard;
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function InvoiceCard({invoiceData}:any) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Serial Number</StyledTableCell>
            <StyledTableCell align="right">User Id</StyledTableCell>
            <StyledTableCell align="right">Invoice Date </StyledTableCell>
            <StyledTableCell align="right">Invoice Total</StyledTableCell>
            {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceData?.map((item:any,index:any) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {item?.id}
              </StyledTableCell>
              <StyledTableCell align="right">{item?.user_id}</StyledTableCell>
              <StyledTableCell align="right">{moment(item?.invoice_date).format('DD-MM-YYYY')}</StyledTableCell>
              <StyledTableCell align="right">{item?.invoice_total}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
