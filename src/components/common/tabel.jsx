import _ from "lodash";

const Tabel = ({ data, colums }) => {
  return (
    <table class="table">
      <thead>
        <tr>
          {colums.map((col, i) => (
            <th scope="col" key={i}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {colums.map((col) => (
              <td>{_.get(row, col.path) || col.content(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabel;
