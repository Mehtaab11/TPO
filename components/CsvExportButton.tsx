'use client';

import { exportShortlistCSV } from '@/app/actions/admin';
import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CsvExportButton({
  jobId,
  companyName,
  driveTitle,
}: {
  jobId: string;
  companyName?: string;
  driveTitle?: string;
}) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    toast.loading('Generating candidate CSV data file...');

    try {
      const res = await exportShortlistCSV(jobId);
      toast.dismiss();
      setExporting(false);

      if (res?.error || !res?.csvContent) {
        toast.error(res?.error || 'Failed to export CSV file.');
        return;
      }

      // Trigger browser file download
      const blob = new Blob([res.csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', res.filename || 'Placement_Applicants.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('CSV Candidate File downloaded successfully!');
    } catch (e) {
      toast.dismiss();
      setExporting(false);
      toast.error('An error occurred during CSV export.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={exporting}
      className="px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 font-semibold text-xs transition-all flex items-center gap-2"
    >
      {exporting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
          <span>Exporting CSV...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 text-purple-400" />
          <span>Export Candidate CSV</span>
        </>
      )}
    </button>
  );
}
