import React from 'react';
import PropTypes from 'prop-types';


const Table = ({ data, columns, actions }) => {
  return (
    <div className='table-container'>

    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col.key}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
            {actions && (
              <td className='action-btn-container'>
                {actions.map((action, index) => (
                  <div
                  key={index}
                  onClick={() => action.callback(row)}
                  className={`${action.className}`}
                  >
                    {action.label}
                  </div>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
        </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired,
      className: PropTypes.string,
    })
  ),
};

export default Table;
