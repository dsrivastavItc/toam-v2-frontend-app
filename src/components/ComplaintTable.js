import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTable } from 'react-table';
import '../App.css';

const ComplaintTable = ({ data }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedComplaint(null);
  };

  // Define the table columns for the first four fields
  const columns = React.useMemo(
    () => [
      { Header: 'Trade Direction', accessor: 'TradeDirection' },
      { Header: 'Description', accessor: 'Description' },
      { Header: 'Date', accessor: 'Date' },
      { Header: 'Is Recurring Problem', accessor: 'IsRecurringProblem' },
      {
        Header: 'Details',
        accessor: 'details',
        Cell: ({ row }) => (
          <button onClick={() => openModal(row.original)}>Details</button>
        ),
      },
    ],
    []
  );

  // Convert date fields to readable format
  const processDate = (timestamp) => new Date(timestamp).toLocaleString();

  // Prepare data for react-table
  const processedData = React.useMemo(() => {
    return data.map(complaint => ({
      TradeDirection: complaint.TradeDirection,
      Description: complaint.Description,
      Date: processDate(complaint.Date),
      IsRecurringProblem: complaint.IsRecurringProblem,
      LocationName: complaint.LocationName,
      ProductDetails: complaint.ProductDetails,
      TradeRegulationType: complaint.TradeRegulationType,
      Status: complaint.Status,
      SubmitDate: new Date(complaint.SubmitDate).toLocaleString(),
      LocationCountryCode: complaint.LocationCountryCode,
      TradeOriginCountryCode: complaint.TradeOriginCountryCode,
      TradeDestinationCountryCode: complaint.TradeDestinationCountryCode,
      Remarks: complaint.Remarks,
    }));
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: processedData });

  return (
    <div>
      <h1>Complaints</h1>
      <table {...getTableProps()} style={{ width: '100%', border: '1px solid black' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ padding: '10px', borderBottom: '2px solid black' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={{ padding: '10px', borderBottom: '1px solid black' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal for showing complaint details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Complaint Details"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        {selectedComplaint && (
          <div>
            <h2>Complaint Details</h2>
            <p><strong>Trade Direction:</strong> {selectedComplaint.TradeDirection}</p>
            <p><strong>Description:</strong> {selectedComplaint.Description}</p>
            <p><strong>Date:</strong> {selectedComplaint.Date}</p>
            <p><strong>Is Recurring Problem:</strong> {selectedComplaint.IsRecurringProblem}</p>
            <p><strong>Location Name:</strong> {selectedComplaint.LocationName}</p>
            <p><strong>Product Details:</strong> {selectedComplaint.ProductDetails}</p>
            <p><strong>Trade Regulation Type:</strong> {selectedComplaint.TradeRegulationType}</p>
            <p><strong>Status:</strong> {selectedComplaint.Status}</p>
            <p><strong>Submit Date:</strong> {selectedComplaint.SubmitDate}</p>
            <p><strong>Location Country Code:</strong> {selectedComplaint.LocationCountryCode}</p>
            <p><strong>Trade Origin Country Code:</strong> {selectedComplaint.TradeOriginCountryCode}</p>
            <p><strong>Trade Destination Country Code:</strong> {selectedComplaint.TradeDestinationCountryCode}</p>
            <p><strong>Remarks:</strong> {selectedComplaint.Remarks}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ComplaintTable;