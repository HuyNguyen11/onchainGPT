import * as React from 'react';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import CustomViewer from './CustomViewer';
import config from 'src/config';

interface PDFViewProps {
  fileName: string;
  onClose?: () => void;
}
const domainApi = config.api.baseUrlApi;

const PDFView: React.FC<PDFViewProps> = ({ fileName, onClose }) => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <CustomViewer
        onClose={onClose}
        fileUrl={`${domainApi}/content/${fileName}`}
      />
    </Worker>
  );
};
export default PDFView;
