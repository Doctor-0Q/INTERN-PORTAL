import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/config';
import toast from 'react-hot-toast';

const DocumentPermissionModal = ({ isOpen, onClose, type, onSave }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [internsList, setInternsList] = useState([]);
  
    const fetchInternsList = useCallback(async () => {
      if (!isOpen) return;
      
      try {
        const response = await axios.get(`${API_URL}/api/v1/internList`);
        setInternsList(response.data.data);
        
        // Pre-select interns based on their existing permissions
        const preSelectedInterns = response.data.data.filter(intern => 
          type === 'appreciation' 
            ? intern.canDownloadAppreciation === "true"
            : intern.canDownloadLOR === "true"
        );
        setSelectedIds(preSelectedInterns.map(intern => intern.internID));
      } catch (error) {
        toast.error('Failed to fetch interns list');
      }
    }, [isOpen, type]);
  
    useEffect(() => {
      if (isOpen) {
        fetchInternsList();
      }
    }, [isOpen, fetchInternsList]);

    const handleClose = () => {
      setSearchTerm('');
      onClose();
    };
  
    if (!isOpen) return null;

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">
            {type === 'appreciation' ? 'Appreciation Letter Access' : 'LOR Access'}
          </h2>
          
          <input
            type="text"
            value={searchTerm}
            placeholder="Search interns..."
            className="w-full p-2 border rounded mb-4"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="space-y-2 mb-4">
            {internsList
              .filter(intern => 
                intern.forename.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(intern => (
                <div key={intern.internID} className="flex items-center gap-2 p-2 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(intern.internID)}
                    onChange={() => {
                      setSelectedIds(prev => 
                        prev.includes(intern.internID)
                          ? prev.filter(id => id !== intern.internID)
                          : [...prev, intern.internID]
                      );
                    }}
                  />
                  <span>{intern.forename} ({intern.internID})</span>
                </div>
              ))}
          </div>

          <div className="flex justify-end gap-2">
            <button 
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setSearchTerm('');
                onSave(selectedIds, type);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
};

export default DocumentPermissionModal;