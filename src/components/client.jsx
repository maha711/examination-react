import useFetch from "../hooks/useFetch";
import Tabel from "../components/common/tabel";
import Spinner from "../components/common/spinner";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import ClientForm from "../components/clientForm";

const Client = () => {
  const { data: client, setData: setClient } = useFetch("/Client.json");
  const [selectItem, setSelectItem] = useState(null);
  const [paginatedData, setPaginatedData] = useState([]);
  const colums = [
    { path: "id", label: "ID" },
    { path: "first_name", label: "First_Name" },
    { path: "last_name", label: "Last_Name" },
    { path: "email", label: "Email" },
    { path: "gender", label: "Gender" },
    {
      label: "Actions",
      content: (item) => (
        <>
          <button
            className="btn btn-danger m-2"
            onClick={() => handleDelete(item)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning m-2"
            onClick={() => setSelectItem(item)}
          >
            Edit
          </button>
          <Link className="btn btn-primary" to={`/client/${item.id}`}>
            view
          </Link>
        </>
      ),
    },
  ];
  const handleDelete = (item) => {
    const newData = client.filter((c) => c.id !== item.id);
    setClient(newData);
    toast.warning("client deleted success", { theme: "colored" });
  };

  return (
    <>
      <div className="row m-3">
        <div className="col-8">
          {client ? (
            <>
              <Tabel data={paginatedData} colums={colums} />
              <Pagination setPaginatedData={setPaginatedData} data={client} />
            </>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="col-4">
          {" "}
          <ClientForm
            data={client}
            setData={setClient}
            selectItem={selectItem}
          />
        </div>
      </div>
    </>
  );
};

export default Client;
