import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { GridApi, ColDef, GridReadyEvent } from "ag-grid-community";
import { Button, Snackbar, Alert, Box } from "@mui/material";
import { getItems, deleteItem } from "../api/shoppingapi";
import { ShoppingItem } from "../types";
import AddItem from "../components/AddItem";
import EditItem from "../components/EditItem";

import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-grid.css';

// npm install ag-grid-community
// npm install @tanstack/react-query

function ShoppingItemList() {
  // 로컬 상태
  const [ gridApi, setGridApi ] = useState<GridApi | null> (null);
  const [ openSnackbar, setOpenSnackbar ] = useState(false);
  const [ snackbarMsg, setSnackbarMsg ] = useState('');
  const [ snackbarSeverity, setSnackbarSeverity ] = useState<'success' | 'error'> ('success');

  const queryClient = useQueryClient();
  
  // 서버 데이터 가져오기(목록)
  const { data:items, isLoading, isError, error } = useQuery<ShoppingItem[], Error>({
    queryKey: [ 'items' ],
    queryFn: getItems,
  });

  // 삭제 뮤테이션
  const { mutate: deleteMutate } = useMutation ({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['items']});
      setSnackbarMsg('해당 쇼핑 품목이 정상적으로 삭제되었습니다.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    },
    onError: (error) => {
      console.log('삭제 에러 : ', error);
      const message = error?.message || '삭제 실패 에러';
      setSnackbarMsg(message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    },
  });

  // 컬럼 정의
  const columnDefs: ColDef<ShoppingItem>[] = [
    { field: 'product', sortable: true, filter: true, flex: 2 },
    { field: 'amount', sortable: true, filter: true, flex: 1 },
    {
      field: 'purchased', 
      sortable: true, 
      filter: true, 
      flex: 1,
      cellRenderer: (params: {value:boolean}) => params.value ? 'Yes' : 'No'
    },
    // 수정 버튼/다이얼로그
    {
      cellRenderer: (params: {data?: ShoppingItem}) => (
        params.data ? <EditItem itemdata={params.data} /> : null
      ),
    },
    // 삭제 버튼
    {
      cellRenderer: (params: {data?: ShoppingItem}) => ( 
        params.data ? 
        <Button
          size="small"
          color="error"
          onClick={() => {
            if(window.confirm(`${params.data?.product} 항목을 삭제하시겠습니까?`)) {
              deleteMutate(params.data.id);
            }
          }}
        >
          Delete
        </Button> : null
      ),
      width: 120,
    },
  ];
  // 그리드 준비 시점
  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  // 로딩 분기
  if(isLoading) {
    return <span>Loading ... ⌛</span>
  }
  // 에러 분기 : 데이터 준비되기 전 에러 시 별도 화면 표기
  if(isError) {
    return <span>항목을 가져오는 데 오류가 발생했습니다. : {error.message}</span>
  }

  // 렌더 : 상단에 AddItem UI / 가운데 ag-Grid 테이블 / 하단 스낵바: 성공, 실패 메시지 자동닫힘
  return (
    <>
      <Box sx={{ display:'flex', justifyContent:'flex-start', mb:2, mt:2 }}>
        <AddItem /> 
      </Box>

      <Box className='ag-theme-material' style={{height:500, width:'100%'}}>
        <AgGridReact 
          rowData={items}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          onGridReady={onGridReady}
          animateRows={true}
          domLayout="autoHeight"
        />
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ShoppingItemList