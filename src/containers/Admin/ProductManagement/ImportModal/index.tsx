import {
  DialogContext,
  DocumentReview,
  FileUpload,
  MuiSelect,
  SelectOption,
  UploadFileType,
} from '@components';
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import {
  ExportType,
  ImportPayload,
  ProductApi,
  useGetAllProduct,
  useGetAllStoreLazy,
  useImportProduct,
} from '@queries';
import { isEmpty } from '@shared';
import toastify from '@shared/services/toastify';
import Papa, { ParseResult } from 'papaparse';
import React, { useContext, useEffect, useState } from 'react';
import { ImportFormat, templateKey } from './helpers';
import { isEqual } from 'lodash';

type Props = {};

const ImportModal: React.FC<Props> = () => {
  const [storeId, setStoreId] = useState<string>('');
  const [files, setFiles] = useState<UploadFileType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const { closeModal } = useContext(DialogContext);

  const { handleInvalidateAllProducts } = useGetAllProduct();

  const { onImportProduct, isImporting } = useImportProduct({
    onSuccess() {
      handleInvalidateAllProducts();
      toastify.success('Import successfully!');
      closeModal();
    },
    onError: (error) => toastify.error(error.message),
  });

  const { storeOptions, setParams, loading, fetchNextPage, setInputSearch } = useGetAllStoreLazy({
    onError: (error) => toastify.error(error.message),
  });

  useEffect(() => {
    setParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (_e: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason !== 'reset') {
      setInputSearch(value);
    }
  };

  const handleOnChange = (e: unknown, value: SelectOption, r: AutocompleteChangeReason) => {
    setStoreId(value?.value);
  };

  const downloadFile = () => {
    ProductApi.getProductStoreExportFile({
      id: storeId,
      exportType: ExportType.CSV,
    }).then((res) => {
      if (res.status === 200) {
        let binaryData = [];
        binaryData.push(new Uint8Array([0xef, 0xbb, 0xbf]));
        binaryData.push(new TextEncoder().encode(res.data.toString()));
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'text/csv' }));
        downloadLink.setAttribute(
          'download',
          `importTemplate-MALT-${
            storeOptions
              .find((store) => store.value === storeId)
              .label.toString()
              .split(',')[0]
          }.csv`,
        );
        document.body.appendChild(downloadLink);
        downloadLink.click();
      } else {
        toastify.error((res.data as Error).message);
      }
    });
  };

  const handleResetFile = () => {
    setFiles([]);
    setErrorMessage('');
  };

  const handleImport = () => {
    if (isEmpty(files)) {
      setErrorMessage('No file uploaded.');
      return;
    }
    Papa.parse(files[0].file, {
      delimiter: '',
      chunkSize: 3,
      header: true,
      dynamicTyping: true,
      complete(responses: ParseResult<ImportFormat>) {
        if (
          responses.data.length < 1 ||
          responses.data.every((product) =>
            Object.entries(product).every(([mimeType, extensions]) => isEmpty(extensions)),
          )
        ) {
          return setErrorMessage('This file is blank');
        }

        const keys = Object.entries(responses.data[0]).map(([mimeType, extensions]) => mimeType);

        const trimKeys = keys.map((key) => key.trim().toUpperCase());
        const templates = templateKey.map((template) => template.toUpperCase());

        if (isEmpty(trimKeys) || !isEqual(trimKeys, templates)) {
          return setErrorMessage('This file have wrong format');
        }

        const importPayload: ImportPayload = {
          importOrderDetails: responses.data
            .map((product) => ({
              productStoreId: product.ProductStoreID,
              amount: product.QuantityImport,
              pricePerProduct: product.PricePerProduct,
            }))
            .filter((product) => product.amount > 0 && product.pricePerProduct > 0),
        };

        if (isEmpty(importPayload.importOrderDetails)) {
          return setErrorMessage(
            'You have not enter both the quantity and the price for any product yet!',
          );
        }
        onImportProduct(importPayload);
      },
    });
  };

  return (
    <Stack margin="0 -24px -24px">
      <Stack
        sx={{
          padding: '16px 24px 24px 24px',
          gap: 2,
        }}
      >
        <Typography fontSize={16}>Please choose a store to download the template</Typography>
        <MuiSelect
          label=""
          placeholder="Choose a store"
          required
          size="small"
          value={storeId}
          onChange={handleOnChange}
          onInputChange={handleSearch}
          options={storeOptions}
          onFetchNextPage={fetchNextPage}
          allowLazyLoad
          filterOptions={(x) => x}
          isGetOptionOnChange
          isLoading={loading}
          onBlur={(event, value, reason) => {
            if (!value) handleSearch(event, '', reason);
          }}
          noOptionsText={'not found'}
        />
        {storeId && <Button onClick={downloadFile}>Download Template</Button>}
        <Divider />
        {!isEmpty(files) && (
          <DocumentReview
            doc={files[0]}
            onRemoveAttachment={() => {
              handleResetFile();
            }}
            errorMessage={errorMessage}
          />
        )}
        {isEmpty(files) && (
          <FileUpload
            onChange={async (value: UploadFileType[]) => {
              handleResetFile();
              setFiles([...value]);
            }}
            onBlur={handleResetFile}
            acceptFileType={{ 'text/csv': ['.csv'] }}
            numberAllow={1}
            errorMessage={errorMessage}
          />
        )}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mt: 1,
          padding: '16px 24px 24px 24px',
          gap: 2,
          borderRadius: '0 0 16px 16px',
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={closeModal}
          disabled={loading || isImporting}
        >
          Cancel
        </Button>
        <Button
          disabled={loading || isImporting}
          variant="contained"
          color="primary"
          onClick={handleImport}
        >
          Import
        </Button>
      </Stack>
    </Stack>
  );
};

export default ImportModal;
