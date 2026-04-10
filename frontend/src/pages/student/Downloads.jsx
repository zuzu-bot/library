import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Download, File } from 'lucide-react';

const Downloads = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await api.get('/api/files');
      setFiles(res.data);
    };
    fetchFiles();
  }, []);

  const filteredFiles = files.filter(f =>
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notes & PYQs</h1>
        <input
          type="text"
          placeholder="Filter files..."
          className="px-4 py-2 border rounded-lg w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFiles.map(file => (
          <div key={file.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                <File size={32} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{file.title}</h3>
                <p className="text-sm text-gray-500 uppercase">{file.type} | {file.category_name}</p>
              </div>
            </div>
            <a
              href={`/${file.file_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Download size={18} /> Download PDF
            </a>
          </div>
        ))}
        {filteredFiles.length === 0 && <p className="text-gray-500 col-span-full text-center">No files found.</p>}
      </div>
    </div>
  );
};

export default Downloads;
